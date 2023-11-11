import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/libs/prismaDB";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Meta from "./Meta";

export const dynamic = "force-dynamic";

export default async function PageContent() {
  const session = await getServerSession(authOptions);

  if (session?.user?.email !== "admin@gmail.com") {
    return redirect("/profile/user");
  }

  const [{ id, mision, vision, whoami }] = await db.meta.findMany();

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
                <Meta metaInfo={{ id, mision, vision, whoami }} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
