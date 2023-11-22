"use client";

import ServerInternalErrorGif from "@/assets/ServerInternalError.gif";
import ServerInternalErrorGifDark from "@/assets/ServerInternalErrorDark.gif";
import Image from "next/image";
import { useEffect } from "react";
import { MdContactSupport as ContactIcon } from "react-icons/md";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center w-10/12 m-auto">
      <div className="hidden md:flex md:w-2/5 p-8">
        <Image
          width={500}
          height={500}
          src={ServerInternalErrorGif}
          alt="Placeholder Image"
          className="rounded-xl dark:hidden -z-50"
        />
        <Image
          width={500}
          height={500}
          src={ServerInternalErrorGifDark}
          alt="Placeholder Image"
          className="rounded-xl hidden dark:block -z-50"
        />
      </div>
      <div className="w-full md:w-1/2 p-4 md:p-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Error Inesperado
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8">
          {"Lo sentimos, ha ocurrido un error inesperado."}
        </p>
        <button
          onClick={() => reset()}
          className="px-4 py-3 mx-2 bg-zinc-50 dark:text-slate-900 rounded-lg inline-flex items-center hover:bg-red-500 dark:hover:text-white hover:text-white transition duration-300 ease-in-out mb-4 shadow-md gap-x-1"
        >
          <ContactIcon />
          <span className="text-sm">Intentar Otra Vez</span>
        </button>
      </div>
    </div>
  );
}
