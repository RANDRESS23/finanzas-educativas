import { GiCash as CashIcon } from "react-icons/gi";
import CardContent from "./CardContent";
import type { FirstDimensionContent } from "@/types/first-dimension-content";

export const dynamic = "force-dynamic";

const getFirstDimensionContent = async () => {
  try {
    const firstDimensionContent = await fetch(
      `${process.env.NEXTAUTH_URL}/api/admin/first-dimension`,
    );
    const data = await firstDimensionContent.json();
    return data;
  } catch (error) {
    console.error({ error });
  }
};

export default async function FirstDimensionContent() {
  const {
    savingContent,
    creditContent,
    expenseAndIncomeContent,
  }: FirstDimensionContent = await getFirstDimensionContent();
  const savingContentDescription = savingContent.savingMeaning.slice(0, 30);
  const creditContentDescription = creditContent.creditMeaning.slice(0, 30);
  const expenseAndIncomeContentDescription =
    expenseAndIncomeContent.expenseMeaning.slice(0, 30);

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
                <CashIcon className="text-3xl" />
              </div>
              <p className="">
                Editar información de la Primera Dimensión{" "}
                <span className="text-sushi-500">
                  (Conocimiento de las finanzas personales)
                </span>
              </p>
            </blockquote>
            <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <CardContent
                title="Ahorro"
                description={`${savingContentDescription}...`}
                section="first-dimension"
              />
              <CardContent
                title="Crédito"
                description={`${creditContentDescription}...`}
                section="first-dimension"
              />
              <CardContent
                title="Ingresos y Gastos"
                description={`${expenseAndIncomeContentDescription}...`}
                section="first-dimension"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
