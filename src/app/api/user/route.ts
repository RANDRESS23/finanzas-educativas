import { encryptPassword } from "@/libs/bcrypt";
import { db } from "@/libs/prismaDB";
import { signUpSchema } from "@/schemas/user.schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await db.user.findMany();

    return NextResponse.json(users);
  } catch (error) {
    console.error({ error });

    return NextResponse.json(
      { message: "Something went wrong.", error },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const {
      documentType,
      document,
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
    } = signUpSchema.parse(body);

    const existingUserByDocument = await db.user.findUnique({
      where: { document },
    });

    if (existingUserByDocument !== null) {
      return NextResponse.json(
        { messsage: "Document already exists" },
        { status: 400 },
      );
    }

    const existingUserByEmail = await db.user.findUnique({
      where: { email },
    });

    if (existingUserByEmail !== null) {
      return NextResponse.json(
        { messsage: "Email already exists" },
        { status: 400 },
      );
    }

    const hashedPassword = await encryptPassword(password);
    const newUser = await db.user.create({
      data: {
        documentType,
        document,
        firstName,
        lastName,
        phoneNumber,
        email,
        hashedPassword,
      },
    });

    const { hashedPassword: _, ...user } = newUser;

    return NextResponse.json(
      { user, message: "User created successfully" },
      { status: 201 },
    );
  } catch (error: any) {
    console.error({ error });

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

export async function PATCH(request: Request) {
  const body = await request.json();
  const id = body.userId;

  try {
    const userDeleted = await db.user.update({
      data: { disabled: true },
      where: { id },
    });

    if (!userDeleted) {
      return NextResponse.json({
        message: "No se pudo deshabilitar el usuario. Intente más tarde.",
      });
    }

    return NextResponse.json(
      {
        message: `El usuario ${userDeleted.firstName} ${userDeleted.lastName} ha sido deshabilitado.`,
      },
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
