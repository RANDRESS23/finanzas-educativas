import { BiSolidBookContent as DashboardIcon } from "react-icons/bi";
import { FaUsersRectangle as MemebersIcon } from "react-icons/fa6";
import { PiUsersFourFill as UsersIcon } from "react-icons/pi";
import { SiSoundcharts as AdminIcon } from "react-icons/si";
import ItemList from "./ItemList";

export default function Aside() {
  return (
    <aside
      id="sidebar"
      className="fixed hidden h-full top-0 left-0 mt-[75px] lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
      aria-label="Sidebar"
    >
      <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 dark:border-gray-800/20 pt-0">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex-1 px-3 divide-y space-y-1">
            <ul className="space-y-2 pb-2">
              <li>
                <ItemList
                  href="/profile/admin/dashboard"
                  icon={
                    <AdminIcon className="text-2xl dark:text-gray-400 text-gray-600" />
                  }
                  title="Estadísticas"
                />
              </li>
              <li>
                <ItemList
                  href="/profile/admin/dashboard/page-content"
                  icon={
                    <DashboardIcon className="text-2xl dark:text-gray-400 text-gray-600" />
                  }
                  title="Contenido"
                />
              </li>
              <li>
                <ItemList
                  href="/profile/admin/dashboard/users"
                  icon={
                    <UsersIcon className="text-2xl dark:text-gray-400 text-gray-600" />
                  }
                  title="Usuarios"
                />
              </li>
              <li>
                <ItemList
                  href="/profile/admin/dashboard/teamMembers"
                  icon={
                    <MemebersIcon className="text-2xl dark:text-gray-400 text-gray-600" />
                  }
                  title="Miembros Equipo"
                />
              </li>
            </ul>
            {/* <div className="space-y-2 pt-2">
              <ItemList
                href="/profile/admin/dashboard/help"
                Icon={HelpIcon}
                title="Ayuda"
              />
            </div> */}
          </div>
        </div>
      </div>
    </aside>
  );
}
