import { getServerSession } from "next-auth/next";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function HomePreviewPage() {
  const session = await getServerSession();

  if (session?.user?.email !== "admin@gmail.com") {
    return redirect("/profile/user");
  }

  return (
    <section className="top-0 left-0 w-screen h-screen flex items-center justify-center">
      <div className="container mx-auto">
        <div className="grid place-items-center">
          <div className="w-1/2">
            <div className="bg-slate-50 dark:bg-slate-800 border dark:border-zinc-600 rounded-xl shadow-md dark:shadow-slate-800">
              <div className="text-center p-10">
                <div className="w-32 h-32 rounded-full overflow-hidden border border-slate-300 dark:border-slate-500 shadow shadow-slate-950/40">
                  <Image
                    src="https://reqres.in/img/faces/4-image.jpg"
                    width={120}
                    height={120}
                    alt="user avatar"
                    className="object-cover w-full h-full transform hover:scale-105 transition-all duration-300 cursor-pointer brightness-100 dark:brightness-105"
                  />
                </div>
              </div>
              <div className="text-center p-4">
                <h3 className="text-xl font-bold">
                  {session.user.email === "admin@gmail.com"
                    ? "Administrador"
                    : "Usuario"}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Email: {session.user.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
