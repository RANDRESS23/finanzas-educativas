import { type ExpenseAndIncomeContent } from "@/types/first-dimension-content";
import { Income, Expense } from "./svgs";

interface ExpenseAndIncomeProps {
  expenseAndIncomeContent: ExpenseAndIncomeContent;
}

export default function ExpensesAndIncomes({
  expenseAndIncomeContent,
}: ExpenseAndIncomeProps) {
  const { expenseMeaning, incomeMeaning } = expenseAndIncomeContent;

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto mt-5 flex flex-col max-w-3xl lg:text-center">
        <div className="mt-4 flex justify-center items-center gap-14 sm:text-4xl">
          <div className="hidden lg:block flow-finanzas-xd">
            <Expense />
          </div>
          <div>
            <p className="text-3xl text-left font-bold tracking-tight">
              ¿Qué son ingresos?
            </p>
            <p className="mt-6 text-lg text-left leading-8 text-gray-600 dark:text-gray-400 flow-finanzas-xd">
              {incomeMeaning}
            </p>
          </div>
        </div>
        <div className="mt-14 sm:mt-24 flex justify-center items-center gap-14 sm:text-4xl">
          <div>
            <p className="text-3xl text-left font-bold tracking-tight">
              ¿Qué son gastos?
            </p>
            <div className="mt-6 text-lg text-left leading-8 text-gray-600 dark:text-gray-400 flow-finanzas-xd">
              {expenseMeaning} <br />
              <br />
              <span className="text-gray-800 dark:text-zinc-200 font-bold">
                Ejemplos:
              </span>
              <ul className="pl-6">
                <li>- Arriendo.</li>
                <li>- Servicios públicos.</li>
                <li>- Cuota tarjeta de crédito.</li>
                <li>- Suscripción a servicio de streaming.</li>
                <li>- Ropa.</li>
                <li>- Vacaciones en la playa.</li>
              </ul>
            </div>
          </div>
          <div className="hidden lg:block flow-finanzas-xd">
            <Income />
          </div>
        </div>
      </div>
    </div>
  );
}
