import { FinanceIcon, PigMoneyIcon } from "./icons";
import { Saving } from "./svgs";

const features = [
  {
    name: "Cuenta de ahorro",
    description:
      "Una cuenta de ahorro es un lugar seguro para guardar tu dinero y ganar un poco de interés. Puedes guardar tu dinero en el banco y acceder a él en cualquier momento. Es una forma fácil de ahorrar y mantener tu dinero separado de tus gastos diarios.",
    Icon: FinanceIcon,
  },
  {
    name: "Certificado de Depósito (CDT)",
    description:
      "Un certificado de depósito (CDT) es una forma de ahorro a largo plazo. Depositas una cantidad de dinero en el banco por un período de tiempo específico y, a cambio, el banco te paga intereses. No puedes retirar el dinero antes de que termine el plazo sin pagar una penalidad.",
    Icon: FinanceIcon,
  },
  {
    name: "Fondos de Inversión",
    description:
      "Los fondos de inversión son una forma de ahorrar e invertir tu dinero al mismo tiempo. Un fondo de inversión agrupa el dinero de muchas personas y lo invierte en diferentes acciones, bonos u otras inversiones. Puedes conseguir ganancias si las inversiones del fondo tienen éxito.",
    Icon: FinanceIcon,
  },
  {
    name: "Plan de Jubilación (401(k) o IRA)",
    description:
      "Un plan de jubilación es una forma de ahorrar dinero para cuando te retires. En los Estados Unidos, hay dos tipos principales: el 401(k) y el IRA. Por lo general, puedes elegir invertir parte de tu salario y, a veces, tu empleador también te puede igualar una parte de tus ahorros.",
    Icon: PigMoneyIcon,
  },
  {
    name: "Presupuesto",
    description:
      "Un presupuesto es un plan para administrar tu dinero. Con un presupuesto, puedes asignar cierta cantidad de dinero a diferentes categorías, como gastos diarios, ahorros y diversión. Esto te ayuda a controlar tus gastos y ahorrar más dinero.",
    Icon: PigMoneyIcon,
  },
  {
    name: "Reducción de Gastos",
    description:
      "La reducción de gastos implica identificar áreas en las que puedes gastar menos dinero. Puede significar hacer compras más inteligentes, evitar gastos innecesarios o buscar formas de ahorrar en tus facturas. Al reducir tus gastos, tendrás más dinero para ahorrar.",
    Icon: PigMoneyIcon,
  },
];

export default function SavingSection() {
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
                El ahorro es guardar una parte de nuestro dinero (ingresos) para
                ser usado en un futuro, ya sea para un imprevisto, una
                emergencia o una inversión en crecimiento. El ahorro se refiere
                a la parte del dinero que nosotros asignamos a otros usos a
                parte del consumo. Hay muchas formas de ahorrar y también muchas
                herramientas financieras disponibles que se pueden utilizar para
                aumentar la cantidad de ahorros que se pretende realizar.
              </p>
            </div>
          </div>
          <p className="mt-16 text-2xl font-bold tracking-tight sm:text-3xl">
            Formas de ahorro
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-2xl sm:mt-14 lg:mt-16 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map(({ name, description, Icon }) => (
              <div key={name} className="relative pl-16">
                <dt className="text-base font-bold leading-7 text-sushi-500">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-boston-blue-600">
                    <Icon />
                  </div>
                  {name}
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
