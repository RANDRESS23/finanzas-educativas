import pkg from "@/../package.json";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar";
import SessionProviderContext from "@/providers/SessionProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import { type Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finanzas Educativas | Bienvenidos",
  generator: "Next JS",
  creator: "ITFIP Development Team",
  publisher: "ITFIP Development Team",
  description: pkg.description,
  keywords: pkg.keywords,
  authors: pkg.contributors,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={oswald.className}>
      <body>
        <SessionProviderContext>
          <NavBar />
          <ToasterProvider />

          <div>{children}</div>

          <Footer />
        </SessionProviderContext>
      </body>
    </html>
  );
}
