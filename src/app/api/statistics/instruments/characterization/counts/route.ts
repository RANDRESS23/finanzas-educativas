import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function GET() {
  const usersCompletedCharacterization = await db.userMoreInfo.count();

  return NextResponse.json(usersCompletedCharacterization);
}
