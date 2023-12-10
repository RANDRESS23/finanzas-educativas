import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const firstDimensionContentInfo = await db.firstDimensionContent.findMany();

    return NextResponse.json(
      firstDimensionContentInfo[0].savingContent.savingFeatures.find(
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

    const savingFeaturesUpdated =
      firstDimensionContentInfo.savingContent.savingFeatures.map(
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

    const savingFeaturesInfoUpdated = await db.firstDimensionContent.update({
      where: {
        id: firstDimensionContentInfo.id,
      },
      data: {
        savingContent: {
          savingMeaning: firstDimensionContentInfo.savingContent.savingMeaning,
          savingFeatures: savingFeaturesUpdated,
        },
      },
    });

    return NextResponse.json(
      {
        savingFeaturesInfoUpdated,
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
