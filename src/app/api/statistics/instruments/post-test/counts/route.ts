import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function GET() {
  const usersCompletedPostTest = await db.userPostTest.count();

  return NextResponse.json(usersCompletedPostTest);
}
