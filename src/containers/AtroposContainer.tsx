"use client";

import { type AtroposOptions } from "atropos";
import Atropos from "atropos/react";

export default function AtroposContainer({
  children,
  atroposOpts,
}: {
  children: React.ReactElement;
  atroposOpts?: AtroposOptions;
}) {
  return <Atropos {...atroposOpts}>{children}</Atropos>;
}
