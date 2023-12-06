import Pie from "@/components/Statistics/Chart/Pie";
import CounterUserIntruments from "@/components/Statistics/Counter/CounterUserIntruments";
import { authOptions } from "@/libs/authOptions";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.email !== "admin@gmail.com") {
    redirect("/profile/user");
  }

  return (
    <div>
      <div className="flex overflow-hidden">
        <div
          id="main-content"
          className="h-full w-full bg-gray-50 dark:bg-slate-800/20 py-20 relative overflow-y-auto lg:ml-64"
        >
          <main>
            <div className="pt-6 px-4">
              <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <CounterUserIntruments
                  instrument="Encuesta caracterización"
                  statistic="/characterization/counts"
                />
                <CounterUserIntruments
                  instrument="Encuesta pre-test"
                  statistic="/pre-test/counts"
                />
                <CounterUserIntruments
                  instrument="Encuesta post-test"
                  statistic="/post-test/counts"
                />
              </div>

              <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
                <div className="shadow dark:shadow-slate-700 mb-4 p-4 sm:p-6 h-full">
                  <Pie
                    title={{
                      text: "Género",
                      subtext: "Estadísticas Género > Caracterización",
                    }}
                    statistic="/characterization/gender"
                  />
                </div>
                <div className="shadow dark:shadow-slate-700 mb-4 p-4 sm:p-6 h-full">
                  <Pie
                    title={{
                      text: "Edad",
                      subtext: "Estadísticas Edad > Caracterización",
                    }}
                    statistic="/characterization/age"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
                <div className="shadow dark:shadow-slate-700 mb-4 p-4 sm:p-6 h-full">
                  <Pie
                    title={{
                      text: "Estado Civíl",
                      subtext: "Estadísticas Estado Civíl > Caracterización",
                    }}
                    statistic="/characterization/civilStatus"
                  />
                </div>
                <div className="shadow dark:shadow-slate-700 mb-4 p-4 sm:p-6 h-full">
                  <Pie
                    title={{
                      text: "Nivel de Educación",
                      subtext: "Estadísticas Nivel Educación > Caracterización",
                    }}
                    statistic="/characterization/educationLevel"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
                <div className="shadow dark:shadow-slate-700 mb-4 p-4 sm:p-6 h-full">
                  <Pie
                    title={{
                      text: "Productos Financieros",
                      subtext:
                        "Estadísticas Productos Financieros > Caracterización",
                    }}
                    statistic="/characterization/financialProducts"
                  />
                </div>
                <div className="shadow dark:shadow-slate-700 mb-4 p-4 sm:p-6 h-full">
                  <Pie
                    title={{
                      text: "Sistema de Salud",
                      subtext:
                        "Estadísticas del nivel de educación del instrumento de caracterización",
                    }}
                    statistic="/characterization/healthSystemAffiliation"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
                <div className="shadow dark:shadow-slate-700 mb-4 p-4 sm:p-6 h-full">
                  <Pie
                    title={{
                      text: "Servicios Hogar",
                      subtext:
                        "Estadísticas del estado civíl del instrumento de caracterización",
                    }}
                    statistic="/characterization/houseServices"
                  />
                </div>
                <div className="shadow dark:shadow-slate-700 mb-4 p-4 sm:p-6 h-full">
                  <Pie
                    title={{
                      text: "Provención de Ingresos",
                      subtext:
                        "Estadísticas del nivel de educación del instrumento de caracterización",
                    }}
                    statistic="/characterization/incomeComeFrom"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
                <div className="shadow dark:shadow-slate-700 mb-4 p-4 sm:p-6 h-full">
                  <Pie
                    title={{
                      text: "Afiliación Fondo Pensiones",
                      subtext:
                        "Estadísticas del estado civíl del instrumento de caracterización",
                    }}
                    statistic="/characterization/isInAPensionFund"
                  />
                </div>
                <div className="shadow dark:shadow-slate-700 mb-4 p-4 sm:p-6 h-full">
                  <Pie
                    title={{
                      text: "# Personas Aportan al Hogar",
                      subtext:
                        "Estadísticas del nivel de educación del instrumento de caracterización",
                    }}
                    statistic="/characterization/numberPeopleContributing"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
                <div className="shadow dark:shadow-slate-700 mb-4 p-4 sm:p-6 h-full">
                  <Pie
                    title={{
                      text: "# Personas Dependen Economicamente Usuario",
                      subtext:
                        "Estadísticas del estado civíl del instrumento de caracterización",
                    }}
                    statistic="/characterization/numberPeopleDependFinancially"
                  />
                </div>
                <div className="shadow dark:shadow-slate-700 mb-4 p-4 sm:p-6 h-full">
                  <Pie
                    title={{
                      text: "Zona donde Viven",
                      subtext:
                        "Estadísticas del nivel de educación del instrumento de caracterización",
                    }}
                    statistic="/characterization/residenceArea"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
                <div className="shadow dark:shadow-slate-700 mb-4 p-4 sm:p-6 h-full">
                  <Pie
                    title={{
                      text: "Nivel SocioEconómico (Estrato)",
                      subtext:
                        "Estadísticas del estado civíl del instrumento de caracterización",
                    }}
                    statistic="/characterization/socioeconomicLevel"
                  />
                </div>
                <div className="shadow dark:shadow-slate-700 mb-4 p-4 sm:p-6 h-full">
                  <Pie
                    title={{
                      text: "Tipo Vivienda",
                      subtext:
                        "Estadísticas del nivel de educación del instrumento de caracterización",
                    }}
                    statistic="/characterization/typeOfHousing"
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
