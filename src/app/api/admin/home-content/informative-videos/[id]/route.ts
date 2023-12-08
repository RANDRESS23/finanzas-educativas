import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const homeContentInfo = await db.homeContent.findMany();

    return NextResponse.json(
      homeContentInfo[0].informativeVideosContent.informativeVideos.find(
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
  const body: { title: string; url: string } = await request.json();

  try {
    const [homeContentInfo] = await db.homeContent.findMany();

    const informativeVideosUpdated =
      homeContentInfo.informativeVideosContent.informativeVideos.map(
        ({ id, title, url }) => {
          if (id === params.id) {
            return {
              id,
              title: body.title,
              url: body.url,
            };
          }

          return { id, title, url };
        },
      );

    const informativeVideosInfoUpdated = await db.homeContent.update({
      where: {
        id: homeContentInfo.id,
      },
      data: {
        informativeVideosContent: {
          subtitle: homeContentInfo.informativeVideosContent.subtitle,
          informativeVideos: informativeVideosUpdated,
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
