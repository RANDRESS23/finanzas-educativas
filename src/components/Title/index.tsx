"use client";

import { shorttxt } from "@/libs/shorttxt";
import clsx from "clsx";
import { type Session } from "next-auth";
import { useSession } from "next-auth/react";

interface TitleProps {
  text?: string;
  isTextStatic?: boolean;
}

export default function Title({ text, isTextStatic }: TitleProps) {
  const { data: session, status } = useSession();

  const elSt = status === "authenticated" && !isTextStatic;

  return (
    <span className="flex justify-center items-center flex-wrap overflow-hidden m-0">
      <div
        className={clsx("whitespace-nowrap overflow-hidden", {
          "text-boston-blue-600": elSt,
          "text-sushi-500": !elSt,
          "animate-typing": status !== "loading",
        })}
      >
        {status === "authenticated" && !isTextStatic ? (
          (({ user: { firstName, lastName } }: Session): string => {
            const upc = (t: string) => t[0].toUpperCase() + t.slice(1);
            const fn = shorttxt(firstName, 1, "");
            const ln = shorttxt(lastName, 1, "!");
            return `${upc(fn)} ${upc(ln)}`;
          })(session!)
        ) : status === "loading" && !isTextStatic ? (
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-slate-900 dark:text-slate-100"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        ) : (
          text
        )}
      </div>
    </span>
  );
}
