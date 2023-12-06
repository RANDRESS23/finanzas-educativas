import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function GET() {
  const usersMoreInfo = await db.userMoreInfo.findMany({
    select: {
      typeOfHousing: true,
    },
  });

  const typeOfHousingCounts: { [key: string]: number } = {};
  usersMoreInfo.forEach(user => {
    const housingType = user.typeOfHousing.toLowerCase();
    typeOfHousingCounts[housingType] =
      (typeOfHousingCounts[housingType] || 0) + 1;
  });

  // Transformar el objeto en el formato deseado con la primera letra en mayúscula
  const resultTypeOfHousing: { [key: string]: number } = {};
  Object.keys(typeOfHousingCounts).forEach(housingType => {
    const formattedHousingType =
      housingType.charAt(0).toUpperCase() + housingType.slice(1);
    resultTypeOfHousing[formattedHousingType] =
      typeOfHousingCounts[housingType];
  });

  return NextResponse.json(resultTypeOfHousing);
}
