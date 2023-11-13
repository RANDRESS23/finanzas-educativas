import { authOptions } from "@/libs/authOptions"; 
import { db } from "@/libs/prismaDB";
import { getServerSession } from "next-auth/next";
import { notFound, redirect } from "next/navigation";
import Meta from "./Meta";

export const dynamic = "force-dynamic";

export default async function PageContent() {
  const session = await getServerSession(authOptions);

  if (session?.user?.email !== "admin@gmail.com") {
    redirect("/profile/user");
  }

  const [metaInfo] = await db.meta.findMany();

  if (!metaInfo) {
    notFound();
  }

  const { id, whoami, mision, vision } = metaInfo;

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
