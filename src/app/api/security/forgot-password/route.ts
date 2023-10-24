// import pkg from '@/../package.json'
// import { sendEmailSchema } from '@/schemas/security.schema'
import { NextResponse } from 'next/server'
// import { Resend } from 'resend'
import Jwt from 'jsonwebtoken'
import { userPasswordsSchema } from '@/schemas/user.schema'
import { db } from '@/libs/prismaDB'
import bcrypt from 'bcryptjs'

export async function POST (
  request: Request,
  { params }: { params: { tk: string } }
) {
  try {
    const body = await request.json()

    const { password, confirmPassword } = userPasswordsSchema.parse(body)

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: 'Las contraseñas no coinciden.' },
        { status: 400 }
      )
    }

    const payload = Jwt.verify(
      params.tk,
      process.env.secret ?? 'secretkey'
    ) as any
    const userFound = await db.user.findUnique({
      where: {
        email: payload.email
      }
    })

    if (userFound === null) {
      return NextResponse.json(
        { message: 'El email no se encuentra registrado.' },
        { status: 404 }
      )
    }

    const updatedUser = await db.user.update({
      where: {
        email: payload.email
      },
      data: {
        hashedPassword: await bcrypt.hash(password, 12)
      }
    })

    if (updatedUser === null) {
      return NextResponse.json(
        { message: 'No se pudo actualizar la contraseña.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'ok' }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Something went wrong.', error },
      { status: 500 }
    )
  }
}
