import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const secondDimensionContentInfo =
      await db.secondDimensionContent.findMany();

    return NextResponse.json(
      secondDimensionContentInfo[0].stepsOfAGoodDecisionContent,
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error({ error });

    return NextResponse.json(
      { message: "Something went wrong.", error },
      { status: 500 },
    );
  }
}
