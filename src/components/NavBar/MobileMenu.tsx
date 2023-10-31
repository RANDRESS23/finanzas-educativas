"use client";

import Link from "next/link";
import Image from "next/image";
import AboutListMobile from "./AboutListMobile";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  CloseIcon,
  LogInIcon,
  AdminIcon,
  UserIcon,
} from "./icons";
import { useSession, signOut } from "next-auth/react";
import AdminPanelMobile from "./AdminPanelMobile";
import { RiTeamFill as UsIcon } from "react-icons/ri";
import { BiBookReader as EducationIcon } from "react-icons/bi";
import { BiHomeAlt2 as HomeIcon } from "react-icons/bi";
import { MdContactSupport as ContactIcon } from "react-icons/md";
import { LiaSignInAltSolid as SignupIcon } from "react-icons/lia";

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
}: MobileMenuProps): React.ReactNode {
  const { data: session, status } = useSession();

  const handleCloseSession = (): void => {
    signOut();
  };

  return (
    <div className="lg:hidden" role="dialog" aria-modal="true">
      <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
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
              width={32}
              height={32}
              className="w-8 h-8"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </Link>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:text-[#79ad34]"
            onClick={handleMenuMobileOpen}
          >
            <CloseIcon />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
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
                className="-mx-3 rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-[#79ad34] flex items-center gap-x-1"
                onClick={handleResetMenus}
              >
                <HomeIcon className="-mb-1" />
                Inicio
              </Link>
              <Link
                href="/financial-education"
                className="-mx-3 rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-[#79ad34] flex items-center gap-x-1"
                onClick={handleResetMenus}
              >
                <EducationIcon className="-mb-1" />
                Educación Financiera
              </Link>
              <Link
                href="/contact"
                className="-mx-3 rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-[#79ad34] flex items-center gap-x-1"
                onClick={handleResetMenus}
              >
                <ContactIcon />
                Contacto
              </Link>

              <div className="-mx-3">
                <button
                  type="button"
                  className="w-full flex justify-between items-center rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-[#79ad34]"
                  aria-controls="disclosure-1"
                  aria-expanded="false"
                  onClick={handleSubMenuMobileOpen}
                >
                  <span className="flex items-center justify-center gap-x-1">
                    <UsIcon />
                    Nosotros
                  </span>
                  {isSubMenuMobileOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
                </button>
                {isSubMenuMobileOpen && (
                  <AboutListMobile handleResetMenus={handleResetMenus} />
                )}
              </div>
            </div>
            <div className="py-6">
              {status !== "authenticated" ? (
                <>
                  <Link
                    href="/signup"
                    className="-mx-3 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-[#79ad34] flex items-center gap-x-1"
                    onClick={handleResetMenus}
                  >
                    Registrarse
                    <SignupIcon className="-mb-1" />
                  </Link>
                  <Link
                    href="/signin"
                    className="-mx-3 rounded-lg px-3 flex items-center gap-2 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-[#79ad34]"
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
                    //   className="-mx-3 flex items-center justify-between rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-[#79ad34]"
                    //   onClick={handleResetMenus}
                    // >
                    //     Panel Administrador
                    //   <AdminIcon />
                    // </Link>
                    <div className="-mx-3">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-[#79ad34]"
                        aria-controls="disclosure-1"
                        aria-expanded="false"
                        onClick={handleSubMenuAdminPanelOpen}
                      >
                        <div className="flex justify-center items-center gap-2">
                          <AdminIcon />
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
                      className="-mx-3 flex items-center justify-between rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-[#79ad34]"
                      onClick={handleResetMenus}
                    >
                      Perfil
                      <UserIcon />
                    </Link>
                  )}
                  <button
                    className="-mx-3 flex w-[calc(100%+23px)] items-center justify-between rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-[#79ad34]"
                    onClick={handleCloseSession}
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
