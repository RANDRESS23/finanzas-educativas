import Link from "next/link";
import { FinanceIcon, AccountCashIcon, PigIcon } from "./icons";

interface AboutListMobileProps {
  handleResetMenus: () => void;
}

export default function FinancialEducationListMobile({
  handleResetMenus,
}: AboutListMobileProps) {
  return (
    <div className="mt-2 space-y-2 animate-enter" id="disclosure-1">
      <Link
        href="/financial-education/first-dimension"
        className="group flex justify-between items-center gap-2 rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-sushi-500"
        onClick={handleResetMenus}
      >
        Conocimiento de las finanzas personales
        <AccountCashIcon />
      </Link>
      <Link
        href="/financial-education/second-dimension"
        className="group flex justify-between items-center gap-2 rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-sushi-500"
        onClick={handleResetMenus}
      >
        Toma de decisiones financieras
        <FinanceIcon />
      </Link>
      <Link
        href="/financial-education/third-dimension"
        className="group flex justify-between items-center gap-2 rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-sushi-500"
        onClick={handleResetMenus}
      >
        Administración de sus propias finanzas
        <PigIcon />
      </Link>
    </div>
  );
}
