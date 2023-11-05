import { TostyProps } from "@/libs/tosty";
import clsx from "clsx";
import Image from "next/image";
import toast from "react-hot-toast";

export default function Tosty({ icon, options, subject, text }: TostyProps) {
  const { ReactIcon, color } = icon!;

  return toast.custom(
    (t) => (
      <div
        className={clsx(
          "max-w-md w-full shadow-lg dark:shadow-slate-950/30 rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 bg-white/60 dark:bg-slate-900/80 backdrop-blur supports-backdrop-blur:bg-white/60",
          {
            "animate-enter": t.visible,
            "animate-leave": !t.visible,
          }
        )}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <Image
                className={clsx("h-10 w-10 rounded-full", { hidden: !!color })}
                src="https://reqres.in/img/faces/4-image.jpg"
                width={40}
                height={40}
                alt=""
              />
              <ReactIcon
                className={clsx("font-bold text-2xl", {
                  block: !color,
                  "text-sushi-500": color === "green",
                  "text-red-600": color === "red",
                  "text-yellow-500": color === "yellow",
                  "text-boston-blue-600": color === "blue",
                })}
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium">{subject}</p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{`${text}`}</p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-300 dark:border-gray-700">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-boston-blue-600 hover:text-boston-blue-700 focus:outline-none"
          >
            Cerrar
          </button>
        </div>
      </div>
    ),
    { ...options }
  );
}
