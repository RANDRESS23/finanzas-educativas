import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function GET() {
  const usersMoreInfo = await db.userMoreInfo.findMany({
    select: {
      houseServices: true,
    },
  });

  const houseServicesOptions = [
    { value: "acueducto", label: "Acueducto" },
    { value: "alcantarillado", label: "Alcantarillado" },
    { value: "energia", label: "Energía" },
    { value: "gas", label: "Gas" },
    { value: "telefonia", label: "Telefonía" },
    { value: "internet", label: "Internet" },
    { value: "tv por cable", label: "TV por cable" },
    { value: "no-house-services", label: "Ninguno de los anteriores" },
  ];

  const houseServicesCounts: { [key: string]: number } = {};
  usersMoreInfo.forEach(user => {
    user.houseServices.forEach(service => {
      houseServicesCounts[service] = (houseServicesCounts[service] || 0) + 1;
    });
  });

  // Transformar el objeto en el formato deseado
  const resultHouseServices: { [key: string]: number } = {};
  Object.keys(houseServicesCounts).forEach(service => {
    const formattedService = houseServicesOptions.find(
      option => option.value === service,
    )?.label;
    resultHouseServices[formattedService || ""] = houseServicesCounts[service];
  });

  return NextResponse.json(resultHouseServices);
}
