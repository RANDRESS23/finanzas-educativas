"use client";

import { tosty } from "@/libs/tosty";
import { useRouter } from "next-nprogress-bar";
import { TbBrandSpeedtest as TestIcon } from "react-icons/tb";

interface ButtonRedirectTestProps {
  idUser: string;
}

export default function ButtonRedirectPreTest({
  idUser,
}: ButtonRedirectTestProps) {
  const router = useRouter();

  const handleRedirect = async () => {
    try {
      const existUserMoreInfo = await fetch(`/api/user/userMoreInfo/${idUser}`);
      const data = await existUserMoreInfo.json();

      if (data.id) {
        return router.push("/profile/user/pre-test");
      }

      return tosty.error(
        "Debes completar tu información personal para poder realizar el pre-test de conocimiento.",
      );
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <button
      onClick={handleRedirect}
      className="rounded-md bg-boston-blue-600 hover:bg-sushi-500 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-300 flex items-center justify-center gap-x-2"
    >
      REALIZAR PRE-TEST DE CONOCIMIENTO
      <TestIcon />
    </button>
  );
}
