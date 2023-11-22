import { authOptions } from "@/libs/authOptions";
import { expectedOrigin, rpID, rpName } from "@/constants";
import { db } from "@/libs/prismaDB";
import { getPublicKeyCredentialDescriptor } from "@/libs/webauthn";
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  type VerifiedRegistrationResponse,
} from "@simplewebauthn/server";
import type {
  PublicKeyCredentialCreationOptionsJSON,
  RegistrationResponseJSON,
} from "@simplewebauthn/typescript-types";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

/**
 * [GET]: /api/2fa/webauthn/register
 * Endpoint for generate registration options.
 */
export async function GET() {
  const session = await getServerSession(authOptions);

  try {
    if (!session) {
      throw new Error();
    }

    const userId = session.id;
    if (!userId) {
      throw new Error();
    }
    const userFound = await db.user.findUnique({
      where: { id: userId },
      select: { email: true, authenticators: true },
    });

    if (!userFound) {
      throw new Error("El usuario no fue encontrado.");
    }

    // registered authenticators
    const userAuthenticators = userFound.authenticators;

    const options: PublicKeyCredentialCreationOptionsJSON =
      await generateRegistrationOptions({
        rpName,
        rpID,
        userID: userId,
        userName: userFound.email ?? "",
        // Don't prompt users for additional information about the authenticator
        // (Recommended for smoother UX)
        attestationType: "none",
        // Prevent users from re-registering existing authenticators
        excludeCredentials: !userAuthenticators
          ? []
          : getPublicKeyCredentialDescriptor(userAuthenticators),
        authenticatorSelection: {
          // "Discoverable credentials" used to be called "resident keys". The
          // old name persists in the options passed to `navigator.credentials.create()`.
          residentKey: "required",
          userVerification: "preferred",
        },
      });

    // Remember the challenge for this user
    await db.user.update({
      where: { id: userId },
      data: { currentChallenge: options.challenge },
    });

    return NextResponse.json(options);
  } catch (error) {
    if (error instanceof Error) {
      console.error({ error });
      const { message } = error;

      return NextResponse.json(
        { message: message ? message : "Unauthorized." },
        { status: 401 },
      );
    }
  }
}

/**
 * [POST]: /api/2fa/webauthn/register
 * Endpoint for verify registration response.
 */
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  try {
    if (!session) {
      throw new Error();
    }

    const userId = session.id;
    if (!userId) {
      throw new Error();
    }
    const userFound = await db.user.findUnique({
      where: { id: userId },
      select: { currentChallenge: true },
    });

    if (!userFound) {
      throw new Error("El usuario no fue encontrado.");
    }

    const response: RegistrationResponseJSON = await request.json();
    const expectedChallenge = userFound.currentChallenge;

    if (expectedChallenge) {
      const verification: VerifiedRegistrationResponse =
        await verifyRegistrationResponse({
          response,
          expectedChallenge,
          expectedOrigin,
          expectedRPID: rpID,
        });

      if (!verification) {
        throw new Error();
      }
      const { verified, registrationInfo } = verification;
      const {
        credentialPublicKey,
        credentialID,
        counter,
        credentialDeviceType,
        credentialBackedUp,
      } = registrationInfo || {};

      // Save the authenticator info so that we can
      // get it by user ID later
      if (!credentialID || !credentialPublicKey) {
        throw new Error();
      }
      // Create a new authenticator
      await db.authenticator.create({
        data: {
          userId,
          credentialID: Buffer.from(credentialID),
          credentialPublicKey: Buffer.from(credentialPublicKey),
          counter: counter ?? 0,
          credentialDeviceType: credentialDeviceType ?? "singleDevice",
          credentialBackedUp: credentialBackedUp ?? false,
          transports: response.response.transports,
        },
      });
      // Active 2FA Auth
      await db.user.update({
        where: { id: userId },
        data: { is2FAEnabled: true },
      });

      return NextResponse.json({ verified });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error({ error });
      const { message } = error;

      return NextResponse.json(
        { message: message ? message : "Unauthorized." },
        { status: 401 },
      );
    }
  }
}
