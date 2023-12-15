"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function ProgressProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <>
      <ProgressBar
        height="3px"
        color="#79ad34"
        options={{
          showSpinner: false,
        }}
        shallowRouting
      />
      {children}
    </>
  );
}
