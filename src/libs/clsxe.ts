import clsx from "clsx";

const clsxe = (inputErrors: any, cl?: string) =>
  clsx(
    "block w-full rounded-md border-0 py-2 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-200 shadow-sm shadow-gray-100 dark:shadow-gray-800/40 ring-1 ring-inset placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset disabled:text-gray-500 dark:disabled:text-gray-600 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:cursor-not-allowed " +
      cl,
    {
      " ring-rose-500 dark:ring-rose-500 focus:ring-rose-500 dark:focus:ring-rose-500":
        inputErrors !== undefined,
      " ring-gray-300 dark:ring-slate-700 focus:ring-boston-blue-600 dark:focus:ring-boston-blue-600":
        inputErrors === undefined,
    }
  );

export default clsxe;
