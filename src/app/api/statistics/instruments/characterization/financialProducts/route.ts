import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function GET() {
  const usersMoreInfo = await db.userMoreInfo.findMany({
    select: {
      financialProducts: true,
    },
  });

  const financialProductsOptions = [
    { value: "cuenta de ahorros", label: "Cuenta de ahorros" },
    { value: "cuenta corriente", label: "Cuenta corriente" },
    { value: "tarjeta de credito", label: "Tarjeta de crédito" },
    { value: "tarjeta debito", label: "Tarjeta debito" },
    { value: "CDT", label: "CDT" },
    {
      value: "credito hipotecario",
      label: "Crédito hipotecario (crédito de vivienda)",
    },
    {
      value: "credito de libre inversión",
      label: "Crédito de libre inversión",
    },
    { value: "fondos de inversion", label: "Fondos de inversión" },
    { value: "credito educativo", label: "Crédito educativo" },
    { value: "ninguno", label: "Ninguno de los anteriores" },
  ];

  const financialProductsCounts: { [key: string]: number } = {};
  usersMoreInfo.forEach(user => {
    user.financialProducts.forEach(product => {
      financialProductsCounts[product] =
        (financialProductsCounts[product] || 0) + 1;
    });
  });

  // Transformar el objeto en el formato deseado
  const resultFinancialProducts: { [key: string]: number } = {};
  Object.keys(financialProductsCounts).forEach(product => {
    const formattedProduct = financialProductsOptions.find(
      option => option.value === product,
    )?.label;
    resultFinancialProducts[formattedProduct || ""] =
      financialProductsCounts[product];
  });

  return NextResponse.json(resultFinancialProducts);
}
