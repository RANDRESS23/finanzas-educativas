"use client";

import Toggler from "@/components/Theme/Toggler";
import clsx from "clsx";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  BiBookReader as EducationIcon,
  BiHomeAlt2 as HomeIcon,
} from "react-icons/bi";
import { LiaSignInAltSolid as SignupIcon } from "react-icons/lia";
import { MdContactSupport as ContactIcon } from "react-icons/md";
import { RiTeamFill as UsIcon } from "react-icons/ri";
import ItemListDropDown from "./ItemListDropDown";
import MobileMenu from "./MobileMenu";
import {
  AdminIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  LogInIcon,
  MenuIcon,
  MisionIcon,
  QuestionIcon,
  TeamIcon,
  UserIcon,
  VisionIcon,
} from "./icons";

function NavBar(): React.ReactNode {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuMobileOpen, setIsMenuMobileOpen] = useState(false);
  const [isSubMenuAdminPanelOpen, setIsSubMenuAdminPanelOpen] = useState(false);
  const [isSubMenuMobileOpen, setIsSubMenuMobileOpen] = useState(false);
  const { data: session, status } = useSession();

  const handleMenuOpen = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuMobileOpen = (): void => {
    setIsMenuMobileOpen(!isMenuMobileOpen);
  };

  const handleSubMenuMobileOpen = (): void => {
    setIsSubMenuMobileOpen(!isSubMenuMobileOpen);
  };

  const handleSubMenuAdminPanelOpen = (): void => {
    setIsSubMenuAdminPanelOpen(!isSubMenuAdminPanelOpen);
  };

  const handleResetMenus = (): void => {
    setIsMenuOpen(false);
    setIsMenuMobileOpen(false);
    setIsSubMenuMobileOpen(false);
    setIsSubMenuAdminPanelOpen(false);
  };

  const handleCloseSession = (): void => {
    signOut();
  };

  return (
    <header
      className={clsx(
        "fixed top-0 z-40 border-b border-slate-950/10 w-full flex-none transition-colors duration-500 dark:border-slate-50/[0.06] bg-white/95 dark:bg-slate-900 lg:z-50",
        {
          "backdrop-blur supports-backdrop-blur:bg-white/60 dark:bg-transparent":
            !isMenuMobileOpen,
        }
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <div className="flex lg:flex-1">
          <Link
            href={
              status === "authenticated" &&
              session?.user?.document !== "0000000000"
                ? "/profile/user"
                : status === "authenticated" &&
                  session?.user?.document === "0000000000"
                ? "/profile/admin"
                : "/"
            }
            className="-m-1.5 p-1.5"
            onClick={handleResetMenus}
          >
            <Image
              width={32}
              height={32}
              className="w-8 h-8"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              priority
              alt=""
            />
          </Link>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link
            href={
              status === "authenticated" &&
              session?.user?.document !== "0000000000"
                ? "/profile/user"
                : status === "authenticated" &&
                  session?.user?.document === "0000000000"
                ? "/profile/admin/home-preview"
                : "/"
            }
            className="text-base font-bold leading-6 text-gray-900 dark:text-zinc-50 hover:text-sushi-500 dark:hover:text-sushi-500 flex items-center gap-x-1 justify-center"
            onClick={handleResetMenus}
          >
            <HomeIcon className="text-xl" />
            Inicio
          </Link>
          <Link
            href="/financial-education"
            className="text-base font-bold leading-6 text-gray-900 dark:text-zinc-50 hover:text-sushi-500 dark:hover:text-sushi-500 flex items-center justify-center gap-x-1"
            onClick={handleResetMenus}
          >
            <EducationIcon className="text-xl" />
            Educación Financiera
          </Link>
          <Link
            href="/contact"
            className="text-base font-bold leading-6 text-gray-900 dark:text-zinc-50 hover:text-sushi-500 dark:hover:text-sushi-500 flex items-center justify-center gap-x-1"
            onClick={handleResetMenus}
          >
            <ContactIcon className="text-xl" />
            Contacto
          </Link>

          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-x-1 text-base font-bold leading-6 text-gray-900 dark:text-zinc-50 hover:text-sushi-500 dark:hover:text-sushi-500"
              aria-expanded="false"
              onClick={handleMenuOpen}
            >
              <UsIcon className="text-xl" />
              Nosotros
              {isMenuOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
            </button>

            <div
              className={clsx({
                "transition ease-out duration-200 opacity-100 translate-y-0":
                  isMenuOpen,
                "transition translate-y-1": !isMenuOpen,
              })}
            >
              {isMenuOpen && (
                <div className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white dark:bg-slate-800 shadow-lg ring-1 ring-gray-900/5">
                  <div className="p-4">
                    <ItemListDropDown
                      title="¿Quienes somos?"
                      description="Lorem ipsum dolor sit amet consectetur."
                      Icon={QuestionIcon}
                      idSection="quienesSomos"
                      handleResetMenus={handleResetMenus}
                    />
                    <ItemListDropDown
                      title="Misión"
                      description="Lorem ipsum dolor sit amet consectetur."
                      Icon={MisionIcon}
                      idSection="mision"
                      handleResetMenus={handleResetMenus}
                    />
                    <ItemListDropDown
                      title="Visión"
                      description="Lorem ipsum dolor sit amet consectetur."
                      Icon={VisionIcon}
                      idSection="vision"
                      handleResetMenus={handleResetMenus}
                    />
                    <ItemListDropDown
                      title="Nuestro Equipo"
                      description="Lorem ipsum dolor sit amet consectetur."
                      Icon={TeamIcon}
                      idSection="team"
                      handleResetMenus={handleResetMenus}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className={`hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-12 ${
            status === "authenticated" &&
            session?.user?.document === "0000000000" &&
            "lg:w-40 lg:ml-20"
          }`}
        >
          {status !== "authenticated" ? (
            <>
              <Link
                href="/signup"
                className="text-base font-bold leading-6 text-gray-900 dark:text-zinc-50 hover:text-sushi-500 dark:hover:text-sushi-500 flex items-center justify-center gap-x-1"
                onClick={handleResetMenus}
              >
                Registrarse
                <SignupIcon className="-mb-1 text-2xl" />
              </Link>
              <Link
                href="/signin"
                className="flex justify-center items-center gap-2 text-base font-bold leading-6 text-gray-900 dark:text-zinc-50 hover:text-sushi-500 dark:hover:text-sushi-500"
                onClick={handleResetMenus}
              >
                Ingresar
                <LogInIcon />
              </Link>
            </>
          ) : (
            <>
              {session?.user?.document === "0000000000" ? (
                <Link
                  href="/profile/admin/dashboard"
                  className="flex justify-center items-center gap-2 text-base font-bold leading-6 text-gray-900 dark:text-zinc-50 hover:text-sushi-500 dark:hover:text-sushi-500"
                >
                  Admin.
                  <AdminIcon />
                </Link>
              ) : (
                <Link
                  href="/profile/user/personal-information"
                  className="flex justify-center items-center gap-2 text-base font-bold leading-6 text-gray-900 dark:text-zinc-50 hover:text-sushi-500 dark:hover:text-sushi-500"
                >
                  Perfil
                  <UserIcon />
                </Link>
              )}
              <button
                className="flex justify-center items-center gap-2 text-base font-bold leading-6 text-gray-900 dark:text-zinc-50 hover:text-sushi-500 dark:hover:text-sushi-500"
                onClick={handleCloseSession}
              >
                Cerrar Sesión
                <LogInIcon />
              </button>
            </>
          )}

          <Toggler />
        </div>
        <button
          className="lg:hidden hover:text-sushi-500"
          onClick={handleMenuMobileOpen}
        >
          <MenuIcon />
        </button>
      </nav>

      {isMenuMobileOpen && (
        <MobileMenu
          isSubMenuMobileOpen={isSubMenuMobileOpen}
          isSubMenuAdminPanelOpen={isSubMenuAdminPanelOpen}
          handleMenuMobileOpen={handleMenuMobileOpen}
          handleSubMenuMobileOpen={handleSubMenuMobileOpen}
          handleSubMenuAdminPanelOpen={handleSubMenuAdminPanelOpen}
          handleResetMenus={handleResetMenus}
        />
      )}
    </header>
  );
}

export default NavBar;
