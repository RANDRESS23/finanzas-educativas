import { db } from "@/libs/prismaDB";
import { type KnowledgePill } from "@/types/home-content";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body: { title: string, description: string } = await request.json();

  try {
    const [homeContentInfo] = await db.homeContent.findMany();

    const knowledgePillsUpdated = homeContentInfo.knowledgePillsContent.knowledgePills.map(({ id, title, description }) => {
      if (id === params.id) {
        return {
          id,
          title: body.title,
          description: body.description,
        }
      }

      return { id, title, description }
    })

    const knowledgePillsInfoUpdated = await db.homeContent.update({
      where: {
        id: homeContentInfo.id,
      },
      data: {
        knowledgePillsContent: {
          subtitle: homeContentInfo.knowledgePillsContent.subtitle,
          knowledgePills: knowledgePillsUpdated,
        },
      },
    });

    return NextResponse.json(
      {
        knowledgePillsInfoUpdated,
        message: "Información actualizada correctamente",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error({ error });

    return NextResponse.json(
      { message: "Something went wrong.", error },
      { status: 500 }
    );
  }
}

// HACER EL DELETE
export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [homeContentInfo] = await db.homeContent.findMany();

    let knowledgePillsUpdated: KnowledgePill[] = [];
    
    homeContentInfo.knowledgePillsContent
      .knowledgePills.forEach((knowledgePill) => {
        if (knowledgePill.id !== params.id) {
          knowledgePillsUpdated = [...knowledgePillsUpdated, knowledgePill]
        }
      })

    const knowledgePillsInfoUpdated = await db.homeContent.update({
      where: {
        id: homeContentInfo.id,
      },
      data: {
        knowledgePillsContent: {
          subtitle: homeContentInfo.knowledgePillsContent.subtitle,
          knowledgePills: knowledgePillsUpdated,
        },
      },
    });

    return NextResponse.json(
      {
        knowledgePillsInfoUpdated,
        message: "Información actualizada correctamente",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error({ error });

    return NextResponse.json(
      { message: "Something went wrong.", error },
      { status: 500 }
    );
  }
}