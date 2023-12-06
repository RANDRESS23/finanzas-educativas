import { signOut } from "next-auth/react";
import { useRouter } from "next-nprogress-bar";

/**
 * Custom hook to do SignOut.
 * @returns a function for handle close session.
 */
export const useCloseSession = () => {
  const router = useRouter();

  return {
    async closeSession() {
      await signOut({ redirect: false });
      router.refresh();
      router.push("/signin");
    },
  };
};
