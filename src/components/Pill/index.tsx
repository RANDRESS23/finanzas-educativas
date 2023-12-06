import Link from "next/link";
import { GiPill } from "react-icons/gi";

interface PillProps {
  title: string;
  description: string;
}

export default function Pill({ title, description }: PillProps) {
  return (
    <div className="relative flex w-80 flex-col rounded-xl bg-white dark:bg-slate-950/40 bg-clip-border text-gray-700 shadow-2xl shadow-slate-500/20 dark:shadow-slate-950/60 hover:bg-slate-100 dark:hover:bg-slate-900 hover:ring-1 hover:ring-gray-200/40 dark:hover:ring-slate-700/20 transition-colors duration-300 flow-finanzas-xd">
      <div className="px-6 pt-6 pb-3">
        <div className="flex items-center gap-4">
          <GiPill className="text-4xl text-boston-blue-600" />
          <h5 className="text-xl font-semibold leading-snug tracking-normal text-sushi-500">
            {title}
          </h5>
        </div>
        <p className="block text-base font-light dark:text-gray-400 leading-relaxed mt-3">
          {description}
        </p>
      </div>
      <div className="p-6 pt-0">
        <Link
          className="font-medium text-blue-gray-900 transition-colors hover:text-boston-blue-600"
          href="/financial-education/first-dimension"
        >
          <button
            className="flex justify-center select-none items-center gap-2 rounded-lg py-1 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-boston-blue-600 transition-all hover:bg-boston-blue-600/10 enabled:active:bg-boston-blue-600/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            data-ripple-dark="true"
          >
            Aprender más
            <span className="text-2xl mb-1" aria-hidden="true">
              →
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
}
