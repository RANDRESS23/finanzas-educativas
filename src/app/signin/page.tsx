import Title from "@/components/Title";
import { type Metadata } from "next";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authOptions } from "@/libs/authOptions";
import FormSignIn from "./FormSignIn";
import SignInGifDark from "./gifs/signIn-dark.gif";
import SignInGif from "./gifs/signIn.gif";

export const metadata: Metadata = {
  title: "Finanzas Educativas | Iniciar Sesión",
};

export default async function Signin() {
  const session = await getServerSession(authOptions);

  if (session !== null && session?.user?.email !== "admin@gmail.com") {
    redirect("/profile/user");
  } else if (session !== null && session?.user?.email === "admin@gmail.com") {
    redirect("/profile/admin");
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 pb-12 lg:px-8 mb-10 py-20">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl md:max-w-3xl">
        <h2 className="mt-3 text-center text-3xl font-bold leading-9 tracking-tight">
          Iniciar sesion en <Title text="¡Finanzas Educativas!" isTextStatic />
        </h2>
      </div>
      <div className="flex justify-center items-center gap-16 mt-4">
        <div className="lg:flex lg:justify-center lg:items-center hidden">
          <Image
            className="dark:hidden rounded-xl -z-50"
            width={400}
            height={400}
            src={SignInGif}
            alt=""
          />
          <Image
            className="hidden dark:block rounded-xl -z-50"
            width={400}
            height={400}
            src={SignInGifDark}
            alt=""
          />
        </div>
        <div className="border-b border-gray-900/10 pb-12 w-80">
          <FormSignIn />
          <p className="mt-6 text-center text-gray-500 dark:text-gray-300">
            ¿No estás registrado?{" "}
            <Link
              href="/signup"
              className="font-semibold leading-6 text-boston-blue-600 hover:text-sushi-500 active:text-sushi-400"
            >
              Registrarme
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
