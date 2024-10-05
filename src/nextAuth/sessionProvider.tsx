"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface SessionAuthProviderProps {
  readonly children: ReactNode;
}

export default function ({ children }: SessionAuthProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
