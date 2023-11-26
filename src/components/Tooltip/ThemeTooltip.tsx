import clsx from "clsx";
import React from "react";

interface IProps {
  message: string;
  children: React.ReactNode;
  cl: string;
}

export default function ThemeTooltip({ message, children, cl }: IProps) {
  return (
    <div className="group relative flex">
      {children}
      <span
        className={clsx(
          cl +
            " scale-0 absolute transition-all transform rounded bg-slate-900 dark:bg-slate-100 p-2 text-xs text-white dark:text-gray-900 group-hover:scale-100 text-center",
        )}
      >
        {message}
      </span>
    </div>
  );
}
