import pkg from "@/../package.json";
import ChangePasswordGifDark from "@/app/forgot-password/gifs/ChangePassword-dark.gif";
import ChangePasswordGif from "@/app/forgot-password/gifs/ChangePassword.gif";
import Title from "@/components/Title";
import type { TPayload } from "@/types/TPayload";
import Jwt from "jsonwebtoken";
import Image from "next/image";
import { notFound } from "next/navigation";
import FormChangePsw from "./FormChangePsw";

interface IParams {
  params: { jwtToken: string };
}

export default async function PasswordChanger({
  params: { jwtToken },
}: IParams) {
  try {
    const payload = Jwt.verify(
      jwtToken,
      process.env.NEXTAUTH_SECRET!,
    ) as TPayload;

    return (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 pb-12 lg:px-8 mb-10 py-20">
        <div className="sm:mx-auto sm:w-full sm:max-w-xl md:max-w-3xl">
          <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight">
            Cambiar contraseña de {payload.email} en{" "}
            <Title text={`¡${pkg.description}!`} isTextStatic />
          </h2>
        </div>
        <div className="flex justify-center items-center gap-16 mt-5">
          <div className="lg:flex lg:justify-center lg:items-center hidden">
            <Image
              className="dark:hidden rounded-xl -z-50"
              width={400}
              height={400}
              src={ChangePasswordGif}
              alt=""
            />
            <Image
              className="hidden dark:block rounded-xl -z-50"
              width={400}
              height={400}
              src={ChangePasswordGifDark}
              alt=""
            />
          </div>
          <div className="border-b border-gray-900/10 pb-12 w-80">
            <FormChangePsw jwtToken={jwtToken} payload={payload} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
