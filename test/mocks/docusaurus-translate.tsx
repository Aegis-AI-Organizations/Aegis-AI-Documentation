import React from "react";
import type { ReactNode } from "react";

export default function Translate({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function translate({ message }: { message: string }) {
  return message;
}
