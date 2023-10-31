"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaFacebook as FaceIcon,
  FaInstagramSquare as InstaIcon,
  FaTwitter as TweetIcon,
  FaYoutube as YtIcon,
} from "react-icons/fa";

export default function Footer(): React.ReactNode {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const handleCloseSession = (): void => {
    signOut();
  };

  return (
    <footer
      className={`flex flex-col justify-center items-center gap-10 py-10 border-t border-[#0f172a1a] ${
        pathname.includes("/profile/admin") && "lg:ml-64"
      }`}
    >
      <div>
        <ul className="grid grid-cols-2 grid-rows-3 gap-5 sm:flex sm:gap-8 text-gray-400">
          <li className="flex justify-center items-center">
            <Link
              className="hover:text-[#79ad34] transition-all"
              href={
                status === "authenticated" &&
                session?.user?.document !== "0000000000"
                  ? "/profile/user"
                  : status === "authenticated" &&
                    session?.user?.document === "0000000000"
                  ? "/profile/admin/home-preview"
                  : "/"
              }
            >
              Inicio
            </Link>
          </li>
          <li className="flex justify-center items-center">
            <Link
              className="hover:text-[#79ad34] transition-all"
              href="/financial-education"
            >
              Educación Financiera
            </Link>
          </li>
          <li className="flex justify-center items-center">
            <Link
              className="hover:text-[#79ad34] transition-all"
              href="/contact"
            >
              Contacto
            </Link>
          </li>
          <li className="flex justify-center items-center">
            <Link className="hover:text-[#79ad34] transition-all" href="/about">
              Nosotros
            </Link>
          </li>
          {status !== "authenticated" ? (
            <>
              <li className="flex justify-center items-center">
                <Link
                  className="hover:text-[#79ad34] transition-all"
                  href="/signup"
                >
                  Registrarse
                </Link>
              </li>
              <li className="flex justify-center items-center">
                <Link
                  className="hover:text-[#79ad34] transition-all"
                  href="/signin"
                >
                  Ingresar
                </Link>
              </li>
            </>
          ) : (
            <button
              className="hover:text-[#79ad34] transition-all col-span-2"
              onClick={handleCloseSession}
            >
              Cerrar Sesión
            </button>
          )}
        </ul>
      </div>
      <div>
        <ul className="flex justify-center items-center gap-5 sm:gap-12">
          <li>
            <Link href="#" className="flex justify-center items-center">
              <FaceIcon className="text-gray-400 hover:text-[#008aae] transition-colors w-6 h-6" />
            </Link>
          </li>
          <li>
            <Link href="#" className="flex justify-center items-center">
              <InstaIcon className="text-gray-400 hover:text-[#008aae] transition-colors w-6 h-6" />
            </Link>
          </li>
          <li>
            <Link href="#" className="flex justify-center items-center">
              <TweetIcon className="text-gray-400 hover:text-[#008aae] transition-colors w-6 h-6" />
            </Link>
          </li>
          <li>
            <Link href="#" className="flex justify-center items-center">
              <YtIcon className="text-gray-400 hover:text-[#008aae] transition-colors w-7 h-6" />
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Finanzas Educativas. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
