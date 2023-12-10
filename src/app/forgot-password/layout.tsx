import pkg from "@/../package.json";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: `${pkg.description} | Recuperar Contraseña`,
};

export default function RecoveryPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
