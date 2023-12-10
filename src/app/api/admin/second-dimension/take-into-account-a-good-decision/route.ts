import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const secondDimensionContentInfo =
      await db.secondDimensionContent.findMany();

    return NextResponse.json(
      secondDimensionContentInfo[0].takeIntoAccountAGoodDecisionContent,
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
    const takeIntoAccountAGoodDecisionInfoUpdated =
      await db.secondDimensionContent.update({
        where: {
          id: secondDimensionContentInfo.id,
        },
        data: {
          takeIntoAccountAGoodDecisionContent: [
            body.firstParagraph,
            body.secondParagraph,
          ],
        },
      });

    return NextResponse.json(
      {
        takeIntoAccountAGoodDecisionInfoUpdated,
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
