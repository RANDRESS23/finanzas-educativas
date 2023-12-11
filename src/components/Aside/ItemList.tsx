"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ItemListProps {
  href: string | string[];
  icon: React.ReactElement;
  title: string;
}

export default function ItemList({ href, icon, title }: ItemListProps) {
  const pathname = usePathname();

  const pathMatch = !Array.isArray(href)
    ? pathname === href
    : href.find(p => p === pathname.replace(/\/[^\/]+$/, "")) ||
      pathname === href[0];

  return (
    <li>
      <Link
        href={!Array.isArray(href) ? href : href[0]}
        className={clsx(
          "text-base font-semibold rounded-lg hover:text-sushi-500 hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center p-2 group",
          {
            "bg-gray-100 dark:bg-slate-800": pathMatch,
          },
        )}
      >
        {icon}
        <span
          className={clsx("ml-3 flex-1 whitespace-nowrap", {
            "text-sushi-500": pathMatch,
          })}
        >
          {title}
        </span>
      </Link>
    </li>
  );
}
