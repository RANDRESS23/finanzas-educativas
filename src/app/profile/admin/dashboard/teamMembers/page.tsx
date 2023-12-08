import { addMember } from "@/actions/teamMembers/add";
import Input from "@/components/Input";
import InputSelect from "@/components/InputSelect";
import { authOptions } from "@/libs/authOptions";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { IoMdAddCircleOutline as AddIcon } from "react-icons/io";

export default async function TeamMembersPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.email !== "admin@gmail.com") {
    redirect("/profile/user");
  }

  return (
    <div className="flex overflow-hidden">
      <div
        id="main-content"
        className="h-full w-full bg-gray-50 dark:bg-slate-800/20 py-20 relative overflow-y-auto lg:ml-64"
      >
        <main>
          <div className="pt-6 px-4">
            <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
              <div className="shadow dark:shadow-slate-700 mb-4 p-4 sm:p-6 h-full">
                <h3 className="text-xl leading-none font-bold mb-10">
                  Agregar Miembro Equipo
                </h3>
                <form action={addMember}>
                  <div className="mb-4">
                    <Input
                      inputProps={{
                        id: "cc",
                        name: "cc",
                        type: "text",
                        placeholder: "0000000000",
                        required: true,
                      }}
                      label="Cédula de Ciudadanía"
                    />
                  </div>

                  <div className="mb-4">
                    <Input
                      inputProps={{
                        id: "fullName",
                        name: "fullName",
                        type: "text",
                        placeholder: "John Doe",
                        autoComplete: "off",
                        required: true,
                      }}
                      label="Nombre Completo"
                    />
                  </div>

                  <div className="mb-4">
                    <InputSelect
                      selectProps={{
                        id: "teamRole",
                        name: "teamRole",
                        placeholder: "Seleccione un rol",
                        autoComplete: "off",
                        required: true,
                      }}
                      label="Rol Equipo"
                      options={[
                        {
                          value: "",
                          label: "Seleccione",
                        },
                        {
                          value: "Equipo de Desarrollo",
                          label: "Equipo de Desarrollo",
                        },
                        {
                          value: "Equipo de Diseño",
                          label: "Equipo de Diseño",
                        },
                        {
                          value: "Equipo de Contenido",
                          label: "Equipo de Contenido",
                        },
                      ]}
                    />
                  </div>

                  <button
                    type="submit"
                    className="rounded-md px-10 py-2 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 duration-300 bg-boston-blue-600 hover:bg-sushi-500 disabled:opacity-50 w-full flex items-center justify-center gap-x-1 disabled:cursor-not-allowed enabled:active:bg-sushi-400"
                  >
                    <AddIcon /> Agregar Miembro
                  </button>
                </form>
                <div className="block w-full overflow-x-auto"></div>
              </div>

              <div className="shadow dark:shadow-slate-700 mb-4 p-4 sm:p-6 h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold leading-none">
                    Miembros de Finanzas Educativas
                  </h3>
                </div>
                <div className="flow-root">
                  <ul role="list" className="divide-y divide-gray-200">
                    {Array.from({ length: 3 }, (_, i) => (
                      <li key={i} className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <Image
                              width={32}
                              height={32}
                              className="h-8 w-8 rounded-full"
                              src="https://demo.themesberg.com/windster/images/users/neil-sims.png"
                              alt="Neil image"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
                              Neil Sims
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              <a
                                href="/cdn-cgi/l/email-protection"
                                className="__cf_email__"
                                data-cfemail="17727a767e7b57607e7973646372653974787a"
                              >
                                [email&#160;protected]
                              </a>
                            </p>
                          </div>
                          <div className="inline-flex items-center text-base font-semibold text-gray-600 dark:text-gray-400">
                            $320
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
