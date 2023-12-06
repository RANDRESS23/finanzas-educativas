import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function GET() {
  const usersMoreInfo = await db.userMoreInfo.findMany({
    select: {
      healthSystemAffiliation: true,
    },
  });

  const healthSystemAffiliationCounts: { [key: string]: number } = {};
  usersMoreInfo.forEach(user => {
    const affiliationType = user.healthSystemAffiliation.toLowerCase();
    healthSystemAffiliationCounts[affiliationType] =
      (healthSystemAffiliationCounts[affiliationType] || 0) + 1;
  });

  // Transformar el objeto en el formato deseado con la primera letra en mayúscula
  const resultHealthSystemAffiliation: { [key: string]: number } = {};
  Object.keys(healthSystemAffiliationCounts).forEach(affiliationType => {
    const formattedAffiliationType =
      affiliationType.charAt(0).toUpperCase() + affiliationType.slice(1);
    resultHealthSystemAffiliation[formattedAffiliationType] =
      healthSystemAffiliationCounts[affiliationType];
  });

  return NextResponse.json(resultHealthSystemAffiliation);
}
