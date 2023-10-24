import Image from "next/image";
import { Credit } from "./svgs";

const features = [
  {
    name: "Tarjeta de Crédito",
    description:
      "Una tarjeta de crédito es un tipo de crédito que te permite hacer compras y pagarlas más adelante. Funciona como un préstamo que debes pagar en el futuro. Puedes usarla para comprar cosas en tiendas, restaurantes y en línea.",
  },
  {
    name: "Préstamos Personales",
    description:
      "Los préstamos personales son un tipo de crédito que puedes pedir prestado para cualquier necesidad personal. Puedes usarlo para cosas como pagar el colegio, hacer mejoras en tu hogar o incluso ir de vacaciones. Por lo general, tienes que devolverlo con intereses y en pagos mensuales.",
  },
  {
    name: "Línea de Crédito",
    description:
      "Una línea de crédito es un monto de dinero que te prestan y que puedes gastar según tus necesidades. Es como si tuvieras un límite máximo de dinero al que puedes acceder cuando lo necesites. Solo pagas intereses por el dinero que realmente uses.",
  },
  {
    name: "Hipoteca",
    description:
      "Una hipoteca es un préstamo que obtienes para comprar una casa. Es un crédito a largo plazo, generalmente de varios años, y debes hacer pagos mensuales para devolverlo. Si no pagas, el prestamista puede tomar posesión de la propiedad.",
  },
  {
    name: "Préstamos Estudiantiles",
    description:
      "Son préstamos que se otorgan a estudiantes para ayudarles a pagar los estudios superiores. Los estudiantes pueden pedir dinero prestado para cubrir los costos de la matrícula, libros y otros gastos relacionados con la educación. Los préstamos estudiantiles se deben devolver después de que te gradúes.",
  },
  {
    name: "Microcréditos",
    description:
      "Los microcréditos son préstamos pequeños que se otorgan a personas de bajos recursos económicos o emprendedores que necesitan capital para comenzar o expandir un negocio pequeño. Por lo general, se caracterizan por tener tasas de interés más bajas y plazos de pago flexibles.",
  },
  {
    name: "Financiamiento de automóviles",
    description:
      "Es un tipo de crédito que te permite comprar un automóvil nuevo o usado. El prestamista te presta el dinero y tú pagas una cantidad mensual durante un período acordado hasta saldar la deuda.",
  },
  {
    name: "Tarjetas de Tiendas",
    description:
      "Son tarjetas de crédito que se emiten para usar exclusivamente en una tienda o cadena de tiendas específica. Puedes comprar productos en esa tienda y pagar más adelante. A menudo ofrecen descuentos y beneficios especiales para los clientes.",
  },
];

export default function CreditSection() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl items-center gap-x-8 gap-y-16 px-4 py-20 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-4xl font-semibold leading-7 text-[#79ad34] mb-8 ">
          Crédito
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 lg:w-full">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              ¿Qué es un crédito?
            </h2>
            <p className="mt-6 text-lg text-left leading-8 text-gray-600">
              El crédito es un préstamo de dinero que una persona o entidad le
              otorga a otra, con el compromiso de que, en el futuro, quien lo
              recibe devolverá dicho préstamo en forma gradual (mediante el pago
              de cuotas) o en un solo pago y con un interés adicional que
              compensa a quien presta, por todo el tiempo que no tuvo ese
              dinero.
            </p>
          </div>
          <div className="hidden md:block">
            <Credit />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-10 place-items-start lg:grid-cols-2 mt-16 md:mt-5">
          <div>
            <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Tipos de crédito
            </p>
            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
              {features.map(({ name, description }) => (
                <div key={name} className="border-t border-gray-300 pt-4">
                  <dt className="font-semibold text-[#79ad34]">{name}</dt>
                  <dd className="mt-2 text-base text-gray-600">
                    {description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
            <Image
              src="https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
              className="rounded-lg bg-gray-100 hover:opacity-80 transition-opacity cursor-pointer"
              width={600}
              height={400}
            />
            <Image
              src="https://images.pexels.com/photos/2988232/pexels-photo-2988232.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Top down view of walnut card tray with embedded magnets and card groove."
              className="rounded-lg bg-gray-100 hover:opacity-80 transition-opacity cursor-pointer"
              width={600}
              height={400}
            />
            <Image
              src="https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Walnut card tray filled with cards and card angled in dedicated groove."
              className="rounded-lg bg-gray-100 hover:opacity-80 transition-opacity cursor-pointer"
              width={600}
              height={400}
            />
            <Image
              src="https://images.pexels.com/photos/210679/pexels-photo-210679.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Walnut card tray filled with cards and card angled in dedicated groove."
              className="rounded-lg bg-gray-100 hover:opacity-80 transition-opacity cursor-pointer"
              width={600}
              height={400}
            />
            <Image
              src="https://images.pexels.com/photos/366551/pexels-photo-366551.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Walnut card tray filled with cards and card angled in dedicated groove."
              className="rounded-lg bg-gray-100 hover:opacity-80 transition-opacity cursor-pointer"
              width={600}
              height={400}
            />
            <Image
              src="https://images.pexels.com/photos/164501/pexels-photo-164501.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Walnut card tray filled with cards and card angled in dedicated groove."
              className="rounded-lg bg-gray-100 hover:opacity-80 transition-opacity cursor-pointer"
              width={600}
              height={400}
            />
            <Image
              src="https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Side of walnut card tray with card groove and recessed card area."
              className="rounded-lg bg-gray-100 hover:opacity-80 transition-opacity cursor-pointer"
              width={600}
              height={400}
            />
            <Image
              src="https://images.pexels.com/photos/1602726/pexels-photo-1602726.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Walnut card tray filled with cards and card angled in dedicated groove."
              className="rounded-lg bg-gray-100 hover:opacity-80 transition-opacity cursor-pointer"
              width={600}
              height={400}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
