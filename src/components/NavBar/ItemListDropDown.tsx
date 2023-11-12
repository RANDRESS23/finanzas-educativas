import { shorttxt } from "@/libs/shorttxt";
import Link from "next/link";

interface ItemListDropDownProps {
  title: string;
  description: string;
  Icon: React.FC;
  href: string;
  handleResetMenus: () => void;
}

export default function ItemListDropDown({
  title,
  description,
  Icon,
  href,
  handleResetMenus,
}: ItemListDropDownProps) {
  return (
    <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-base leading-6 hover:bg-gray-50 dark:hover:bg-slate-700">
      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white dark:bg-slate-700 dark:group-hover:bg-slate-800">
        <Icon />
      </div>
      <div className="flex-auto">
        <Link
          href={`/financial-education/${href}`}
          className="block font-semibold text-gray-900 dark:text-zinc-50 hover:text-sushi-500 transition-all duration-150"
          onClick={handleResetMenus}
        >
          {title}
          <span className="absolute inset-0"></span>
        </Link>
        <p className="mt-1 text-gray-600 dark:text-gray-400 whitespace-nowrap overflow-hidden animate-[typing_3s_steps(40)]">
          {shorttxt(description, 6, "...")}
        </p>
      </div>
    </div>
  );
}
