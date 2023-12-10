import pkg from "@/../package.json";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: `${pkg.description} | Perfíl`,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
