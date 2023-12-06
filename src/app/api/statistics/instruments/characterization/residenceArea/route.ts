import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function GET() {
  const usersMoreInfo = await db.userMoreInfo.findMany({
    select: {
      residenceArea: true,
    },
  });

  const residenceAreaCounts: { [key: string]: number } = {};
  usersMoreInfo.forEach(user => {
    const area = user.residenceArea.toLowerCase();
    residenceAreaCounts[area] = (residenceAreaCounts[area] || 0) + 1;
  });

  // Transformar el objeto en el formato deseado con la primera letra en mayúscula
  const resultResidenceArea: { [key: string]: number } = {};
  Object.keys(residenceAreaCounts).forEach(area => {
    const formattedArea = area.charAt(0).toUpperCase() + area.slice(1);
    resultResidenceArea[formattedArea] = residenceAreaCounts[area];
  });

  return NextResponse.json(resultResidenceArea);
}
