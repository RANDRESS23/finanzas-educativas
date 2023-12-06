import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function GET() {
  const usersMoreInfo = await db.userMoreInfo.findMany({
    select: {
      age: true,
    },
  });

  const ageRanges = [
    { min: 0, max: 17, label: "Entre 0 y 17" },
    { min: 18, max: 25, label: "Entre 18 y 25" },
    { min: 26, max: 33, label: "Entre 26 y 33" },
    { min: 34, max: 41, label: "Entre 34 y 41" },
    { min: 42, max: 49, label: "Entre 42 y 49" },
    { min: 50, max: 57, label: "Entre 50 y 57" },
    { min: 58, max: 130, label: "Más de 57" },
  ];

  const ageCounts: { [key: string]: number } = ageRanges.reduce(
    (acc, range) => {
      acc[range.label] = usersMoreInfo.filter(user => {
        const userAge = parseInt(user.age[0]); // Tomar solo el valor inferior del rango
        return userAge >= range.min && userAge <= range.max;
      }).length;
      return acc;
    },
    {} as { [key: string]: number },
  );

  return NextResponse.json(ageCounts);
}
