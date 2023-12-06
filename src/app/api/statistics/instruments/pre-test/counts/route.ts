import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function GET() {
  const usersCompletedPreTest = await db.userPreTest.count();

  return NextResponse.json(usersCompletedPreTest);
}
