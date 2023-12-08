import pkg from "@/../package.json";
import FA2Container from "@/components/FA2/FA2Container";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import Overflow from "@/components/Overflow";
import ProgressProvider from "@/context/ProgressProvider";
import SessionProviderContext from "@/providers/SessionProvider";
import ThemeProvider from "@/providers/ThemeProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import { type Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  applicationName: pkg.description,
  title: "Finanzas Educativas | Bienvenidos",
  generator: "Next JS",
  creator: pkg.publisher,
  publisher: pkg.publisher,
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
      <head>
        <link
          rel="shortcut icon"
          href="/icono_finanzas_educativas.ico"
          type="image/x-icon"
        />
      </head>
      <body>
        <ProgressProvider>
          <ThemeProvider>
            <Overflow />

            <FA2Container />

            <SessionProviderContext>
              <NavBar />
              <ToasterProvider />

              <main>{children}</main>

              <Footer />
            </SessionProviderContext>
          </ThemeProvider>
        </ProgressProvider>
      </body>
    </html>
  );
}
