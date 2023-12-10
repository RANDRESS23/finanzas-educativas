import LIST_OF_FINANCE_MANAGEMENT from "@/meta/financeManagement";
import Image from "next/image";
import Link from "next/link";
import { GiReceiveMoney } from "react-icons/gi";

export default function ThirdDimension() {
  return (
    <div className="py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <blockquote className="text-center text-3xl font-semibold leading-8 sm:text-4xl sm:leading-9 mb-10">
          <p>
            Manejo de <span className="text-sushi-500">Finanzas</span>{" "}
            Adecuadamente
          </p>
          <p className="text-lg font-normal mt-5 text-gray-600 dark:text-gray-400">
            Para reducir el margen de endeudamiento en nuestra finanza se
            recomienda implementar las siguientes estrategias:
          </p>
        </blockquote>
        <div className="flex justify-center items-center gap-y-9 gap-x-20 flex-wrap">
          {LIST_OF_FINANCE_MANAGEMENT.map(
            ({ title, description, url }, index) => (
              <div
                key={index}
                className="relative flex w-[400px] flex-col rounded-xl bg-white dark:bg-slate-950/40 bg-clip-border text-gray-700 shadow-2xl shadow-slate-500/20 dark:shadow-slate-950/60 hover:bg-slate-100 dark:hover:bg-slate-900 hover:ring-1 hover:ring-gray-200/40 dark:hover:ring-slate-700/20 transition-colors duration-300 flow-finanzas-xd"
              >
                <div className="px-6 pt-6 pb-3">
                  <div
                    key={index}
                    className="w-full h-56 relative rounded-xl overflow-hidden mb-4"
                  >
                    <Image
                      src={url}
                      alt=""
                      width={600}
                      height={400}
                      className="w-full h-56 rounded-xl mb-3 object-cover object-center transform hover:scale-110 hover:brightness-105 transition-all duration-300 cursor-pointer"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <h5 className="w-4/5 text-xl font-semibold leading-snug tracking-normal text-sushi-500">
                      {title}
                    </h5>
                    <GiReceiveMoney className="text-4xl text-boston-blue-600" />
                  </div>
                  <p className="block pr-3 max-h-40 overflow-y-auto text-base font-light dark:text-gray-400 leading-relaxed mt-3">
                    {description}
                  </p>
                </div>
                <div className="p-6 pt-0">
                  <Link
                    className="font-medium text-blue-gray-900 transition-colors hover:text-boston-blue-600"
                    href="/signin"
                  >
                    <button
                      className="w-full flex justify-center select-none items-center gap-2 rounded-lg py-1 text-center align-middle font-sans text-xs font-bold uppercase text-boston-blue-600 transition-all hover:bg-boston-blue-600/10 enabled:active:bg-boston-blue-600/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button"
                      data-ripple-dark="true"
                    >
                      Aprender más
                      <span className="text-2xl mb-1" aria-hidden="true">
                        →
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
