import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const homeContentInfo = await db.homeContent.findMany();

    return NextResponse.json(homeContentInfo[0].knowledgePillsContent, {
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
    const [homeContentInfo] = await db.homeContent.findMany();
    const knowledgePillsInfoUpdated = await db.homeContent.update({
      where: {
        id: homeContentInfo.id,
      },
      data: {
        knowledgePillsContent: {
          subtitle: homeContentInfo.knowledgePillsContent.subtitle,
          knowledgePills: [
            ...homeContentInfo.knowledgePillsContent.knowledgePills,
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
        knowledgePillsInfoUpdated,
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
  const body: { subtitle: string } = await request.json();

  try {
    const [homeContentInfo] = await db.homeContent.findMany();
    const knowledgePillsInfoUpdated = await db.homeContent.update({
      where: {
        id: homeContentInfo.id,
      },
      data: {
        knowledgePillsContent: {
          subtitle: body.subtitle,
          knowledgePills: homeContentInfo.knowledgePillsContent.knowledgePills,
        },
      },
    });

    return NextResponse.json(
      {
        knowledgePillsInfoUpdated,
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
