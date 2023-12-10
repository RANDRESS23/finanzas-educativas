"use client";

import pkg from "@/../package.json";
import { useCloseSession } from "@/hooks/useCloseSession";
import footerContactIcons from "@/meta/footerContactIcons";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const { closeSession } = useCloseSession();

  return (
    <footer
      className={clsx(
        "flex flex-col justify-center items-center gap-10 py-10 border-t border-slate-900/10",
        { "lg:ml-64": pathname.includes("/profile/admin") },
      )}
    >
      <div>
        <ul className="grid grid-cols-2 grid-rows-3 gap-5 sm:flex sm:gap-8 text-gray-400">
          <li className="flex justify-center items-center">
            <Link
              className="hover:text-sushi-500 transition-all"
              href={
                status === "authenticated" &&
                session?.user?.document !== "0000000000"
                  ? "/profile/user"
                  : "/"
              }
            >
              Inicio
            </Link>
          </li>
          <li className="flex justify-center items-center">
            <Link
              className="hover:text-sushi-500 transition-all"
              href="/financial-education/first-dimension"
            >
              Educación Financiera
            </Link>
          </li>
          <li className="flex justify-center items-center">
            <Link
              className="hover:text-sushi-500 transition-all"
              href="/contact"
            >
              Contacto
            </Link>
          </li>
          <li className="flex justify-center items-center">
            <Link className="hover:text-sushi-500 transition-all" href="/about">
              Nosotros
            </Link>
          </li>
          {status !== "authenticated" ? (
            <>
              <li className="flex justify-center items-center">
                <Link
                  className="hover:text-sushi-500 transition-all"
                  href="/signup"
                >
                  Registrarse
                </Link>
              </li>
              <li className="flex justify-center items-center">
                <Link
                  className="hover:text-sushi-500 transition-all"
                  href="/signin"
                >
                  Ingresar
                </Link>
              </li>
            </>
          ) : (
            <button
              className="hover:text-sushi-500 transition-all col-span-2"
              onClick={() => closeSession()}
            >
              Cerrar Sesión
            </button>
          )}
        </ul>
      </div>
      <div>
        <ul className="flex justify-center items-center gap-5 sm:gap-12">
          {footerContactIcons.map(({ ReactIcon, href, name }) => (
            <li key={name}>
              <Link href={href} className="flex justify-center items-center">
                <ReactIcon className="text-gray-400 hover:text-boston-blue-600 transition-colors w-6 h-6" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-sm text-gray-400 text-center">
          © {new Date().getFullYear()} {pkg.description}. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
