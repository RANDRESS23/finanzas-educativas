import { db } from "@/libs/prismaDB";
import { informationSchema as ZInfoSchema } from "@/schemas/information.schema";
import { InformationSchema } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [{ mision }] =
      (await db.informationSchema.findRaw()) as unknown as Array<InformationSchema>;

    return NextResponse.json({ message: mision });
  } catch (error) {
    console.log({ error });

    return NextResponse.json(
      { message: "Something went wrong.", error },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    const mision = ZInfoSchema.parse([
      ...body.mision,
    ]) as InformationSchema["mision"];

    const updatedMision = await db.informationSchema.update({
      where: { id: body.id },
      data: { mision },
    });

    if (updatedMision === null) {
      return NextResponse.json(
        {
          message:
            "No se pudo actualizar la información, por favor intente más tarde.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Información actualizada exitosamente.",
    });
  } catch (error) {
    console.log({ error });

    return NextResponse.json(
      { message: "Something went wrong.", error },
      { status: 500 }
    );
  }
}
