import Title from "@/components/Title";
import { type Metadata } from "next";
import Image from "next/image";
import FormContact from "./FormContact";
import ContactUsGif from "./gifs/ContactUs.gif";
import ContactUsGifDark from "./gifs/ContactUs-dark.gif";

export const metadata: Metadata = {
  title: "Finanzas Educativas | Contáctanos",
};

export default function Contact(): React.ReactNode {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 pb-12 lg:px-8 mb-10 py-20">
        <div className="sm:mx-auto sm:w-full sm:max-w-xl md:max-w-3xl">
          <h2 className="mt-3 text-center text-3xl font-bold leading-9 tracking-tight">
            Contactar con el equipo de{" "}
            <Title text="¡Finanzas Educativas!" isTextStatic />
          </h2>
        </div>
        <div className="flex justify-center items-center gap-16 mt-7">
          <div className="lg:flex lg:justify-center lg:items-center hidden">
            <Image
              className="dark:hidden rounded-xl -z-50"
              width={400}
              height={400}
              src={ContactUsGif}
              alt=""
            />
            <Image
              className="hidden dark:block rounded-xl -z-50"
              width={400}
              height={400}
              src={ContactUsGifDark}
              alt=""
            />
          </div>
          <div className="pb-12 w-80">
            <FormContact />
          </div>
        </div>
      </div>
    </>
  );
}
