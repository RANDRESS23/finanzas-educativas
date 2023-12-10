import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const firstDimensionContentInfo = await db.firstDimensionContent.findMany();

    return NextResponse.json(
      firstDimensionContentInfo[0].creditContent.creditTypes.find(
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
    const [firstDimensionContentInfo] =
      await db.firstDimensionContent.findMany();

    const creditTypesUpdated =
      firstDimensionContentInfo.creditContent.creditTypes.map(
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

    const creditTypesInfoUpdated = await db.firstDimensionContent.update({
      where: {
        id: firstDimensionContentInfo.id,
      },
      data: {
        creditContent: {
          creditMeaning: firstDimensionContentInfo.creditContent.creditMeaning,
          creditTypes: creditTypesUpdated,
        },
      },
    });

    return NextResponse.json(
      {
        creditTypesInfoUpdated,
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
