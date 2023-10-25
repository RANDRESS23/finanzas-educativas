import { encryptPassword } from "@/libs/bcrypt";
import { db } from "@/libs/prismaDB";
import { userPasswordsSchema } from "@/schemas/user.schema";
import Jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { password, confirmPassword } = userPasswordsSchema.parse({
      password: body.password,
      confirmPassword: body.confirmPassword,
    });

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Las contraseñas no coinciden." },
        { status: 400 }
      );
    }

    const payload = Jwt.verify(
      body.jwtToken,
      process.env.secret ?? "secretkey"
    ) as any;
    const userFound = await db.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (userFound === null) {
      return NextResponse.json(
        { message: "El email no se encuentra registrado." },
        { status: 404 }
      );
    }

    const updatedUser = await db.user.update({
      where: {
        email: payload.email,
      },
      data: {
        hashedPassword: await encryptPassword(password),
      },
    });

    if (updatedUser === null) {
      return NextResponse.json(
        { message: "No se pudo actualizar la contraseña." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "ok" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong.", error },
      { status: 500 }
    );
  }
}
