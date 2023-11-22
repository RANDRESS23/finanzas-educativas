import { db } from "@/libs/prismaDB";
import { informationSchema as ZInfoSchema } from "@/schemas/information.schema";
import { type Meta } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [{ whoami }] = await db.meta.findMany();

    return NextResponse.json({ message: whoami });
  } catch (error) {
    console.error({ error });

    return NextResponse.json(
      { message: "Something went wrong.", error },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  const body = await request.json();

  try {
    const whoami = ZInfoSchema.parse([...body.whoami]) as Meta["whoami"];

    const updatedWhoami = await db.meta.update({
      where: { id: body.id },
      data: { whoami },
    });

    if (updatedWhoami === null) {
      throw new Error();
    }

    return NextResponse.json({
      message: "Información actualizada exitosamente.",
    });
  } catch (error) {
    console.error({ error });

    return NextResponse.json(
      { message: "Something went wrong.", error },
      { status: 500 },
    );
  }
}
