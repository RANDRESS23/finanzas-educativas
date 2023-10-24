import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Finanzas Educativas | Perfíl",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
