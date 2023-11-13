import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const welcomeInfo = await db.homeContent.findMany();

    return NextResponse.json(welcomeInfo[0], { status: 200 });
  } catch (error) {
    console.error({ error });

    return NextResponse.json(
      { message: "Something went wrong.", error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const existingHomeContent = await db.homeContent.findMany();

    if (existingHomeContent.length > 0) {
      return NextResponse.json(
        { messsage: "El contenido del home ya se encuentra insertado" },
        { status: 400 }
      );
    }

    const homeContentInfo = await db.homeContent.create({
      data: {
        welcomeContent: {
          subtitle: body.welcomeContent.subtitle,
        },
        knowledgePillsContent: {
          subtitle: body.knowledgePillsContent.subtitle,
          knowledgePills: body.knowledgePillsContent.knowledgePills,
        },
        informativeVideosContent: {
          subtitle: body.informativeVideosContent.subtitle,
          informativeVideos: body.informativeVideosContent.informativeVideos,
        },
      },
    });

    return NextResponse.json(
      {
        homeContentInfo,
        message: "Información del home registrada correctamente",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error({ error });

    return NextResponse.json(
      { message: "Something went wrong.", error },
      { status: 500 }
    );
  }
}
