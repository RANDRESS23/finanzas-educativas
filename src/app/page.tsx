import { LogInIcon } from "@/components/NavBar/icons";
import Pill from "@/components/Pill";
import Title from "@/components/Title";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LiaSignInAltSolid as SignupIcon } from "react-icons/lia";
import KNOWLEDGE_PILLS from "@/meta/knownledgePills";

export default async function Home() {
  const session = await getServerSession();

  if (session !== null && session?.user?.email !== "admin@gmail.com") {
    return redirect("profile/user");
  } else if (session !== null && session?.user?.email === "admin@gmail.com") {
    return redirect("profile/admin/home-preview");
  }

  return (
    <>
      <div className="relative isolate px-6 mt-[-5rem] lg:px-8 py-20">
        <div className="mx-auto max-w-2xl h-screen flex flex-col justify-center items-center">
          <div className="flex mb-8 justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 dark:text-gray-400 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:ring-gray-200/10 dark:hover:ring-gray-200/20">
              Aprender un poco sobre finanzas.{" "}
              <Link
                href="/financial-education/first-dimension"
                className="font-semibold text-boston-blue-600"
              >
                Leer más <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <div className="text-center">
            <h1 className="mb-5 sm:mb-10 text-4xl font-bold tracking-tight sm:text-6xl">
              Bienvenido a <Title text="¡Finanzas Educativas!" isTextStatic />
            </h1>
            <p className="text-lg leading-8 text-gray-600 dark:text-gray-400">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
              fugiat aliqua.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/signup"
                className="rounded-md bg-boston-blue-600 hover:bg-sushi-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-300 flex items-center justify-center gap-x-1"
              >
                Registrarse
                <SignupIcon className="text-xl" />
              </Link>
              <Link
                href="/signin"
                className="text-sm font-semibold leading-6 bg-zinc-50 dark:text-slate-900 hover:bg-boston-blue-600 transition-colors duration-300 rounded-md px-3.5 py-2 dark:hover:text-white hover:text-white shadow-md flex items-center justify-center gap-x-1"
              >
                Ingresar
                <LogInIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <blockquote className="text-center text-xl font-semibold leading-8 text-sushi-500 sm:text-3xl sm:leading-9 mb-10">
            <p>Pildoras de Conocimiento</p>
          </blockquote>
          <div className="flex justify-center items-center gap-9 flex-wrap">
            {KNOWLEDGE_PILLS.map(({ title, description }, index) => (
              <Pill key={index} title={title} description={description} />
            ))}
          </div>
        </div>
      </div>

      <div className="py-7 pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <blockquote className="text-center text-xl font-semibold leading-8 text-sushi-500 sm:text-2xl sm:leading-9 mb-5">
            <p>Videos Interactivos</p>
          </blockquote>
          <dl className="flex text-center items-center justify-between">
            <div
              role="status"
              className="flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700 w-11/12"
            >
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 20"
              >
                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
            <div
              role="status"
              className="flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700 w-11/12"
            >
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 20"
              >
                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
            <div
              role="status"
              className="flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700 w-11/12"
            >
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 20"
              >
                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
}
