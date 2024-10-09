"use client";

import { ReactNode } from "react";
import { useSetupAxiosInterceptors } from "@/hooks";

interface InterceptorProviderProps {
  readonly children: ReactNode;
}

export default function ({ children }: InterceptorProviderProps) {
  useSetupAxiosInterceptors();
  return <>{children}</>;
}
