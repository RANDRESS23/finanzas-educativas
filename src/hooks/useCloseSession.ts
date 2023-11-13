import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

/**
 * Custom hook to do SignOut.
 * @returns a function for handle close session.
 */
export const useCloseSession = () => {
  const router = useRouter();

  return {
    closeSession() {
      signOut({ redirect: false });
      router.refresh();
      router.push("/signin");
    },
  };
};
