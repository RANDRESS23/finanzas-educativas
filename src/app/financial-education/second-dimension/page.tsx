import { type Metadata } from "next";
import goodDecisions from "@/meta/goodDecisions";

export const metadata: Metadata = {
  title: "Finanzas Educativas | Educación Financiera",
};

export default function SecondDimension() {
  return (
    <div className="py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <blockquote className="text-center text-3xl font-semibold leading-8 sm:text-4xl sm:leading-9 mb-10">
          <p>
            Una <span className="text-sushi-500">Buena Toma</span> de Decisión
          </p>
          <p className="text-lg font-normal mt-5 text-gray-600 dark:text-gray-400 lg:w-3/4 lg:mx-auto">
            Una buena toma de decisiones implica el proceso de evaluar
            cuidadosamente las opciones disponibles, considerando información
            relevante y perspectivas diversas, para elegir la acción más
            apropiada o la solución más acertada en un contexto particular.{" "}
            <br />
            <br />
            Este proceso debe ser informado, reflexivo y basado en objetivos
            claros, valores personales o corporativos, y considerando las
            posibles consecuencias a corto y largo plazo. Además, una toma de
            decisiones efectivas a menudo involucra la capacidad de adaptarse a
            situaciones cambiantes y aprender de experiencias anteriores para
            mejorar las elecciones futuras. La toma de decisiones es una
            habilidad fundamental en la vida personal y profesional, y su
            calidad puede tener un impacto significativo en los resultados.
          </p>
        </blockquote>
        <blockquote className="text-center text-2xl font-semibold leading-8 sm:text-3xl sm:leading-9 mb-10 mt-20">
          <p>
            Como se puede tomar una{" "}
            <span className="text-sushi-500">Buena Toma</span> de Decisiones
          </p>
          <p className="text-lg font-normal mt-5 text-gray-600 dark:text-gray-400 lg:w-3/4 lg:mx-auto">
            Para tomar una buena decisión implica hacer un proceso reflexivo y
            cuidadoso siguiendo unos pasos claves los cuales son:
          </p>
        </blockquote>
        <div className="mx-auto mt-12 max-w-2xl sm:mt-14 lg:mt-16 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {goodDecisions.map(({ name, description, Icon }) => (
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
        <blockquote className="text-center text-2xl font-semibold leading-8 sm:text-3xl sm:leading-9 mb-10 mt-20">
          <p>
            ¿Que hay que tener en cuenta para tomar una{" "}
            <span className="text-sushi-500">Buena Decisión</span>?{" "}
          </p>
          <p className="text-lg font-normal mt-5 text-gray-600 dark:text-gray-400 lg:w-3/4 lg:mx-auto">
            Tomar una buena decisión implica considerar varios factores clave,
            Antes de tomar una decisión, asegúrese de entender completamente el
            problema o la situación que está abordando. La claridad en la
            definición del problema es esencial para tomar decisiones
            informadas. <br />
            <br />
            Evalúa cómo cada opción se alinea con tus objetivos personales o los
            objetivos de tu organización. Las decisiones deben estar en armonía
            con lo que estás tratando de lograr. Recopila toda la información
            necesaria antes de tomar una decisión. Cuanta más información
            tengas, más fundamentada será tu elección. Piensa en cómo cada
            opción puede afectar no solo el presente, sino también el futuro.
            Visualizar las consecuencias a largo plazo te ayuda a tomar
            decisiones más estratégicas. <br />
            <br />
            Sé consciente de la posibilidad de cambios en el entorno o en las
            circunstancias. La capacidad de adaptarse y ajustar tu decisión
            según sea necesario es esencial. <br />
            <br />
            Recuerda que no hay una fórmula única para tomar decisiones, y el
            proceso puede variar según la situación. La combinación de estas
            consideraciones te ayudará a tomar decisiones más sólidas y
            alineadas con tus objetivos y valores.
          </p>
        </blockquote>
      </div>
    </div>
  );
}
