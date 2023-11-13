import { authOptions } from "@/libs/authOptions";
import { rpID } from "@/constants";
import { db } from "@/libs/prismaDB";
import { getPublicKeyCredentialDescriptor } from "@/libs/webauthn";
import { generateAuthenticationOptions } from "@simplewebauthn/server";
import type { PublicKeyCredentialRequestOptionsJSON } from "@simplewebauthn/typescript-types";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

/**
 * [POST]: /api/2fa/webauthn/authenticate
 * Endpoint for generate authentication options.
 *
 * @important In [...nextauth] route is located the other signin
 * method as a "Webauthn" provider named and "webauthn" identified.
 */
export async function POST(request: Request) {
  let userId: string | undefined = "";
  const body = await request.json();

  try {
    if (body.document) {
      const userFound = await db.user.findUnique({
        where: { document: body.document },
        select: { id: true },
      });
      if (!userFound) {
        throw new Error(
          `No se encontró el usuario con No. documento ${body.document}.`
        );
      }

      userId = userFound?.id;
    } else {
      const session = await getServerSession(authOptions);
      if (!session) {
        throw new Error();
      }

      userId = session.id;
    }

    if (!userId) {
      throw new Error();
    }
    const userFound = await db.user.findUnique({
      where: { id: userId },
      select: { authenticators: true },
    });

    if (!userFound) {
      throw new Error("El usuario no fue encontrado.");
    }

    // registered authenticators
    const userAuthenticators = userFound.authenticators;

    if (!userAuthenticators.length) {
      throw new Error("No se encontraron autenticadores para el usuario.");
    }

    const options: PublicKeyCredentialRequestOptionsJSON =
      await generateAuthenticationOptions({
        rpID,
        // Require users to use a previously-registered authenticator
        allowCredentials: getPublicKeyCredentialDescriptor(userAuthenticators),
        userVerification: "preferred",
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
        { status: 401 }
      );
    }
  }
}
