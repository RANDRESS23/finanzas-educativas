import { db } from "@/libs/prismaDB";
import type { WelcomeContent } from "@/types/home-content";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const homeContentInfo = await db.homeContent.findMany();

    return NextResponse.json(homeContentInfo[0].welcomeContent, {
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

export async function PUT(request: Request) {
  const body: WelcomeContent = await request.json();

  try {
    const [homeContentInfo] = await db.homeContent.findMany();
    const welcomeInfoUpdated = await db.homeContent.update({
      where: {
        id: homeContentInfo.id,
      },
      data: {
        welcomeContent: {
          subtitle: body.subtitle,
        },
      },
    });

    return NextResponse.json(
      {
        welcomeInfoUpdated,
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
