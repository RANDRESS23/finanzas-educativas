import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const userPreTest = await db.userPreTest.create({
      data: {
        userId: body.userId,
        questionsFirstDimension: body.questionsFirstDimension,
        questionsSecondDimension: body.questionsSecondDimension,
        questionsThirdDimension: body.questionsThirdDimension,
      },
    });

    return NextResponse.json(
      {
        userPreTest,
        message: "Pre-Test registrado correctamente",
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error({ error });

    return NextResponse.json(
      { message: "Something went wrong.", error },
      { status: 500 },
    );
  }
}
