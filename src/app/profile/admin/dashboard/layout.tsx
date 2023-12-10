import pkg from "@/../package.json";
import Aside from "@/components/Aside";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: `${pkg.description} | Admin`,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Aside />
      {children}
    </main>
  );
}
