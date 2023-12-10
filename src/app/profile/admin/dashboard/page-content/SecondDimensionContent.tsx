import { FaUserCheck as UserCheck } from "react-icons/fa";
import CardContent from "./CardContent";
import type { SecondDimensionContent } from "@/types/second-dimension-content";

export const dynamic = "force-dynamic";

const getSecondDimensionContent = async () => {
  try {
    const secondDimensionContent = await fetch(
      `${process.env.NEXTAUTH_URL}/api/admin/second-dimension`,
    );
    const data = await secondDimensionContent.json();
    return data;
  } catch (error) {
    console.error({ error });
  }
};

export default async function SecondDimensionContent() {
  const {
    aGoodDecisionContent,
    stepsOfAGoodDecisionContent,
    takeIntoAccountAGoodDecisionContent,
  }: SecondDimensionContent = await getSecondDimensionContent();
  const aGoodDecisionContentDescription = aGoodDecisionContent[0].slice(0, 30);
  const stepsOfAGoodDecisionContentDescription =
    stepsOfAGoodDecisionContent[0].description.slice(0, 30);
  const takeIntoAccountAGoodDecisionContentDescription =
    takeIntoAccountAGoodDecisionContent[0].slice(0, 30);

  return (
    <div className="flex">
      <div
        id="main-content"
        className="w-full dark:bg-slate-800/20 pt-20 pb-15 relative lg:ml-64"
      >
        <main>
          <div className="pt-6 px-7">
            <blockquote className="w-full flex items-center gap-10 lg:gap-2 text-2xl font-semibold leading-8 sm:leading-9 mb-10">
              <div className="w-[3%]">
                <UserCheck className="text-3xl" />
              </div>
              <p className="">
                Editar información de la Segunda Dimensión{" "}
                <span className="text-sushi-500">
                  (Toma de decisiones financieras)
                </span>
              </p>
            </blockquote>
            <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <CardContent
                title="Buena Toma de Decisión"
                description={`${aGoodDecisionContentDescription}...`}
                section="second-dimension"
              />
              <CardContent
                title="Formas de Tomar Buenas Decisiones"
                description={`${stepsOfAGoodDecisionContentDescription}...`}
                section="second-dimension"
              />
              <CardContent
                title="Tener en Cuenta Para Una Buena Decisión"
                description={`${takeIntoAccountAGoodDecisionContentDescription}...`}
                section="second-dimension"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
