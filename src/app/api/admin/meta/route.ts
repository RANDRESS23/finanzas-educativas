import { db } from "@/libs/prismaDB";
import { InformationSchema } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [aboutInfo] =
      (await db.informationSchema.findRaw()) as unknown as Array<InformationSchema>;

    return NextResponse.json({ message: aboutInfo });
  } catch (error) {
    console.log({ error });

    return NextResponse.json(
      { message: "Something went wrong.", error },
      { status: 500 }
    );
  }
}