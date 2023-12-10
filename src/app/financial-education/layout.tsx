import pkg from "@/../package.json";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: `${pkg.description} | Educación Financiera`,
};

export default function FinancialEducationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
