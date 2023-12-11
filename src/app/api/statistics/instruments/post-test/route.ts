import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function GET() {
  const dimensions = ["First", "Second", "Third"];

  const result: {
    [key: string]: { [key: string]: { [key: string]: number } };
  } = {};

  for (const dimension of dimensions) {
    const questions = await db.userPostTest.findMany({
      select: {
        [`questions${dimension}Dimension`]: true,
      },
    });

    const dimensionCounts: { [key: string]: { [key: string]: number } } = {};
    questions.forEach(user => {
      const userDimension = user[`questions${dimension}Dimension`];
      if (userDimension) {
        userDimension.forEach(q => {
          const question = q.question;
          const answer = q.answer;

          dimensionCounts[question] = dimensionCounts[question] || {};
          dimensionCounts[question][answer] =
            (dimensionCounts[question][answer] || 0) + 1;
        });
      }
    });

    result[`dimension${dimension}`] = dimensionCounts;
  }

  const transformedResult: {
    [key: string]: { [key: string]: { [key: string]: number } };
  } = {};

  for (const dimension of dimensions) {
    transformedResult[`dimension${dimension}`] = {};

    // Iterar sobre cada pregunta
    Object.keys(result[`dimension${dimension}`]).forEach(question => {
      transformedResult[`dimension${dimension}`][question] = {};

      // Iterar sobre cada respuesta en la pregunta
      Object.keys(result[`dimension${dimension}`][question]).forEach(answer => {
        transformedResult[`dimension${dimension}`][question][answer] =
          result[`dimension${dimension}`][question][answer];
      });
    });
  }

  return NextResponse.json(transformedResult);
}
