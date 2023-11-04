import clsx from "clsx";

const clsxe = (inputErrors: any, cl?: string) =>
  clsx(
    "block w-full bg-gray-50 dark:bg-slate-800 rounded-md border-0 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 disabled:bg-gray-200 disabled:dark:bg-slate-900 disabled:cursor-not-allowed disabled:text-opacity-60 disabled:ring-gray-200",
    cl,
    {
      "ring-rose-500 focus:outline-rose-500": inputErrors !== undefined,
      "border-gray-300 focus:outline-boston-blue-600":
        inputErrors === undefined,
    }
  );

export default clsxe;
