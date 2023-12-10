import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const thirdDimensionContentInfo = await db.thirdDimensionContent.findMany();

    return NextResponse.json(thirdDimensionContentInfo[0].financeManagement, {
      status: 200,
    });
  } catch (error) {
    console.error({ error });

    return NextResponse.json(
      { message: "Something went wrong.", error },
      { status: 500 },
    );
  }
}
