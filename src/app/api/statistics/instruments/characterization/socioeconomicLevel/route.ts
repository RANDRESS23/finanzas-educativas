import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function GET() {
  const usersMoreInfo = await db.userMoreInfo.findMany({
    select: {
      socioeconomicLevel: true,
    },
  });

  const socioeconomicLevelOptions = [
    { value: 1, label: "Estrato 1" },
    { value: 2, label: "Estrato 2" },
    { value: 3, label: "Estrato 3" },
    { value: 4, label: "Estrato 4" },
    { value: 5, label: "Estrato 5" },
  ];

  const socioeconomicLevelCounts: { [key: string]: number } = {};
  usersMoreInfo.forEach(user => {
    const socioeconomicLevel = user.socioeconomicLevel;
    socioeconomicLevelCounts[socioeconomicLevel] =
      (socioeconomicLevelCounts[socioeconomicLevel] || 0) + 1;
  });

  // Transformar el objeto en el formato deseado
  const resultSocioeconomicLevel: { [key: string]: number } = {};
  Object.keys(socioeconomicLevelCounts).forEach(socioeconomicLevel => {
    const formattedSocioeconomicLevel = socioeconomicLevelOptions.find(
      option => option.value === parseInt(socioeconomicLevel),
    )?.label;
    resultSocioeconomicLevel[formattedSocioeconomicLevel || ""] =
      socioeconomicLevelCounts[socioeconomicLevel];
  });

  return NextResponse.json(resultSocioeconomicLevel);
}
