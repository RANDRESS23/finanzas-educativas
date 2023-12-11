import { useCloseSession } from "@/hooks/useCloseSession";
import {
  browserSupportsWebAuthn,
  startAuthentication,
} from "@simplewebauthn/browser";
import type { PublicKeyCredentialRequestOptionsJSON } from "@simplewebauthn/typescript-types";
import { isAxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import api from "../libs/api";
import { tosty } from "../libs/tosty";

export type ReturnTypeUserStart2FAAuth = {
  isLoadingAuth: boolean;
  start2FAAuth: (credential?: string) => Promise<void>;
};

/**
 * Custom hook to start2FAuth.
 * @returns a loading state and function to start2FAAuth.
 */
export default function useStart2FAAuth(): ReturnTypeUserStart2FAAuth {
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const router = useRouter();
  const { closeSession } = useCloseSession();

  /**
   * Start 2FA authentication.
   * @param credential this is a string credential to identify the user
   * instead of some userId in the session, if it is not passed it will
   * take the session.id.
   */
  const start2FAAuth: ReturnTypeUserStart2FAAuth["start2FAAuth"] =
    async credential => {
      if (!browserSupportsWebAuthn()) {
        tosty.error(
          "Tu navegador no soporta autenticación mediante webauthn. :(",
        );
        return;
      }

      setIsLoadingAuth(true);

      try {
        // GET authentication options from the endpoint that calls
        // @simplewebauthn/server -> generateAuthenticationOptions()
        const { data: AuthenticationOpts } =
          await api.post<PublicKeyCredentialRequestOptionsJSON>(
            "/2fa/webauthn/authenticate",
            credential ? { document: credential } : {},
          );

        // Pass the options to the authenticator and wait for a response
        const asseResp = await startAuthentication(AuthenticationOpts);
        /**
         * Pass the verification response to the webauthn custom provider
         * verification parsed to JSON and document credential to
         * identify the user
         */
        const sessionResp = await signIn("webauthn", {
          verification: JSON.stringify(asseResp),
          document: credential,
          redirect: false,
        });

        if (sessionResp?.ok) {
          if (credential === "0000000000") {
            tosty.success("Admin logueado!");
            router.refresh();
            return router.push("/profile/admin");
          }

          tosty.success("Usuario logueado!");
          router.refresh();
          return router.push("/profile/user");
        }

        tosty.error(`${sessionResp?.error}`);
      } catch (error) {
        if (isAxiosError(error)) {
          tosty.error(error.response?.data.message);
        }

        console.error({ error });
        !credential && closeSession();
      } finally {
        setIsLoadingAuth(false);
      }
    };

  return { isLoadingAuth, start2FAAuth };
}
