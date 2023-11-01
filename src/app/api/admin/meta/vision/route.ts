import { db } from "@/libs/prismaDB";
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

export async function POST(request: Request) {
  try {
    await request.json();

    return NextResponse.json({
      message: "Información actualizada exitosamente.",
    });
  } catch (error) {}
}
