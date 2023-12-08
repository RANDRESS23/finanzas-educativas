"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface ItemListProps {
  href: string;
  icon: React.ReactElement;
  title: string;
}

export default function ItemList({ href, icon, title }: ItemListProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`text-base font-semibold rounded-lg hover:text-sushi-500 hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center p-2 group ${
        pathname === href ? "bg-gray-100 dark:bg-slate-800" : ""
      }`}
    >
      {icon}
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
