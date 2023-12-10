import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const secondDimensionContentInfo =
      await db.secondDimensionContent.findMany();

    return NextResponse.json(
      secondDimensionContentInfo[0].aGoodDecisionContent,
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

export async function PUT(request: Request) {
  const body: { firstParagraph: string; secondParagraph: string } =
    await request.json();

  try {
    const [secondDimensionContentInfo] =
      await db.secondDimensionContent.findMany();
    const aGoodDecisionInfoUpdated = await db.secondDimensionContent.update({
      where: {
        id: secondDimensionContentInfo.id,
      },
      data: {
        aGoodDecisionContent: [body.firstParagraph, body.secondParagraph],
      },
    });

    return NextResponse.json(
      {
        aGoodDecisionInfoUpdated,
        message: "Información actualizada correctamente",
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
