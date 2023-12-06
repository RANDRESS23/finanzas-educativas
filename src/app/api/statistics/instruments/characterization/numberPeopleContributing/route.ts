import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function GET() {
  const usersMoreInfo = await db.userMoreInfo.findMany({
    select: {
      numberPeopleContributing: true,
    },
  });

  const numberPeopleContributingOptions = [
    { value: 1, label: "1 persona" },
    { value: 2, label: "2 personas" },
    { value: 3, label: "3 personas" },
    { value: 4, label: "4 o más personas" },
  ];

  const numberPeopleContributingCounts: { [key: string]: number } = {};
  usersMoreInfo.forEach(user => {
    const numberOfPeople = user.numberPeopleContributing;
    numberPeopleContributingCounts[numberOfPeople] =
      (numberPeopleContributingCounts[numberOfPeople] || 0) + 1;
  });

  // Transformar el objeto en el formato deseado
  const resultNumberPeopleContributing: { [key: string]: number } = {};
  Object.keys(numberPeopleContributingCounts).forEach(numberOfPeople => {
    const formattedNumberOfPeople = numberPeopleContributingOptions.find(
      option => option.value === parseInt(numberOfPeople),
    )?.label;
    resultNumberPeopleContributing[formattedNumberOfPeople || ""] =
      numberPeopleContributingCounts[numberOfPeople];
  });

  return NextResponse.json(resultNumberPeopleContributing);
}
