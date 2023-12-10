import { BsCashCoin as CashIcon } from "react-icons/bs";
import CardContent from "./CardContent";
import type { ThirdDimensionContent } from "@/types/third-dimension-content";

export const dynamic = "force-dynamic";

const getThirdDimensionContent = async () => {
  try {
    const secondDimensionContent = await fetch(
      `${process.env.NEXTAUTH_URL}/api/admin/third-dimension`,
    );
    const data = await secondDimensionContent.json();
    return data;
  } catch (error) {
    console.error({ error });
  }
};

export default async function ThirdDimensionContent() {
  const { financeManagement }: ThirdDimensionContent =
    await getThirdDimensionContent();
  const financeManagementDescription = financeManagement[0].description.slice(
    0,
    30,
  );

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
                Editar información de la Tercera Dimensión{" "}
                <span className="text-sushi-500">
                  (Administración de sus propias finanzas)
                </span>
              </p>
            </blockquote>
            <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <CardContent
                title="Manejo de Finanzas Adecuadamente"
                description={`${financeManagementDescription}...`}
                section="third-dimension"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
