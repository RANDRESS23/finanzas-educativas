import { LogInIcon } from "@/components/NavBar/icons";
import Pill from "@/components/Pill";
import Title from "@/components/Title";
// import VideoComponent from "@/components/Video";
import { authOptions } from "@/libs/authOptions";
import type { HomeContent } from "@/types/home-content";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LiaSignInAltSolid as SignupIcon } from "react-icons/lia";
import pkg from "@/../package.json";

const getHomeContent = async () => {
  try {
    const homeContent = await fetch(
      `${process.env.NEXTAUTH_URL}/api/admin/home-content`,
    );
    const data = await homeContent.json();

    return data;
  } catch (error) {
    console.error({ error });
  }
};

export default async function Home() {
  const session = await getServerSession(authOptions);
  const {
    welcomeContent,
    knowledgePillsContent,
    // informativeVideosContent,
  }: HomeContent = await getHomeContent();

  if (session !== null && session?.user?.email !== "admin@gmail.com") {
    redirect("profile/user");
  }

  return (
    <>
      <div className="relative isolate px-6 mt-[-5rem] lg:px-8 py-20">
        <div className="flex flex-col items-center justify-center h-screen max-w-2xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="relative px-3 py-1 text-sm leading-6 text-gray-600 rounded-full dark:text-gray-400 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:ring-gray-200/10 dark:hover:ring-gray-200/20">
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
            <h1 className="mb-5 text-4xl font-bold tracking-tight sm:mb-10 sm:text-6xl">
              Bienvenido a <Title text={`¡${pkg.description}!`} isTextStatic />
            </h1>
            <p className="text-lg leading-8 text-gray-600 dark:text-gray-400">
              {welcomeContent.subtitle}
            </p>
            <div className="flex items-center justify-center mt-10 gap-x-6">
              {session !== null &&
              session?.user?.email === "admin@gmail.com" ? (
                <>
                  <button
                    className="rounded-md bg-boston-blue-600 hover:bg-sushi-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-300 flex items-center justify-center gap-x-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled
                  >
                    Registrarse
                    <SignupIcon className="text-xl" />
                  </button>
                  <button
                    className="text-sm font-semibold leading-6 bg-zinc-50 dark:text-slate-900 hover:bg-boston-blue-600 transition-colors duration-300 rounded-md px-3.5 py-2 dark:hover:text-white hover:text-white shadow-md flex items-center justify-center gap-x-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled
                  >
                    Ingresar
                    <LogInIcon />
                  </button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-48">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <blockquote className="mb-10 text-3xl font-semibold leading-8 text-center sm:text-4xl sm:leading-9 flow-finanzas-xd">
            <p>
              Pildoras de <span className="text-sushi-500">Conocimiento</span>
            </p>
            <p className="w-full mx-auto mt-5 text-lg font-normal text-gray-600 dark:text-gray-400 md:w-3/5">
              {knowledgePillsContent.subtitle}
            </p>
          </blockquote>
          <div className="flex flex-wrap items-center justify-center gap-9">
            {knowledgePillsContent.knowledgePills.map(
              ({ title, description }, index) => (
                <Pill key={index} title={title} description={description} />
              ),
            )}
          </div>
        </div>
      </div>

      {/* <div className="pb-24 py-7 sm:pb-32">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <blockquote className="mb-8 text-3xl font-semibold leading-8 text-center sm:text-4xl sm:leading-9">
            <p>
              Videos Informativos{" "}
              <span className="text-sushi-500">Educativos</span>
            </p>
            <p className="w-full mx-auto mt-5 text-lg font-normal text-gray-600 dark:text-gray-400 md:w-3/5">
              {informativeVideosContent.subtitle}
            </p>
          </blockquote>
          <div className="flex flex-wrap items-center justify-center gap-9">
            {informativeVideosContent.informativeVideos.map(({ id, url }) => (
              <VideoComponent videoid={url} key={id} />
            ))}
          </div>
        </div>
      </div> */}
    </>
  );
}
