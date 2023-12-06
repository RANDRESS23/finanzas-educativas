import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function GET() {
  const usersMoreInfo = await db.userMoreInfo.findMany({
    select: {
      incomeComeFrom: true,
    },
  });

  const incomeComeFromCounts: { [key: string]: number } = {};
  usersMoreInfo.forEach(user => {
    const incomeSource = user.incomeComeFrom.toLowerCase();
    incomeComeFromCounts[incomeSource] =
      (incomeComeFromCounts[incomeSource] || 0) + 1;
  });

  // Transformar el objeto en el formato deseado con la primera letra en mayúscula
  const resultIncomeComeFrom: { [key: string]: number } = {};
  Object.keys(incomeComeFromCounts).forEach(incomeSource => {
    const formattedIncomeSource =
      incomeSource.charAt(0).toUpperCase() + incomeSource.slice(1);
    resultIncomeComeFrom[formattedIncomeSource] =
      incomeComeFromCounts[incomeSource];
  });

  return NextResponse.json(resultIncomeComeFrom);
}
