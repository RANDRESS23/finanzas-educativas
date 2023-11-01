import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Meta from "./Meta";

export const revalidate = 60;

export default async function PageContent() {
  const session = await getServerSession();

  if (session?.user?.email !== "admin@gmail.com") {
    return redirect("/profile/user");
  }

  return (
    <div>
      <div className="flex overflow-hidden bg-white">
        <div
          id="main-content"
          className="h-full w-full bg-gray-50 py-20 relative overflow-y-auto lg:ml-64"
        >
          <main>
            <div className="pt-6 px-4">
              <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <Meta />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
