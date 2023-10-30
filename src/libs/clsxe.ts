import clsx from "clsx";

const clsxe = (inputErrors: any, cl?: string) =>
  clsx(
    "block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-xs",
    cl,
    {
      "ring-rose-500 focus:outline-rose-500": inputErrors !== undefined,
      "border-gray-300 focus:outline-[#008aae]": inputErrors === undefined,
    }
  );

export default clsxe;
