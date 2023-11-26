"use client";

import { useCloseSession } from "@/hooks/useCloseSession";
import api from "@/libs/api";
import { tosty } from "@/libs/tosty";
import {
  browserSupportsWebAuthn,
  startRegistration,
} from "@simplewebauthn/browser";
import type { VerifiedRegistrationResponse } from "@simplewebauthn/server";
import type { PublicKeyCredentialCreationOptionsJSON } from "@simplewebauthn/typescript-types";
import { isAxiosError } from "axios";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { LiaFingerprintSolid as FingerPrintIcon } from "react-icons/lia";

export default function FA2Register() {
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();
  const { closeSession } = useCloseSession();

  const register2fa = async () => {
    if (!session) return;
    if (!browserSupportsWebAuthn()) {
      return tosty.error(
        "Tu navegador no soporta autenticación mediante webauthn. :(",
      );
    }

    setIsLoading(true);
    try {
      // GET registration options from the endpoint that calls
      // @simplewebauthn/server -> generateRegistrationOptions()
      const { data: registrationOpts } =
        await api<PublicKeyCredentialCreationOptionsJSON>(
          "/2fa/webauthn/register",
        );
      // Pass the options to the authenticator and wait for a response
      const attResp = await startRegistration(registrationOpts);
      // POST the response to the endpoint that calls
      // @simplewebauthn/server -> verifyRegistrationResponse()
      const { data: verificationResponse } = await api.post<
        Omit<VerifiedRegistrationResponse, "registrationInfo">
      >("/2fa/webauthn/register", attResp);

      if (verificationResponse && verificationResponse.verified) {
        // We sign out the user to force a new login with 2FA
        tosty.success(
          "Registrado exitosamente! Por favor inicia sesión nuevamente.",
        );
        // Await 3 seconds before signin for show message to the user
        await new Promise(resolve => setTimeout(resolve, 3000));
        closeSession();
      }
    } catch (error) {
      if (isAxiosError(error)) {
        tosty.error(error.response?.data.message);
      }

      if (error instanceof Error) {
        if (error.name === "InvalidStateError") {
          tosty.error(
            "Error: El autenticador probablemente ya ha sido registrado por el usuario.",
          );
        }

        console.error({ error });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="z-20 fixed bottom-0 right-5 mr-1 mb-5 lg:mr-5 lg:mb-5 xl:mr-10 xl:mb-10 p-1 ">
        <button
          className="rounded-full shadow text-sushi-500 dark:text-boston-blue-600/90 hover:text-sushi-400 dark:hover:text-boston-blue-600 bg-slate-100/60 dark:bg-slate-800/60 transition duration-150 cursor-pointer ring-1 ring-slate-900/20 dark:ring-slate-200/20 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 disabled:cursor-not-allowed backdrop-blur-xl"
          onClick={register2fa}
        >
          <FingerPrintIcon
            className={clsx("text-6xl", { "animate-pulse": isLoading })}
          />
        </button>
      </div>
    </div>
  );
}
