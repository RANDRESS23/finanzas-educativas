"use client";

import clsx from "clsx";
import { useSession } from "next-auth/react";

interface TitleProps {
  text: string;
  isTextStatic: boolean;
}

export default function Title({
  text,
  isTextStatic,
}: TitleProps): React.ReactNode {
  const { data: session, status } = useSession();

  const elSt = status === "authenticated" && !isTextStatic;

  return (
    <span className="flex justify-center items-center flex-wrap overflow-hidden m-0">
      <div
        className={clsx("whitespace-nowrap overflow-hidden animate-typing", {
          "text-boston-blue-600": elSt,
          "text-sushi-500": !elSt,
        })}
      >
        {status === "authenticated" && !isTextStatic
          ? `${session?.user?.firstName}!`
          : text}
      </div>
    </span>
  );
}
