import { db } from "@/libs/prismaDB";
import { informationSchema as ZInfoSchema } from "@/schemas/information.schema";
import { type InformationSchema } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [{ whoami }] =
      (await db.informationSchema.findRaw()) as unknown as InformationSchema[];

    return NextResponse.json({ message: whoami });
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

    const whoami = ZInfoSchema.parse([
      ...body.whoami,
    ]) as InformationSchema["whoami"];

    const updatedWhoami = await db.informationSchema.update({
      where: { id: body.id },
      data: { whoami },
    });

    if (updatedWhoami === null) {
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
