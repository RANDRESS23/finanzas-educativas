import pkg from "@/../package.json";
import { sendEmailSchema } from "@/schemas/security.schema";
import { NextResponse } from "next/server";
import Jwt from "jsonwebtoken";
import { db } from "@/libs/prismaDB";
import { sendEmail } from "@/libs/sgMail";
import { TPayload } from "@/types/TPayload";

export async function GET(
  _request: Request,
  { params }: { params: { email: string } }
) {
  const { to } = sendEmailSchema.parse(params);

  const userFound = await db.user.findUnique({
    where: {
      email: to,
    },
  });

  if (userFound === null) {
    return NextResponse.json(
      { message: "El email no se encuentra registrado." },
      { status: 404 }
    );
  }

  const payload: TPayload = {
    document: userFound.document,
    email: userFound.email,
  };

  const tokenRecoverPsw = Jwt.sign(
    payload,
    process.env.secret ?? "secretkey",
    { expiresIn: 10 * 60 } // 10 minutos
  );

  const resetPasswordLink = `${process.env.NEXTAUTH_URL}/forgot-password/${tokenRecoverPsw}`;

  const html = `
    <p>Hemos detectado que solicitaste un <strong>cambio de contraseña</strong>.</p>

    <p>Por favor, haga clic en el siguiente enlace para cambiar tu contraseña.</p>
    <a href="${resetPasswordLink}">Cambiar contraseña</a>
    
    <p>Si no solicitaste este cambio, por favor, ignora este correo electrónico.</p>

    <i><strong>Cordialmente,<br>
    El equipo de ${pkg.description} ITFIP.</strong></i>
  `;

  const subject = "Solicitud de cambio de contraseña";

  try {
    const msgSended = await sendEmail(to, subject, html);
    if (!msgSended?.response) {
      return NextResponse.json(
        { message: `Error sending email to ${to}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: `Email sended to ${to}` },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong.", error },
      { status: 500 }
    );
  }
}
