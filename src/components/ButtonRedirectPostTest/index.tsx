"use client";

import { useRouter } from "next-nprogress-bar";
import { TbBrandSpeedtest as TestIcon } from "react-icons/tb";

export default function ButtonRedirectPostTest() {
  const router = useRouter();

  const handleRedirect = async () => {
    return router.push("/profile/user/post-test");
  };

  return (
    <button
      onClick={handleRedirect}
      className="rounded-md bg-boston-blue-600 hover:bg-sushi-500 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-300 flex items-center justify-center gap-x-2"
    >
      REALIZAR POST-TEST DE CONOCIMIENTO
      <TestIcon />
    </button>
  );
}
