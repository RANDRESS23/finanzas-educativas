import { encryptPassword } from "@/libs/bcrypt";
import { db } from "@/libs/prismaDB";
import { userPasswordsSchema } from "@/schemas/user.schema";
import type { TPayload } from "@/types/TPayload";
import Jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const body = await request.json();

  try {
    const { password, confirmPassword } = userPasswordsSchema.parse({
      password: body.password,
      confirmPassword: body.confirmPassword,
    });

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Las contraseñas no coinciden." },
        { status: 400 },
      );
    }

    const payload = Jwt.verify(
      body.jwtToken,
      process.env.NEXTAUTH_SECRET!,
    ) as TPayload;
    const userFound = await db.user.findUnique({
      where: { email: payload.email },
      select: { id: true },
    });

    if (userFound === null) {
      return NextResponse.json(
        { message: "El email no se encuentra registrado." },
        { status: 404 },
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
      throw new Error();
    }

    return NextResponse.json({ message: "ok" }, { status: 201 });
  } catch (error: any) {
    if (error?.errors !== null) {
      const errorsMessages: Record<string, string> = {};
      const { errors } = error;

      errors.forEach(
        ({ message, path }: { message: string; path: string[] }) => {
          if (!Object.values(errorsMessages).includes(message)) {
            errorsMessages[path.join("")] = message;
          }
        },
      );

      return NextResponse.json(errorsMessages, { status: 500 });
    }

    return NextResponse.json(
      { message: "Something went wrong.", error },
      { status: 500 },
    );
  }
}
