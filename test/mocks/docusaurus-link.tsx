import React from "react";
import type { ReactNode } from "react";

export default function DocusaurusLink({
  children,
  to,
}: {
  children: ReactNode;
  to: string;
}) {
  return <a href={to}>{children}</a>;
}
