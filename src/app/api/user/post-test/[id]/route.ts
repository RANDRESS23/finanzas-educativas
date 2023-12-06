import { db } from "@/libs/prismaDB";
import { type UserMoreInfoForm } from "@/types/user";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: UserMoreInfoForm },
) {
  try {
    const userPostTestInfo = await db.userPostTest.findMany({
      where: { userId: params.id },
    });

    if (userPostTestInfo.length === 0) {
      return NextResponse.json(
        { message: "No se encontró el post-test del usuario" },
        { status: 404 },
      );
    }

    return NextResponse.json(userPostTestInfo[0]);
  } catch (error) {
    console.error({ error });

    return NextResponse.json(
      { message: "Something went wrong.", error },
      { status: 500 },
    );
  }
}
