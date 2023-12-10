import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const homeContentInfo = await db.homeContent.findMany();

    return NextResponse.json(homeContentInfo[0].informativeVideosContent, {
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
  const body: { title: string; url: string } = await request.json();

  try {
    const [homeContentInfo] = await db.homeContent.findMany();
    const informativeVideosInfoUpdated = await db.homeContent.update({
      where: {
        id: homeContentInfo.id,
      },
      data: {
        informativeVideosContent: {
          subtitle: homeContentInfo.informativeVideosContent.subtitle,
          informativeVideos: [
            ...homeContentInfo.informativeVideosContent.informativeVideos,
            {
              id: crypto.randomUUID(),
              title: body.title,
              url: body.url,
            },
          ],
        },
      },
    });

    return NextResponse.json(
      {
        informativeVideosInfoUpdated,
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
    const informativeVideosInfoUpdated = await db.homeContent.update({
      where: {
        id: homeContentInfo.id,
      },
      data: {
        informativeVideosContent: {
          subtitle: body.subtitle,
          informativeVideos:
            homeContentInfo.informativeVideosContent.informativeVideos,
        },
      },
    });

    return NextResponse.json(
      {
        informativeVideosInfoUpdated,
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
