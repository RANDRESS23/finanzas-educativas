import { db } from "@/libs/prismaDB";
import { UserMoreInfoForm } from "@/types/user";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: UserMoreInfoForm}) {
  try {
    const userMoreInfo = await db.userMoreInfo.findMany({
      where: { userId: params.id },
    });

    if (userMoreInfo.length === 0) {
      return NextResponse.json(
        { message: "No se encontró información adicional del usuario" },
        { status: 404 },
      );
    }

    return NextResponse.json(userMoreInfo[0]);
  } catch (error) {
    console.log({ error });

    return NextResponse.json(
      { message: "Something went wrong.", error },
      { status: 500 },
    );
  }
}