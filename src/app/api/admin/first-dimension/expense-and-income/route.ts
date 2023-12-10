import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const firstDimensionContentInfo = await db.firstDimensionContent.findMany();

    return NextResponse.json(
      firstDimensionContentInfo[0].expenseAndIncomeContent,
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
  const body: { expenseMeaning: string; incomeMeaning: string } =
    await request.json();

  try {
    const [firstDimensionContentInfo] =
      await db.firstDimensionContent.findMany();
    const expenseAndIncomeInfoUpdated = await db.firstDimensionContent.update({
      where: {
        id: firstDimensionContentInfo.id,
      },
      data: {
        expenseAndIncomeContent: {
          id: crypto.randomUUID(),
          expenseMeaning: body.expenseMeaning,
          incomeMeaning: body.incomeMeaning,
        },
      },
    });

    return NextResponse.json(
      {
        expenseAndIncomeInfoUpdated,
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
