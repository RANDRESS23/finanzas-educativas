import { htmlForChangePsw } from "@/email_templates";
import { db } from "@/libs/prismaDB";
import { sendEmail } from "@/libs/sgMail";
import { sendEmailSchema } from "@/schemas/security.schema";
import type { TPayload } from "@/types/TPayload";
import Jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export interface ExpectedParamsSend {
  params: { to: string };
}

export async function GET(_: Request, { params }: ExpectedParamsSend) {
  try {
    const { to } = sendEmailSchema.parse({ to: params.to });

    const userFound = await db.user.findUnique({
      where: { email: to },
      select: { document: true, email: true },
    });

    if (userFound === null) {
      return NextResponse.json(
        { message: "El email no se encuentra registrado." },
        { status: 404 },
      );
    }

    const payload: TPayload = {
      document: userFound.document,
      email: userFound.email,
    };

    const tokenRecoverPsw = Jwt.sign(payload, process.env.NEXTAUTH_SECRET!, {
      expiresIn: 10 * 60, // 10 minutos
    });

    const resetPasswordLink = `${process.env.NEXTAUTH_URL}/forgot-password/${tokenRecoverPsw}`;

    const msgSended = await sendEmail(
      to,
      "Solicitud de cambio de contraseña",
      htmlForChangePsw(resetPasswordLink),
    );
    if (!msgSended?.response) {
      return NextResponse.json(
        { message: `Error sending email to ${to}` },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: `Email sended to ${to}` },
      { status: 201 },
    );
  } catch (error) {
    console.error({ error });

    return NextResponse.json(
      { message: "Something went wrong.", error },
      { status: 500 },
    );
  }
}
