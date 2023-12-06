import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function GET() {
  const dimensions = ["First", "Second", "Third"];

  const result: { [key: string]: { [key: string]: number } } = {};

  for (const dimension of dimensions) {
    const questions = await db.userPreTest.findMany({
      select: {
        [`questions${dimension}Dimension`]: true,
      },
    });

    const dimensionCounts: { [key: string]: number } = {};
    questions.forEach(user => {
      const userDimension = user[`questions${dimension}Dimension`];
      if (userDimension) {
        userDimension.forEach(q => {
          const answer = q.answer;
          dimensionCounts[`${q.question}: ${answer}`] =
            (dimensionCounts[`${q.question}: ${answer}`] || 0) + 1;
        });
      }
    });

    result[`dimension${dimension}`] = dimensionCounts;
  }

  return NextResponse.json(result);
}
