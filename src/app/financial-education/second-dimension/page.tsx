import {
  FinanceIcon,
  PigMoneyIcon,
} from "@/app/financial-education/first-dimension/icons";
import type { SecondDimensionContent } from "@/types/second-dimension-content";

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

export default async function SecondDimension() {
  const {
    aGoodDecisionContent,
    stepsOfAGoodDecisionContent,
    takeIntoAccountAGoodDecisionContent,
  }: SecondDimensionContent = await getSecondDimensionContent();

  return (
    <div className="py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <blockquote className="text-justify text-3xl font-semibold leading-8 sm:text-4xl sm:leading-9 mb-10">
          <p className="text-center">
            Una <span className="text-sushi-500">Buena Toma</span> de Decisión
          </p>
          <p className="text-lg font-normal mt-5 text-gray-600 dark:text-gray-400 lg:w-3/4 lg:mx-auto lg:px-36">
            {aGoodDecisionContent[0]} <br />
            <br />
            {aGoodDecisionContent[1]}
          </p>
        </blockquote>
        <blockquote className="text-center text-2xl font-semibold leading-8 sm:text-3xl sm:leading-9 mb-10 mt-20">
          <p>
            Como se puede tomar una{" "}
            <span className="text-sushi-500">Buena Toma</span> de Decisiones
          </p>
          <p className="text-lg font-normal mt-5 text-gray-600 dark:text-gray-400 lg:w-3/4 lg:mx-auto lg:px-36">
            Para tomar una buena decisión implica hacer un proceso reflexivo y
            cuidadoso siguiendo unos pasos claves los cuales son:
          </p>
        </blockquote>
        <div className="mx-auto mt-12 max-w-2xl sm:mt-14 lg:mt-16 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {stepsOfAGoodDecisionContent.map(
              ({ title, description }, index) => (
                <div
                  key={`${title}${index}`}
                  className="relative pl-16 flow-finanzas-xd"
                >
                  <dt className="text-base font-bold leading-7 text-sushi-500">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-boston-blue-600">
                      {index % 2 === 0 ? <FinanceIcon /> : <PigMoneyIcon />}
                    </div>
                    {title}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                    {description}
                  </dd>
                </div>
              ),
            )}
          </dl>
        </div>
        <blockquote className="text-center text-2xl font-semibold leading-8 sm:text-3xl sm:leading-9 mb-10 mt-20">
          <p>
            ¿Que hay que tener en cuenta para tomar una{" "}
            <span className="text-sushi-500">Buena Decisión</span>?{" "}
          </p>
          <p className="text-justify text-lg font-normal mt-5 text-gray-600 dark:text-gray-400 lg:w-3/4 lg:mx-auto flow-finanzas-xd lg:px-36">
            {takeIntoAccountAGoodDecisionContent[0]}
            <br />
            <br />
            {takeIntoAccountAGoodDecisionContent[1]}
          </p>
        </blockquote>
      </div>
    </div>
  );
}
