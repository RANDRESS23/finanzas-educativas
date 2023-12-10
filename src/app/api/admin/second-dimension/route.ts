import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const secondDimensionContentInfo =
      await db.secondDimensionContent.findMany();

    return NextResponse.json(secondDimensionContentInfo[0], { status: 200 });
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
    const existingSecondDimensionContent =
      await db.secondDimensionContent.findMany();

    if (existingSecondDimensionContent.length > 0) {
      return NextResponse.json(
        {
          messsage:
            "El contenido de la segunda dimension ya se encuentra insertado",
        },
        { status: 400 },
      );
    }

    const stepsOfAGoodDecision = body.stepsOfAGoodDecisionContent.map(
      ({ title, description }: { title: string; description: string }) => ({
        id: crypto.randomUUID(),
        title,
        description,
      }),
    );

    const secondDimensionContentInfo = await db.secondDimensionContent.create({
      data: {
        aGoodDecisionContent: body.aGoodDecisionContent,
        stepsOfAGoodDecisionContent: stepsOfAGoodDecision,
        takeIntoAccountAGoodDecisionContent:
          body.takeIntoAccountAGoodDecisionContent,
      },
    });

    return NextResponse.json(
      {
        secondDimensionContentInfo,
        message: "Información de la segunda dimension registrada correctamente",
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
