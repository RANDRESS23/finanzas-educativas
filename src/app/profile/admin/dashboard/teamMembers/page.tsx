import pkg from "@/../package.json";
import { authOptions } from "@/libs/authOptions";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import FormCreateMemberTeam from "./FormCreateMemberTeam";
import MembersList from "./MembersList";

export const dynamic = "force-dynamic";

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
                <div className="block w-full overflow-x-auto">
                  <FormCreateMemberTeam />
                </div>
              </div>

              <div className="shadow dark:shadow-slate-700 mb-4 p-4 sm:p-6 h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold leading-none">
                    Miembros de {pkg.description}
                  </h3>
                </div>
                <div className="flow-root">
                  <MembersList />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
