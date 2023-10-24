"use client";

import { SessionProvider } from "next-auth/react";

interface SessionProviderProps {
  children: React.ReactNode;
}

const SessionProviderContext: React.FC<SessionProviderProps> = ({
  children,
}) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviderContext;
