"use client";

import IconoFinanzasEducativas from "@/assets/icono_finanzas_educativas.png";
import ThemeToggle from "@/components/Theme/ThemeToggle";
import { useCloseSession } from "@/hooks/useCloseSession";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
  BiBookReader as EducationIcon,
  BiHomeAlt2 as HomeIcon,
} from "react-icons/bi";
import { LiaSignInAltSolid as SignupIcon } from "react-icons/lia";
import { MdContactSupport as ContactIcon } from "react-icons/md";
import { RiTeamFill as UsIcon } from "react-icons/ri";
import { SiSoundcharts as AdminIcon } from "react-icons/si";
import AdminPanelMobile from "./AdminPanelMobile";
import FinancialEducationListMobile from "./FinancialEducationListMobile";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CloseIcon,
  LogInIcon,
  UserIcon,
} from "./icons";

interface MobileMenuProps {
  isSubMenuMobileOpen: boolean;
  isSubMenuAdminPanelOpen: boolean;
  handleMenuMobileOpen: () => void;
  handleSubMenuMobileOpen: () => void;
  handleSubMenuAdminPanelOpen: () => void;
  handleResetMenus: () => void;
}

export default function MobileMenu({
  isSubMenuMobileOpen,
  isSubMenuAdminPanelOpen,
  handleMenuMobileOpen,
  handleSubMenuMobileOpen,
  handleSubMenuAdminPanelOpen,
  handleResetMenus,
}: MobileMenuProps) {
  const { data: session, status } = useSession();
  const { closeSession } = useCloseSession();

  return (
    <div className="lg:hidden" role="dialog" aria-modal="true">
      <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white/95 dark:bg-slate-950/60 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 backdrop-blur-lg supports-backdrop-blur:bg-white/60 h-screen">
        <div className="flex items-center justify-between">
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
              width={40}
              src={IconoFinanzasEducativas}
              priority
              alt="Finanzas Educativas"
            />
          </Link>

          <ThemeToggle id="themeTogglerMobile" />

          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-200 hover:text-sushi-500"
            onClick={handleMenuMobileOpen}
          >
            <CloseIcon />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10 dark:divide-gray-100/10">
            <div className="space-y-2 py-6">
              <Link
                href={
                  status === "authenticated" &&
                  session?.user?.document !== "0000000000"
                    ? "/profile/user"
                    : "/"
                }
                className="-mx-3 rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-slate-900 hover:text-sushi-500 flex items-center gap-x-1"
                onClick={handleResetMenus}
              >
                <HomeIcon className="text-2xl" />
                Inicio
              </Link>
              <div className="-mx-3">
                <button
                  type="button"
                  className="w-full flex justify-between items-center rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-slate-900 hover:text-sushi-500"
                  aria-controls="disclosure-1"
                  aria-expanded="false"
                  onClick={handleSubMenuMobileOpen}
                >
                  <span className="flex items-center justify-center gap-x-1">
                    <EducationIcon className="text-2xl" />
                    Educación Financiera
                  </span>
                  {isSubMenuMobileOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
                </button>
                {isSubMenuMobileOpen && (
                  <FinancialEducationListMobile
                    handleResetMenus={handleResetMenus}
                  />
                )}
              </div>
              <Link
                href="/contact"
                className="-mx-3 rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-slate-900 hover:text-sushi-500 flex items-center gap-x-1"
                onClick={handleResetMenus}
              >
                <ContactIcon className="text-2xl" />
                Contacto
              </Link>
              <Link
                href="/about"
                className="-mx-3 rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-slate-900 hover:text-sushi-500 flex items-center gap-x-1"
                onClick={handleResetMenus}
              >
                <UsIcon className="text-2xl" />
                Nosotros
              </Link>
            </div>
            <div className="py-6">
              {status !== "authenticated" ? (
                <>
                  <Link
                    href="/signup"
                    className="-mx-3 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-slate-900 hover:text-sushi-500 flex items-center gap-x-1"
                    onClick={handleResetMenus}
                  >
                    Registrarse
                    <SignupIcon className="-mb-1 text-2xl" />
                  </Link>
                  <Link
                    href="/signin"
                    className="-mx-3 rounded-lg px-3 flex items-center gap-2 py-2.5 text-base font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-slate-900 hover:text-sushi-500"
                    onClick={handleResetMenus}
                  >
                    Ingresar
                    <LogInIcon />
                  </Link>
                </>
              ) : (
                <>
                  {session?.user?.document === "0000000000" ? (
                    // <Link
                    //   href='/profile/admin/dashboard'
                    //   className="-mx-3 flex items-center justify-between rounded-lg py-2 px-3 text-base font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-slate-900 hover:text-sushi-500"
                    //   onClick={handleResetMenus}
                    // >
                    //     Panel Administrador
                    //   <AdminIcon />
                    // </Link>
                    <div className="-mx-3">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-slate-900 hover:text-sushi-500"
                        aria-controls="disclosure-1"
                        aria-expanded="false"
                        onClick={handleSubMenuAdminPanelOpen}
                      >
                        <div className="flex justify-center items-center gap-2">
                          <AdminIcon className="text-2xl" />
                          Admin.
                        </div>
                        {isSubMenuAdminPanelOpen ? (
                          <ArrowUpIcon />
                        ) : (
                          <ArrowDownIcon />
                        )}
                      </button>
                      {isSubMenuAdminPanelOpen && (
                        <AdminPanelMobile handleResetMenus={handleResetMenus} />
                      )}
                    </div>
                  ) : (
                    <Link
                      href="/profile/user/personal-information"
                      className="-mx-3 flex items-center justify-between rounded-lg py-2 px-3 text-base font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-slate-900 hover:text-sushi-500"
                      onClick={handleResetMenus}
                    >
                      Perfíl
                      <UserIcon />
                    </Link>
                  )}
                  <button
                    className="-mx-3 flex w-[calc(100%+23px)] items-center justify-between rounded-lg py-2 px-3 text-base font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-slate-900 hover:text-sushi-500"
                    onClick={() => {
                      closeSession();
                      handleResetMenus();
                    }}
                  >
                    Cerrar Sesión
                    <LogInIcon />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
