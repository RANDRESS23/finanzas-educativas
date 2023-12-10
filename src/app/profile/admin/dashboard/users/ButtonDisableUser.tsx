"use client";

import api from "@/libs/api";
import { tosty } from "@/libs/tosty";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUserSlash as DisableUserIcon } from "react-icons/fa6";

interface IProps {
  userId: string;
}

export default function ButtonDisableUser({ userId }: IProps) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const {
        data: { message },
        status,
      } = await api.patch("/user", { userId });

      if (status === 201) {
        tosty.success(message);
        router.refresh();
      }
    } catch (error) {
      if (isAxiosError(error)) {
        tosty.error(error.response?.data.message);
      }

      console.error({ error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="rounded-md p-2 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 duration-300 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 flex items-center justify-center gap-x-1 disabled:cursor-not-allowed enabled:active:bg-amber-400"
      disabled={isLoading}
    >
      <DisableUserIcon />
    </button>
  );
}
