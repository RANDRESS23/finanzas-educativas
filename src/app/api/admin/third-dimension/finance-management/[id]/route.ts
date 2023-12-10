import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const thirdDimensionContentInfo = await db.thirdDimensionContent.findMany();

    return NextResponse.json(
      thirdDimensionContentInfo[0].financeManagement.find(
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
  const body: { title: string; description: string; imageUrl: string } =
    await request.json();

  try {
    const [thirdDimensionContentInfo] =
      await db.thirdDimensionContent.findMany();

    const financeManagementUpdated =
      thirdDimensionContentInfo.financeManagement.map(
        ({ id, title, description, imageUrl }) => {
          if (id === params.id) {
            return {
              id,
              title: body.title,
              description: body.description,
              imageUrl: body.imageUrl,
            };
          }

          return { id, title, description, imageUrl };
        },
      );

    const financeManagementInfoUpdated = await db.thirdDimensionContent.update({
      where: {
        id: thirdDimensionContentInfo.id,
      },
      data: {
        financeManagement: financeManagementUpdated,
      },
    });

    return NextResponse.json(
      {
        financeManagementInfoUpdated,
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
