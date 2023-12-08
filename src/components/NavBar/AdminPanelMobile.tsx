import Link from "next/link";
import { BiSolidBookContent as DashboardIcon } from "react-icons/bi";
import { FaUsersRectangle as MemebersIcon } from "react-icons/fa6";
import { PiUsersFourFill as UsersIcon } from "react-icons/pi";
import { SiSoundcharts as AdminIcon } from "react-icons/si";

interface AdminPanelMobileProps {
  handleResetMenus: () => void;
}

export default function AdminPanelMobile({
  handleResetMenus,
}: AdminPanelMobileProps) {
  return (
    <div className="my-2 space-y-2 animate-enter" id="disclosure-1">
      <Link
        href="/profile/admin/dashboard"
        className="group flex justify-between items-center gap-2 rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-sushi-500"
        onClick={handleResetMenus}
      >
        Estadísticas
        <AdminIcon className="text-2xl text-gray-600" />
      </Link>
      <Link
        href="/profile/admin/dashboard/page-content"
        className="group flex justify-between items-center gap-2 rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-sushi-500"
        onClick={handleResetMenus}
      >
        Contenido
        <DashboardIcon className="text-2xl text-gray-600" />
      </Link>
      <Link
        href="/profile/admin/dashboard/users"
        className="group flex justify-between items-center gap-2 rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-sushi-500"
        onClick={handleResetMenus}
      >
        Usuarios
        <UsersIcon className="text-2xl text-gray-600" />
      </Link>
      <Link
        href="/profile/admin/dashboard/teamMembers"
        className="group flex justify-between items-center gap-2 rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-sushi-500"
        onClick={handleResetMenus}
      >
        Miembros Equipo
        <MemebersIcon className="text-2xl text-gray-600" />
      </Link>

      {/* <Link
        href="/profile/admin/dashboard/help"
        className="group flex justify-between items-center gap-2 rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-sushi-500"
        onClick={handleResetMenus}
      >
        Ayuda
        <HelpIcon />
      </Link> */}
    </div>
  );
}
