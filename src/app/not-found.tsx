import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BiHomeAlt2 as HomeIcon } from "react-icons/bi";
import { MdContactSupport as ContactIcon } from "react-icons/md";

export const metadata: Metadata = {
  title: "Finanzas Educativas | Página No Encontrada",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center w-10/12 m-auto">
      <div className="hidden md:flex md:w-2/5 p-8">
        <Image
          width={450}
          height={450}
          src="/gatico2.png"
          alt="Placeholder Image"
          className="rounded-xl"
        />
      </div>
      <div className="w-full md:w-3/5 p-4 md:p-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Página no encontrada!</h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8">
          {"Oops! La página a la que solicitaste no fue encontrada. 🙁"}
        </p>
        <Link
          href="/"
          className="px-4 py-3 mx-2 bg-boston-blue-600 text-white rounded-lg inline-flex items-center hover:bg-sushi-500 transition duration-300 ease-in-out mb-4 gap-x-1"
        >
          <HomeIcon />
          <span className="text-sm">Ir al inicio</span>
        </Link>
        <Link
          href="/contact"
          className="px-4 py-3 mx-2 bg-zinc-50 dark:text-slate-900 rounded-lg inline-flex items-center hover:bg-boston-blue-600 dark:hover:text-white hover:text-white transition duration-300 ease-in-out mb-4 shadow-md"
        >
          <ContactIcon />
          <span className="text-sm">Contáctanos</span>
        </Link>
      </div>
    </div>
  );
}
