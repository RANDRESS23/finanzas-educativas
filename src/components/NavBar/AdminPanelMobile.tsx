import Link from "next/link";
import { DashboardIcon, HelpIcon, UserIcon } from "../Aside/icons";
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
        <DashboardIcon />
      </Link>
      <Link
        href="/profile/admin/dashboard/users"
        className="group flex justify-between items-center gap-2 rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-sushi-500"
        onClick={handleResetMenus}
      >
        Usuarios
        <UserIcon />
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
