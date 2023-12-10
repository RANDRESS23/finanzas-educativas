import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const thirdDimensionContentInfo = await db.thirdDimensionContent.findMany();

    return NextResponse.json(thirdDimensionContentInfo[0], { status: 200 });
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
    const existingThirdDimensionContent =
      await db.thirdDimensionContent.findMany();

    if (existingThirdDimensionContent.length > 0) {
      return NextResponse.json(
        {
          messsage:
            "El contenido de la tercera dimension ya se encuentra insertado",
        },
        { status: 400 },
      );
    }

    const financeManagement = body.financeManagement.map(
      ({
        title,
        description,
        imageUrl,
      }: {
        title: string;
        description: string;
        imageUrl: string;
      }) => ({
        id: crypto.randomUUID(),
        title,
        description,
        imageUrl,
      }),
    );

    const thirdDimensionContentInfo = await db.thirdDimensionContent.create({
      data: {
        financeManagement,
      },
    });

    return NextResponse.json(
      {
        thirdDimensionContentInfo,
        message: "Información de la tercera dimension registrada correctamente",
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
