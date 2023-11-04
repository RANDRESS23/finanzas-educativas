import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import Title from "@/components/Title";
import { AdminIcon } from "@/components/NavBar/icons";

export default async function ProfileAdminPage() {
  const session = await getServerSession();

  if (session?.user?.email !== "admin@gmail.com") {
    return redirect("/profile/user");
  }

  return (
    <div className="mb-20">
      <div className="relative isolate px-6 pb-20 lg:py-0 lg:pl-36 lg:flex lg:justify-between lg:gap-10 lg:h-screen">
        <div className="max-w-xl h-screen lg:h-full flex flex-col justify-center items-start">
          <div className="flex mb-8 justify-center">
            <div className="relative rounded-full px-5 py-1 text-sm leading-6 text-gray-600 dark:text-gray-400 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:ring-zinc-200/10 dark:hover:ring-gray-200/20">
              Completar mi información personal.{" "}
              <Link
                href="/financial-education"
                className="font-semibold text-boston-blue-600"
              >
                <span className="absolute inset-0" aria-hidden="true" />
                Completar Perfil <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <div className="relative">
            <h1 className="mb-5 sm:mb-10 text-4xl font-bold tracking-tight sm:text-6xl">
              Bienvenido a{" "}
              <span className="text-sushi-500">¡Finanzas Educativas!</span>{" "}
              <Title text="¡Finanzas Educativas!" isTextStatic={false} />
            </h1>
            <p className="text-lg leading-8 text-gray-600 text-left">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
              fugiat aliqua.
            </p>
            <div className="mt-10 flex items-center justify-start gap-x-6">
              <Link
                href="/profile/admin/dashboard"
                className="rounded-md bg-boston-blue-600 hover:bg-sushi-500 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-300 flex items-center justify-center gap-x-2"
              >
                IR AL PANEL DE ADMINISTRADOR
                <AdminIcon />
              </Link>
            </div>
          </div>
        </div>
        <div className="relative">
          <Image
            width={500}
            height={400}
            src="https://images.pexels.com/photos/4195342/pexels-photo-4195342.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            className="object-cover lg:h-full w-[180%] h-auto aspect-square rounded-xl hover:opacity-90 transition-opacity"
          />
        </div>
      </div>
    </div>
  );
}
