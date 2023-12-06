import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function GET() {
  const usersMoreInfo = await db.userMoreInfo.findMany({
    select: {
      numberPeopleDependFinancially: true,
    },
  });

  const numberPeopleOptions = [
    { value: 1, label: "1 persona" },
    { value: 2, label: "2 personas" },
    { value: 3, label: "3 personas" },
    { value: 4, label: "4 o más personas" },
    { value: 0, label: "Ninguna" },
  ];

  const numberPeopleCounts: { [key: string]: number } = {};
  usersMoreInfo.forEach(user => {
    const numberOfPeople = user.numberPeopleDependFinancially;
    numberPeopleCounts[numberOfPeople] =
      (numberPeopleCounts[numberOfPeople] || 0) + 1;
  });

  // Transformar el objeto en el formato deseado
  const resultNumberPeople: { [key: string]: number } = {};
  Object.keys(numberPeopleCounts).forEach(numberOfPeople => {
    const formattedNumberOfPeople = numberPeopleOptions.find(
      option => option.value === parseInt(numberOfPeople),
    )?.label;
    resultNumberPeople[formattedNumberOfPeople || ""] =
      numberPeopleCounts[numberOfPeople];
  });

  return NextResponse.json(resultNumberPeople);
}
