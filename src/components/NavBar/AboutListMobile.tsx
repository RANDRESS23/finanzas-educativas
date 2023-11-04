import Link from "next/link";
import { MisionIcon, QuestionIcon, TeamIcon, VisionIcon } from "./icons";

interface AboutListMobileProps {
  handleResetMenus: () => void;
}

export default function AboutListMobile({
  handleResetMenus,
}: AboutListMobileProps): React.ReactNode {
  return (
    <div className="mt-2 space-y-2" id="disclosure-1">
      <Link
        href="/about/#quienesSomos"
        className="group flex justify-between items-center gap-2 rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-sushi-500"
        onClick={handleResetMenus}
      >
        ¿Quienes somos?
        <QuestionIcon />
      </Link>
      <Link
        href="/about/#mision"
        className="group flex justify-between items-center gap-2 rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-sushi-500"
        onClick={handleResetMenus}
      >
        Misión
        <MisionIcon />
      </Link>
      <Link
        href="/about/#vision"
        className="group flex justify-between items-center gap-2 rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-sushi-500"
        onClick={handleResetMenus}
      >
        Visión
        <VisionIcon />
      </Link>
      <Link
        href="/about/#team"
        className="group flex justify-between items-center gap-2 rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-sushi-500"
        onClick={handleResetMenus}
      >
        Nuestro Equipo
        <TeamIcon />
      </Link>
    </div>
  );
}
