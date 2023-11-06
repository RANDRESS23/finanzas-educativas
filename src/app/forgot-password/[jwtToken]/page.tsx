import ChangePasswordGif from "@/app/forgot-password/gifs/ChangePassword.gif";
import ChangePasswordGifDark from "@/app/forgot-password/gifs/ChangePassword-dark.gif";
import NotFound from "@/app/not-found";
import Title from "@/components/Title";
import Jwt from "jsonwebtoken";
import Image from "next/image";
import FormChangePsw from "./FormChangePsw";
import { type TPayload } from "@/types/TPayload";

export default async function PasswordChanger({
  params: { jwtToken },
}: {
  params: { jwtToken: string };
}): Promise<React.ReactElement> {
  try {
    const payload = Jwt.verify(
      jwtToken,
      process.env.secret || "secretkey"
    ) as TPayload;

    return (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 pb-12 lg:px-8 mb-10 py-20">
        <div className="sm:mx-auto sm:w-full sm:max-w-xl md:max-w-3xl">
          <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight">
            Cambiar contraseña de {payload.email} en{" "}
            <Title text="¡Finanzas Educativas!" isTextStatic />
          </h2>
        </div>
        <div className="flex justify-center items-center gap-16 mt-5">
          <div className="lg:flex lg:justify-center lg:items-center hidden">
            <Image
              className="dark:hidden rounded-xl"
              width={400}
              height={400}
              src={ChangePasswordGif}
              alt=""
            />
            <Image
              className="hidden dark:block rounded-xl"
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
    return <NotFound />;
  }
}
