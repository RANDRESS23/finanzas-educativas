import { NextResponse } from "next/server";

export default async function POST(request: Request) {
  const body = await request.json();

  console.log(body);

  return NextResponse.json(
    { message: "Gracias por contactar con el equipo de Finanzas Educativas" },
    { status: 201 }
  );
}
