import {
  FinanceIcon,
  PigMoneyIcon,
} from "@/app/financial-education/first-dimension/icons";
import { Saving } from "./svgs";
import { type SavingContent } from "@/types/first-dimension-content";

interface SavingSectionProps {
  savingContent: SavingContent;
}

export default function SavingSection({ savingContent }: SavingSectionProps) {
  const { savingMeaning, savingFeatures } = savingContent;

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl lg:text-center">
          <h2 className="text-4xl font-semibold leading-7 text-sushi-500 mb-10">
            Ahorro
          </h2>
          <div className="mt-4 flex justify-center items-center gap-14 sm:text-4xl">
            <div className="hidden lg:block">
              <Saving />
            </div>
            <div>
              <p className="text-3xl text-left font-bold tracking-tight">
                ¿Qué es el ahorro?
              </p>
              <p className="mt-6 text-lg text-left leading-8 text-gray-600 dark:text-gray-400">
                {savingMeaning}
              </p>
            </div>
          </div>
          <p className="mt-40 text-2xl font-bold tracking-tight sm:text-3xl">
            Formas de ahorro
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-2xl sm:mt-14 lg:mt-16 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {savingFeatures.map(({ title, description }, index) => (
              <div key={title} className="relative pl-16 flow-finanzas-xd">
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
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
