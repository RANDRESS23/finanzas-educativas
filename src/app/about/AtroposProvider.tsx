"use client";

import "atropos/css";
import Atropos from "atropos/react";

export default function AtroposProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <Atropos rotateXMax={2} rotateYMax={2}>
      {children}
    </Atropos>
  );
}
