import Image from "next/image";
import Link from "next/link";
import SignInGif from "./gifs/signIn.gif";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import Title from "@/components/Title";
import FormSignIn from "./FormSignIn";

export default async function Signin() {
  const session = await getServerSession();

  if (session !== null && session?.user?.email !== "admin@gmail.com") {
    return redirect("/profile/user");
  } else if (session !== null && session?.user?.email === "admin@gmail.com") {
    return redirect("/profile/admin");
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 pb-12 lg:px-8 mb-10 py-20">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl md:max-w-3xl">
        <h2 className="mt-3 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
          Iniciar sesion en <Title text="¡Finanzas Educativas!" isTextStatic />
        </h2>
      </div>
      <div className="flex justify-center items-center gap-16 mt-4">
        <div className="lg:flex lg:justify-center lg:items-center hidden">
          <Image width={400} height={400} src={SignInGif} alt="" />
        </div>
        <div className="border-b border-gray-900/10 pb-12 w-80">
          <FormSignIn />
          <p className="mt-6 text-center text-gray-500">
            ¿No estás registrado?{" "}
            <Link
              href="/signup"
              className="font-semibold leading-6 text-[#008aae] hover:text-[#79ad34]"
            >
              Registrarme
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
