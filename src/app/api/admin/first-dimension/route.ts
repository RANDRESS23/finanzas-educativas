import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const firstDimensionContentInfo = await db.firstDimensionContent.findMany();

    return NextResponse.json(firstDimensionContentInfo[0], { status: 200 });
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
    const existingFirstDimensionContent =
      await db.firstDimensionContent.findMany();

    if (existingFirstDimensionContent.length > 0) {
      return NextResponse.json(
        {
          messsage:
            "El contenido de la primera dimension ya se encuentra insertado",
        },
        { status: 400 },
      );
    }

    const savingFeatures = body.savingContent.savingFeatures.map(
      ({ title, description }: { title: string; description: string }) => ({
        id: crypto.randomUUID(),
        title,
        description,
      }),
    );

    const creditTypes = body.creditContent.creditTypes.map(
      ({ title, description }: { title: string; description: string }) => ({
        id: crypto.randomUUID(),
        title,
        description,
      }),
    );

    const firstDimensionContentInfo = await db.firstDimensionContent.create({
      data: {
        savingContent: {
          savingMeaning: body.savingContent.savingMeaning,
          savingFeatures,
        },
        creditContent: {
          creditMeaning: body.creditContent.creditMeaning,
          creditTypes,
        },
        expenseAndIncomeContent: {
          id: crypto.randomUUID(),
          expenseMeaning: body.expenseAndIncomeContent.expenseMeaning,
          incomeMeaning: body.expenseAndIncomeContent.incomeMeaning,
        },
      },
    });

    return NextResponse.json(
      {
        firstDimensionContentInfo,
        message: "Información de la primera dimension registrada correctamente",
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
