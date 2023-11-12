import { expectedOrigin, rpID } from "@/constants";
import { Authenticator } from "@/interfaces/Authenticator";
import { verifyPassword } from "@/libs/bcrypt";
import { db } from "@/libs/prismaDB";
import { getAuthenticatorByCredentialId } from "@/libs/webauthn";
import {
  type VerifiedAuthenticationResponse,
  verifyAuthenticationResponse,
} from "@simplewebauthn/server";
import type { AuthenticationResponseJSON } from "@simplewebauthn/typescript-types";
import NextAuth, { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV !== "production",
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        document: {
          label: "Document",
          type: "text",
          placeholder: "Put your document",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Put your password",
        },
      },
      async authorize(credentials, _) {
        if (!credentials?.document || !credentials?.password) {
          return null;
        }

        const existingUser = await db.user.findUnique({
          where: { document: credentials?.document },
        });

        if (existingUser === null) return null;

        const passwordMatch = await verifyPassword(
          credentials!.password,
          existingUser.hashedPassword
        );

        if (!passwordMatch) return null;

        return {
          id: `${existingUser.id}`,
          documentType: existingUser.documentType,
          document: existingUser.document,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          phoneNumber: existingUser.phoneNumber,
          email: existingUser.email,
          createdAt: existingUser.createdAt,
          updatedAt: existingUser.updatedAt,
          is2FAEnabled: existingUser.is2FAEnabled,
          currentChallenge: existingUser.currentChallenge,
        };
      },
    }),
    CredentialsProvider({
      id: "webauthn",
      name: "WebAuthn",
      credentials: {
        document: {
          label: "Document",
          type: "text",
          placeholder: "Put your document",
        },
      },
      async authorize(credentials, request) {
        let userId: string | undefined = "";

        if (!credentials?.document) {
          const session = await getServerSession(authOptions);
          if (!session) return null;

          userId = session.id;
        } else {
          const userFound = await db.user.findUnique({
            where: { document: credentials.document },
            select: { id: true },
          });

          userId = userFound?.id;
        }

        if (!userId) return null;
        const userFound = await db.user.findUnique({
          where: { id: userId },
          include: { authenticators: true },
        });

        if (!userFound) {
          return null;
        }

        const expectedChallenge = userFound.currentChallenge;
        const currentUserAuthenticators = userFound.authenticators;
        if (!currentUserAuthenticators.length) {
          return null;
        }

        const authenticationResponse: AuthenticationResponseJSON = JSON.parse(
          request.body?.verification
        );

        const authenticatorFound = getAuthenticatorByCredentialId(
          currentUserAuthenticators,
          authenticationResponse.rawId
        ) as Authenticator;
        if (
          !authenticatorFound ||
          !authenticatorFound.id ||
          !expectedChallenge
        ) {
          throw new Error(
            `No se encontró el autenticador para el usuario ${userFound.email}`
          );
        }

        let verification: VerifiedAuthenticationResponse;
        try {
          verification = await verifyAuthenticationResponse({
            response: authenticationResponse,
            expectedChallenge,
            expectedOrigin,
            expectedRPID: rpID,
            authenticator: authenticatorFound,
          });
        } catch (error) {
          console.error({ error });
          return null;
        }

        const { verified, authenticationInfo } = verification || {};

        if (verified) {
          const { newCounter } = authenticationInfo;
          // Responsability: Update the new counter
          await db.authenticator.update({
            where: { id: authenticatorFound.id },
            data: { counter: newCounter },
          });
          const updatedUserResult = await db.user.update({
            where: { id: userId },
            data: { currentChallenge: "" },
          });

          if (updatedUserResult && updatedUserResult instanceof Object)
            return updatedUserResult;
          return null;
        }
        return null;
      },
    }),
  ],
  theme: {
    colorScheme: "auto",
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        token.is2FAEnabled = user.is2FAEnabled;
        token.is2FAVerified = user.is2FAEnabled && !user.currentChallenge;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      session.id = token?.sub;
      session.is2FAVerified = token.is2FAVerified as boolean;
      session.user.is2FAEnabled = token.is2FAEnabled;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
