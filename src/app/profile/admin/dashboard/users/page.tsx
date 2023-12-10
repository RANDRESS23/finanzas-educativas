import { authOptions } from "@/libs/authOptions";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import TableUsers from "./TableUsers";
import pkg from "@/../package.json";

export default async function UsersPreviewPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.email !== "admin@gmail.com") {
    redirect("/profile/user");
  }

  return (
    <main>
      <div className="pt-6 px-4">
        <div className="w-full grid grid-cols-1 gap-4">
          <div className="shadow dark:shadow-slate-700 rounded-lg p-4 sm:p-6 xl:p-8 ">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Nuestros usuarios registrados
                </h3>
                <span className="text-base font-normal text-gray-500 dark:text-gray-300">
                  Usuarios registrados en {pkg.description}
                </span>
              </div>
              <div className="flex-shrink-0">
                {/* <a
                href="#"
                className="text-sm font-medium text-cyan-600 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg p-2"
              >
                Ver todos
              </a> */}
              </div>
            </div>
            <div className="flex flex-col mt-8">
              <div className="overflow-x-auto rounded-lg">
                <div className="align-middle inline-block min-w-full">
                  <div className="shadow dark:shadow-slate-700 overflow-hidden sm:rounded-lg">
                    <TableUsers />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
