import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function GET() {
  const usersMoreInfo = await db.userMoreInfo.findMany({
    select: {
      gender: true,
    },
  });

  const genderCounts: { [key: string]: number } = {};
  usersMoreInfo.forEach(user => {
    const gender = user.gender.toLowerCase();
    genderCounts[gender] = (genderCounts[gender] || 0) + 1;
  });

  // Transformar el objeto en el formato deseado con la primera letra en mayúscula
  const resultObject: { [key: string]: number } = {};
  Object.keys(genderCounts).forEach(gender => {
    const formattedGender = gender.charAt(0).toUpperCase() + gender.slice(1);
    resultObject[formattedGender] = genderCounts[gender];
  });

  return NextResponse.json(resultObject);
}
