import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const firstDimensionContentInfo = await db.firstDimensionContent.findMany();

    return NextResponse.json(firstDimensionContentInfo[0].savingContent, {
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

export async function POST(request: Request) {
  const body: { title: string; description: string } = await request.json();

  try {
    const [firstDimensionContentInfo] =
      await db.firstDimensionContent.findMany();
    const savingFeaturesInfoUpdated = await db.firstDimensionContent.update({
      where: {
        id: firstDimensionContentInfo.id,
      },
      data: {
        savingContent: {
          savingMeaning: firstDimensionContentInfo.savingContent.savingMeaning,
          savingFeatures: [
            ...firstDimensionContentInfo.savingContent.savingFeatures,
            {
              id: crypto.randomUUID(),
              title: body.title,
              description: body.description,
            },
          ],
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

export async function PUT(request: Request) {
  const body: { savingMeaning: string } = await request.json();

  try {
    const [firstDimensionContentInfo] =
      await db.firstDimensionContent.findMany();
    const savingFeaturesInfoUpdated = await db.firstDimensionContent.update({
      where: {
        id: firstDimensionContentInfo.id,
      },
      data: {
        savingContent: {
          savingMeaning: body.savingMeaning,
          savingFeatures:
            firstDimensionContentInfo.savingContent.savingFeatures,
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
