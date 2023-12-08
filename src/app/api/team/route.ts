import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function GET() {
  const teams = await db.team.findMany({
    select: { id: true, teamName: true },
  });
  return NextResponse.json(teams);
}
