import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function GET() {
  const usersMoreInfo = await db.userMoreInfo.findMany({
    select: {
      educationLevel: true,
    },
  });

  const educationLevelCounts: { [key: string]: number } = {};
  usersMoreInfo.forEach(user => {
    const level = user.educationLevel.toLowerCase();
    educationLevelCounts[level] = (educationLevelCounts[level] || 0) + 1;
  });

  // Transformar el objeto en el formato deseado con la primera letra en mayúscula
  const resultEducationLevel: { [key: string]: number } = {};
  Object.keys(educationLevelCounts).forEach(level => {
    const formattedLevel = level.charAt(0).toUpperCase() + level.slice(1);
    resultEducationLevel[formattedLevel] = educationLevelCounts[level];
  });

  return NextResponse.json(resultEducationLevel);
}
