import Image from "next/image";
import { Credit } from "./svgs";
import creditFeatures from "@/meta/creditSectionFeatures";

export default function CreditSection() {
  return (
    <div className="mx-auto max-w-2xl items-center gap-x-8 gap-y-16 px-4 py-20 sm:px-6 lg:max-w-7xl lg:px-8 lg:text-center">
      <h2 className="text-4xl font-semibold leading-7 text-sushi-500 mb-8">
        Crédito
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 lg:w-full items-center md:mb-10">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            ¿Qué es un crédito?
          </h2>
          <p className="mt-6 text-lg text-left leading-8 text-gray-600 dark:text-gray-400">
            El crédito es un préstamo de dinero que una persona o entidad le
            otorga a otra, con el compromiso de que, en el futuro, quien lo
            recibe devolverá dicho préstamo en forma gradual (mediante el pago
            de cuotas) o en un solo pago y con un interés adicional que compensa
            a quien presta, por todo el tiempo que no tuvo ese dinero.
          </p>
        </div>
        <div className="hidden md:block text-center items-center justify-self-center justify-items-center justify-center">
          <Credit />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-10 place-items-start lg:grid-cols-2 mt-16 md:mt-5 items-center justify-items-center">
        <div>
          <p className="text-2xl font-bold tracking-tigh sm:text-3xl">
            Tipos de crédito
          </p>
          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {creditFeatures.map(({ name, description }) => (
              <div
                key={name}
                className="border-t border-gray-300 pt-4 flow-finanzas-xd"
              >
                <dt className="font-semibold text-sushi-500">{name}</dt>
                <dd className="mt-2 text-base text-gray-600 dark:text-gray-400">
                  {description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid grid-cols-1 grid-rows-1 sm:grid-cols-2 sm:grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          {creditFeatures.map((feature, index) => (
            <div
              key={index}
              className="w-72 h-72 relative rounded-lg overflow-hidden flow-finanzas-xd"
            >
              <Image
                src={feature.imageSrc}
                alt={feature.name}
                className="absolute inset-0 w-full h-full object-cover transform hover:scale-110 hover:brightness-105 transition-all duration-300 cursor-pointer"
                width={600}
                height={600}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
