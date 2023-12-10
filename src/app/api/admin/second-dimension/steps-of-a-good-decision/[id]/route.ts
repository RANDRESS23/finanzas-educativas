import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const secondDimensionContentInfo =
      await db.secondDimensionContent.findMany();

    return NextResponse.json(
      secondDimensionContentInfo[0].stepsOfAGoodDecisionContent.find(
        ({ id }) => id === params.id,
      ),
      { status: 200 },
    );
  } catch (error) {
    console.error({ error });

    return NextResponse.json(
      { message: "Something went wrong.", error },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const body: { title: string; description: string } = await request.json();

  try {
    const [secondDimensionContentInfo] =
      await db.secondDimensionContent.findMany();

    const stepsOfAGoodDecisionUpdated =
      secondDimensionContentInfo.stepsOfAGoodDecisionContent.map(
        ({ id, title, description }) => {
          if (id === params.id) {
            return {
              id,
              title: body.title,
              description: body.description,
            };
          }

          return { id, title, description };
        },
      );

    const stepsOfAGoodDecisionInfoUpdated =
      await db.secondDimensionContent.update({
        where: {
          id: secondDimensionContentInfo.id,
        },
        data: {
          stepsOfAGoodDecisionContent: stepsOfAGoodDecisionUpdated,
        },
      });

    return NextResponse.json(
      {
        stepsOfAGoodDecisionInfoUpdated,
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
