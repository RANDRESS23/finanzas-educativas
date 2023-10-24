import Title from "@/components/Title";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { redirect } from "next/navigation";
// import ContactBot from './contact/ContactBot'

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
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Aprender un poco sobre finanzas.{" "}
              <Link
                href="/financial-education"
                className="font-semibold text-[#008aae]"
              >
                <span className="absolute inset-0" aria-hidden="true" />
                Leer más <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <div className="text-center">
            <h1 className="mb-5 sm:mb-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Bienvenido a <Title text="¡Finanzas Educativas!" isTextStatic />
            </h1>
            <p className="text-lg leading-8 text-gray-600">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
              fugiat aliqua.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/signup"
                className="rounded-md bg-[#008aae] hover:bg-[#79ad34] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-300"
              >
                Registrarse
              </Link>
              <Link
                href="/signin"
                className="text-sm font-semibold leading-6 text-gray-900 hover:bg-[#008aae] transition-colors duration-300 rounded-md px-3.5 py-2 hover:text-white shadow-md"
              >
                Ingresar <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-7 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9 mb-5">
            <p>Consejos Financieros...</p>
          </blockquote>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            <div
              role="status"
              className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-200"
            >
              <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-300">
                <svg
                  className="w-10 h-10 text-gray-200 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                </svg>
              </div>
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-48 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300"></div>
            </div>

            <div
              role="status"
              className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-200"
            >
              <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-300">
                <svg
                  className="w-10 h-10 text-gray-200 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                </svg>
              </div>
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-48 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300"></div>
            </div>

            <div
              role="status"
              className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-200"
            >
              <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-300">
                <svg
                  className="w-10 h-10 text-gray-200 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                </svg>
              </div>
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-48 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300"></div>
            </div>
          </dl>
        </div>
      </div>

      <div className="bg-white py-7 pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9 mb-5">
            <p>Videos...</p>
          </blockquote>
          <dl className="flex text-center items-center justify-between">
            <div
              role="status"
              className="flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-300 w-11/12"
            >
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-200"
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
              className="flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-300 w-11/12"
            >
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-200"
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
              className="flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-300 w-11/12"
            >
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-200"
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

        {/* <ContactBot /> */}
      </div>
    </>
  );
}
