import { db } from "@/libs/prismaDB";
import { type UserMoreInfoForm } from "@/types/user";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: UserMoreInfoForm },
) {
  try {
    const userPreTestInfo = await db.userPreTest.findMany({
      where: { userId: params.id },
    });

    if (userPreTestInfo.length === 0) {
      return NextResponse.json(
        { message: "No se encontró el pre-test del usuario" },
        { status: 404 },
      );
    }

    return NextResponse.json(userPreTestInfo[0]);
  } catch (error) {
    console.error({ error });

    return NextResponse.json(
      { message: "Something went wrong.", error },
      { status: 500 },
    );
  }
}
