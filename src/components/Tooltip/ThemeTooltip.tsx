import React from "react";

interface IProps {
  message: string;
  children: React.ReactNode;
}

export default function ThemeTooltip({ message, children }: IProps) {
  return (
    <div className="group relative flex">
      {children}
      <span className="absolute top-10 right-0 scale-0 transition-all transform origin-left rounded bg-slate-900 dark:bg-slate-100 p-2 text-xs text-white dark:text-gray-900 group-hover:scale-100 w-20 text-center">
        {message}
      </span>
    </div>
  );
}
