"use client";

import IconoFinanzasEducativas from "@/assets/icono_finanzas_educativas.png";
import ThemeToggle from "@/components/Theme/ThemeToggle";
import { useCloseSession } from "@/hooks/useCloseSession";
import clsx from "clsx";
import { useSession } from "next-auth/react";
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
import { SiSoundcharts as AdminIcon } from "react-icons/si";
import ThemeTooltip from "../Tooltip/ThemeTooltip";
import ItemListDropDown from "./ItemListDropDown";
import MobileMenu from "./MobileMenu";
import {
  AccountCashIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  FinanceIcon,
  LogInIcon,
  MenuIcon,
  PigIcon,
  UserIcon,
} from "./icons";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuMobileOpen, setIsMenuMobileOpen] = useState(false);
  const [isSubMenuAdminPanelOpen, setIsSubMenuAdminPanelOpen] = useState(false);
  const [isSubMenuMobileOpen, setIsSubMenuMobileOpen] = useState(false);
  const { data: session, status } = useSession();
  const { closeSession } = useCloseSession();

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

  return (
    <header
      className={clsx(
        "fixed top-0 z-40 border-b border-slate-950/10 w-full flex-none transition-colors duration-500 dark:border-slate-50/[0.06] bg-white/60 dark:bg-slate-900 lg:z-50",
        {
          "backdrop-blur supports-backdrop-blur:bg-white/60 dark:bg-transparent":
            !isMenuMobileOpen,
        },
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between py-5 px-6 lg:px-8">
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
            className="-m-1.5 p-1.5 flex justify-center items-center gap-x-2"
            onClick={handleResetMenus}
          >
            <Image
              width={40}
              src={IconoFinanzasEducativas}
              priority
              alt="Finanzas Educativas"
            />
            <div className="flex justify-center items-center text-2xl font-bold">
              Finanzas Educativas
            </div>
          </Link>
        </div>
        <div className="hidden lg:flex lg:gap-x-10">
          <Link
            href={
              status === "authenticated" &&
              session?.user?.document !== "0000000000"
                ? "/profile/user"
                : "/"
            }
            className="text-base font-bold leading-6 text-gray-900 dark:text-zinc-50 hover:text-sushi-500 dark:hover:text-sushi-500 flex items-center gap-x-1 justify-center"
            onClick={handleResetMenus}
          >
            <HomeIcon className="text-2xl" />
            Inicio
          </Link>
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-x-1 text-base font-bold leading-6 text-gray-900 dark:text-zinc-50 hover:text-sushi-500 dark:hover:text-sushi-500"
              aria-expanded="false"
              onClick={handleMenuOpen}
            >
              <EducationIcon className="text-2xl" />
              Educación Financiera
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
                <div className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white/95 dark:bg-slate-800/95 shadow-xl dark:shadow-slate-950/30 ring-1 ring-gray-900/5">
                  <div className="p-4">
                    <ItemListDropDown
                      title="Conocimiento de las finanzas personales"
                      description="Alfabetización financiera"
                      Icon={AccountCashIcon}
                      href="first-dimension"
                      handleResetMenus={handleResetMenus}
                    />
                    <ItemListDropDown
                      title="Toma de decisiones financieras"
                      description="Resolución de problemas financieros"
                      Icon={FinanceIcon}
                      href="second-dimension"
                      handleResetMenus={handleResetMenus}
                    />
                    <ItemListDropDown
                      title="Administración de sus propias finanzas"
                      description="Aplicación de las finanzas personales"
                      Icon={PigIcon}
                      href="third-dimension"
                      handleResetMenus={handleResetMenus}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <Link
            href="/contact"
            className="text-base font-bold leading-6 text-gray-900 dark:text-zinc-50 hover:text-sushi-500 dark:hover:text-sushi-500 flex items-center justify-center gap-x-1"
            onClick={handleResetMenus}
          >
            <ContactIcon className="text-2xl" />
            Contacto
          </Link>
          <Link
            href="/about"
            className="text-base font-bold leading-6 text-gray-900 dark:text-zinc-50 hover:text-sushi-500 dark:hover:text-sushi-500 flex items-center justify-center gap-x-1"
            onClick={handleResetMenus}
          >
            <UsIcon className="text-2xl" />
            Nosotros
          </Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-10">
          {status !== "authenticated" ? (
            <>
              <Link
                href="/signup"
                className="text-base font-bold leading-6 text-gray-900 dark:text-zinc-50 hover:text-sushi-500 dark:hover:text-sushi-500 flex items-center justify-center gap-x-1"
                onClick={handleResetMenus}
              >
                Registrarse
                <SignupIcon className="text-2xl" />
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
                  <AdminIcon className="text-2xl" />
                </Link>
              ) : (
                <Link
                  href="/profile/user/personal-information"
                  className="flex justify-center items-center gap-2 text-base font-bold leading-6 text-gray-900 dark:text-zinc-50 hover:text-sushi-500 dark:hover:text-sushi-500"
                >
                  Perfíl
                  <UserIcon />
                </Link>
              )}
              <button
                className="flex justify-center items-center gap-2 text-base font-bold leading-6 text-gray-900 dark:text-zinc-50 hover:text-sushi-500 dark:hover:text-sushi-500"
                onClick={() => closeSession()}
              >
                Cerrar Sesión
                <LogInIcon />
              </button>
            </>
          )}

          <ThemeTooltip
            message="Alternar tema"
            cl={clsx("origin-top-right w-20 top-5 right-3")}
          >
            <ThemeToggle id="themeToggler" />
          </ThemeTooltip>
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
