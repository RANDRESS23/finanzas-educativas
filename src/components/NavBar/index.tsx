"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  LogInIcon,
  MenuIcon,
  MisionIcon,
  QuestionIcon,
  VisionIcon,
  TeamIcon,
  AdminIcon,
  UserIcon,
} from "./icons";
import ItemListDropDown from "./ItemListDropDown";
import MobileMenu from "./MobileMenu";
import { useSession, signOut } from "next-auth/react";
import { RiTeamFill as UsIcon } from "react-icons/ri";
import { BiBookReader as EducationIcon } from "react-icons/bi";
import { BiHomeAlt2 as HomeIcon } from "react-icons/bi";
import { MdContactSupport as ContactIcon } from "react-icons/md";
import { LiaSignInAltSolid as SignupIcon } from "react-icons/lia";

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
    <header className="bg-white border border-[#0f172a1a] fixed top-0 w-full z-10">
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
            className="text-base font-bold leading-6 text-gray-900 hover:text-[#79ad34] flex items-center gap-x-1 justify-center"
            onClick={handleResetMenus}
          >
            <HomeIcon className="-mb-1" />
            Inicio
          </Link>
          <Link
            href="/financial-education"
            className="text-base font-bold leading-6 text-gray-900 hover:text-[#79ad34] flex items-center justify-center gap-x-1"
            onClick={handleResetMenus}
          >
            <EducationIcon className="-mb-1" />
            Educación Financiera
          </Link>
          <Link
            href="/contact"
            className="text-base font-bold leading-6 text-gray-900 hover:text-[#79ad34] flex items-center justify-center gap-x-1"
            onClick={handleResetMenus}
          >
            <ContactIcon />
            Contacto
          </Link>

          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-x-1 text-base font-bold leading-6 text-gray-900 hover:text-[#79ad34]"
              aria-expanded="false"
              onClick={handleMenuOpen}
            >
              <UsIcon />
              Nosotros
              {isMenuOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
            </button>

            <div
              className={`${
                isMenuOpen
                  ? "transition ease-out duration-200 opacity-100 translate-y-0"
                  : "transition ease-in duration-150 opacity-0 translate-y-1"
              }`}
            >
              {isMenuOpen && (
                <div className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
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
                className="text-base font-bold leading-6 text-gray-900 hover:text-[#79ad34] flex items-center justify-center gap-x-1"
                onClick={handleResetMenus}
              >
                Registrarse
                <SignupIcon className="-mb-1" />
              </Link>
              <Link
                href="/signin"
                className="flex justify-center items-center gap-2 text-base font-bold leading-6 text-gray-900 hover:text-[#79ad34]"
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
                  className="flex justify-center items-center gap-2 text-base font-bold leading-6 text-gray-900 hover:text-[#79ad34]"
                >
                  Admin.
                  <AdminIcon />
                </Link>
              ) : (
                <Link
                  href="/profile/user/personal-information"
                  className="flex justify-center items-center gap-2 text-base font-bold leading-6 text-gray-900 hover:text-[#79ad34]"
                >
                  Perfil
                  <UserIcon />
                </Link>
              )}
              <button
                className="flex justify-center items-center gap-2 text-base font-bold leading-6 text-gray-900 hover:text-[#79ad34]"
                onClick={handleCloseSession}
              >
                Cerrar Sesión
                <LogInIcon />
              </button>
            </>
          )}
        </div>
        <button
          className="lg:hidden hover:text-[#79ad34]"
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
