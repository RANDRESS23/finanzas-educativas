import Image from "next/image";
import SignUpGif from "./gifs/signUp.gif";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import Title from "@/components/Title";
import FormSignUp from "./FormSignUp";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Finanzas Educativas | Registrarse",
};

async function Signup() {
  const session = await getServerSession();

  if (session !== null && session?.user?.email !== "admin@gmail.com") {
    return redirect("/profile/user");
  } else if (session !== null && session?.user?.email === "admin@gmail.com") {
    return redirect("/profile/admin");
  }

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 pb-12 lg:px-8 mb-10 py-20">
        <div className="sm:mx-auto sm:w-full sm:max-w-xl md:max-w-3xl">
          <h2 className="mt-3 text-center text-4xl md:text-3xl font-bold leading-9 tracking-tight text-gray-900">
            Registrarse en <Title text="¡Finanzas Educativas!" isTextStatic />
          </h2>
        </div>

        <div className="mt-4 flex gap-10 sm:mx-auto sm:w-full sm:max-w-xl md:max-w-6xl">
          <div className="hidden md:block">
            <div>
              <Image width={500} height={500} src={SignUpGif} alt="" />
            </div>
          </div>
          <FormSignUp />
        </div>
      </div>

      <div className="mt-4 flex gap-10 sm:mx-auto sm:w-full sm:max-w-xl md:max-w-6xl">
        <div className="hidden md:block">
          <div>
            <Image width={500} height={500} src={SignUpGif} alt="" />
          </div>
        </div>
        <FormSignUp />
      </div>
    </div>
  );
}

export default Signup;
