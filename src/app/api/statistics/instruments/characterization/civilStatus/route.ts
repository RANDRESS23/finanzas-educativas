import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function GET() {
  const usersMoreInfo = await db.userMoreInfo.findMany({
    select: {
      civilStatus: true,
    },
  });

  const civilStatusCounts: { [key: string]: number } = {};
  usersMoreInfo.forEach(user => {
    const status = user.civilStatus.toLowerCase();
    civilStatusCounts[status] = (civilStatusCounts[status] || 0) + 1;
  });

  // Transformar el objeto en el formato deseado con la primera letra en mayúscula
  const resultCivilStatus: { [key: string]: number } = {};
  Object.keys(civilStatusCounts).forEach(status => {
    const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);
    resultCivilStatus[formattedStatus] = civilStatusCounts[status];
  });

  return NextResponse.json(resultCivilStatus);
}
