import { db } from "@/libs/prismaDB";
import { informationSchema as ZInfoSchema } from "@/schemas/information.schema";
import { InformationSchema } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [{ vision }] =
      (await db.informationSchema.findRaw()) as unknown as Array<InformationSchema>;

    return NextResponse.json({ message: vision });
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

    const vision = ZInfoSchema.parse([
      ...body.vision,
    ]) as InformationSchema["vision"];

    const updatedVision = await db.informationSchema.update({
      where: { id: body.id },
      data: { vision },
    });

    if (updatedVision === null) {
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
