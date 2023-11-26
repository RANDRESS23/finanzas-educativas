import clsx from "clsx";

const clsxe = (inputErrors: any, cl?: string) =>
  clsx(
    "block w-full rounded-md border-0 py-2 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-200 shadow-sm shadow-gray-100 dark:shadow-gray-800/40 ring-1 ring-inset placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset disabled:text-gray-500 dark:disabled:text-gray-600 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:cursor-not-allowed transition-all duration-100 " +
      cl,
    {
      " ring-rose-500 dark:ring-rose-500 focus:ring-rose-500 dark:focus:ring-rose-500 hover:ring-rose-600 dark:hover:ring-rose-600 dark:focus:hover:shadow-rose-500/40 focus:hover:shadow-rose-500/40 hover:shadow-rose-600/40 dark:hover:shadow-rose-600":
        inputErrors !== undefined,
      " ring-gray-300 dark:ring-slate-700 focus:ring-boston-blue-600 dark:focus:ring-boston-blue-600 hover:ring-gray-400/75 dark:hover:ring-slate-500 focus:hover:shadow-boston-blue-600/40 dark:focus:hover:shadow-boston-blue-600/40 hover:shadow-gray-200 dark:hover:shadow-gray-700/40":
        inputErrors === undefined,
    },
  );

export default clsxe;
