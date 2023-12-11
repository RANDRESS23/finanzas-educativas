"use client";

import useStart2FAAuth from "@/hooks/useStart2FAAuth";
import { type Session } from "next-auth";
import { useEffect } from "react";

export default function FA2Auth({
  session,
}: {
  session: Session | null;
}): [boolean] {
  const { isLoadingAuth, start2FAAuth } = useStart2FAAuth();

  const verifying = session?.user.is2FAEnabled && !session?.is2FAVerified;

  useEffect(() => {
    (() => {
      if (!session?.user.is2FAEnabled) return;
      if (verifying) {
        start2FAAuth();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, verifying]);

  return [isLoadingAuth];
}
