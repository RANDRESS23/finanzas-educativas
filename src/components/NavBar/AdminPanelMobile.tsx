import Link from 'next/link'
import { DashboardIcon, HelpIcon, UserIcon } from '../Aside/icons'

interface AdminPanelMobileProps {
  handleResetMenus: () => void
}

export default function AdminPanelMobile ({
  handleResetMenus
}: AdminPanelMobileProps): React.ReactNode {
  return (
    <div className="my-2 space-y-2" id="disclosure-1">
      <Link
        href="/profile/admin/dashboard/page-content"
        className="group flex justify-between items-center gap-2 rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-[#79ad34]"
        onClick={handleResetMenus}
      >
        Contenido
        <DashboardIcon />
      </Link>
      <Link
        href="/profile/admin/dashboard/users"
        className="group flex justify-between items-center gap-2 rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-[#79ad34]"
        onClick={handleResetMenus}
      >
        Usuarios
        <UserIcon />
      </Link>
      <Link
        href="/profile/admin/dashboard/help"
        className="group flex justify-between items-center gap-2 rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-[#79ad34]"
        onClick={handleResetMenus}
      >
        Ayuda
        <HelpIcon />
      </Link>
    </div>
  )
}
