import { db } from "@/libs/prismaDB";
import { informationSchema as ZInfoSchema } from "@/schemas/information.schema";
import { type Meta } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [{ mision }] = await db.meta.findMany();

    return NextResponse.json({ message: mision });
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
    const mision = ZInfoSchema.parse([...body.mision]) as Meta["mision"];

    const updatedMision = await db.meta.update({
      where: { id: body.id },
      data: { mision },
    });

    if (updatedMision === null) {
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
