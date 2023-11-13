import Link from "next/link";
import { usePathname } from "next/navigation";

interface ItemListProps {
  href: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
}

export default function ItemList({ href, Icon, title }: ItemListProps) {
  const pathname = usePathname()
  
  return (
    <Link
      href={href}
      className={`text-base font-semibold rounded-lg hover:text-sushi-500 hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center p-2 group ${pathname === href ? "bg-gray-100 dark:bg-slate-800" : ""}`}
    >
      <Icon href={href} />
      <span className={`ml-3 flex-1 whitespace-nowrap ${pathname === href ? "text-sushi-500" : ""}`}>{title}</span>
    </Link>
  );
}
