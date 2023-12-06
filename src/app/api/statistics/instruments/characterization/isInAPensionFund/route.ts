import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function GET() {
  const usersMoreInfo = await db.userMoreInfo.findMany({
    select: {
      isInAPensionFund: true,
    },
  });

  const pensionFundCounts: { [key: string]: number } = {};
  usersMoreInfo.forEach(user => {
    const isInAPensionFund = user.isInAPensionFund ? "Si" : "No";
    pensionFundCounts[isInAPensionFund] =
      (pensionFundCounts[isInAPensionFund] || 0) + 1;
  });

  // Transformar el objeto en el formato deseado
  const resultPensionFund: { [key: string]: number } = {};
  Object.keys(pensionFundCounts).forEach(isInAPensionFund => {
    resultPensionFund[isInAPensionFund] = pensionFundCounts[isInAPensionFund];
  });

  return NextResponse.json(resultPensionFund);
}
