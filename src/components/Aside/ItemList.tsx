import Link from "next/link";
import { usePathname } from "next/navigation";
import { SiSoundcharts as AdminIcon } from "react-icons/si";

interface ItemListProps {
  href: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
}

export default function ItemList({ href, Icon, title }: ItemListProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`text-base font-semibold rounded-lg hover:text-sushi-500 hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center p-2 group ${
        pathname === href ? "bg-gray-100 dark:bg-slate-800" : ""
      }`}
    >
      {href === "/profile/admin/dashboard" ? (
        <AdminIcon className="text-2xl text-gray-600" />
      ) : (
        <Icon />
      )}
      <span
        className={`ml-3 flex-1 whitespace-nowrap ${
          pathname === href ? "text-sushi-500" : ""
        }`}
      >
        {title}
      </span>
    </Link>
  );
}
