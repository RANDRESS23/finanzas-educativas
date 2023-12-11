import PieStatic from "@/components/Statistics/Chart/PieStatic";
import CounterUserIntruments from "@/components/Statistics/Counter/CounterUserIntruments";
import dimensionsData from "@/json/questions-post-test.json";
import { authOptions } from "@/libs/authOptions";
import { translateDimensionName } from "@/libs/translator";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function PostTestStatisticPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.email !== "admin@gmail.com") {
    redirect("/profile/user");
  }

  const request = await fetch(
    `${process.env.NEXTAUTH_URL}/api/statistics/instruments/post-test`,
  );
  const data = await request.json();

  return (
    <div>
      <div className="flex overflow-hidden">
        <div
          id="main-content"
          className="h-full w-full bg-gray-50 dark:bg-slate-800/20 py-20 relative overflow-y-auto lg:ml-64"
        >
          <main>
            <div className="pt-6 px-4">
              <CounterUserIntruments
                instrument="Instrumento Post-Test"
                statistic="/post-test/counts"
              />

              <blockquote className="w-full flex items-center gap-3 text-3xl font-semibold leading-8 sm:leading-9 mt-20 mb-8 justify-center text-center">
                <h1 className="">
                  Estadísticas del instrumento{" "}
                  <span className="text-sushi-500">Post-Test</span>
                </h1>
              </blockquote>

              {Object.keys(dimensionsData).map(dimension => (
                <div key={dimension}>
                  <blockquote className="w-full flex items-center gap-3 text-2xl font-semibold leading-8 sm:leading-9 mt-20 mb-5 justify-start">
                    <h1 className="">
                      Preguntas{" "}
                      <span className="text-sushi-500">
                        {translateDimensionName(
                          dimension.replace("dimension", ""),
                        )}{" "}
                        Dimensión
                      </span>
                    </h1>
                  </blockquote>

                  {(dimensionsData as any)[dimension].map(
                    (questionData: any) => (
                      <div
                        key={questionData.name}
                        className="shadow dark:shadow-slate-700 mb-4 p-4 sm:p-6 h-full"
                      >
                        <PieStatic
                          title={{
                            text: questionData.text,
                            subtext: questionData.subtext,
                          }}
                          data={data[dimension][questionData.name]}
                        />
                      </div>
                    ),
                  )}
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
