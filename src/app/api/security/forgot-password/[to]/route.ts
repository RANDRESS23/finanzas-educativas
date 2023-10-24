import pkg from '@/../package.json'
import { sendEmailSchema } from '@/schemas/security.schema'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import Jwt from 'jsonwebtoken'
import { db } from '@/libs/prismaDB'

export async function GET(
  request: Request,
  { params }: { params: { email: string } }
) {
  const { to } = sendEmailSchema.parse(params)

  const userFound = await db.user.findUnique({
    where: {
      email: to
    }
  })

  if (!userFound) {
    return NextResponse.json(
      { message: 'El email no se encuentra registrado.' },
      { status: 404 }
    )
  }

  const payload = {
    document: userFound.document,
    email: userFound.email
  }

  const token_recover_psw = Jwt.sign(
    payload,
    process.env.secret || 'secretkey',
    { expiresIn: 10 * 60 } // 10 minutos
  )

  const resetPasswordLink = `${request.headers.get(
    'origin'
  )}/forgot-password/${token_recover_psw}`

  const html = `
    <p>Hemos detectado que solicitaste un <strong>cambio de contraseña</strong>.</p>

    <p>Por favor, haga clic en el siguiente enlace para cambiar tu contraseña.</p>
    <a href="${resetPasswordLink}">Cambiar contraseña</a>
    
    <p>Si no solicitaste este cambio, por favor, ignora este correo electrónico.</p>

    <i><strong>Cordialmente,<br>
    El equipo de ${pkg.description} ITFIP.</strong></i>
  `

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const response = await resend.emails.send({
      from: process.env.EMAILS_SENDER!,
      to,
      subject: 'Solicitud de cambio de contraseña',
      html
    })

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Something went wrong.', error },
      { status: 500 }
    )
  }
}
