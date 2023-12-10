import { db } from "@/libs/prismaDB";
import { type UserMoreInfoForm } from "@/types/user";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: UserMoreInfoForm },
) {
  try {
    const user = await db.user.findUnique({
      where: { id: params.id },
      include: { moreInfo: true },
    });

    if (!user) {
      return NextResponse.json(
        { message: "No se encontró información adicional del usuario" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      ...user,
      hashedPassword: _,
      ...user.moreInfo[0],
    });
  } catch (error) {
    console.error({ error });

    return NextResponse.json(
      { message: "Something went wrong.", error },
      { status: 500 },
    );
  }
}
