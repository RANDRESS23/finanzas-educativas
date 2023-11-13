"use client";

import InputShowPsw from "@/components/ChkbxPsw";
import Input from "@/components/Input";
import useStart2FAAuth from "@/hooks/userStart2FAAuth";
import { tosty } from "@/libs/tosty";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { LiaFingerprintSolid as FingerPrintIcon } from "react-icons/lia";
import { PiSignIn as SignInIcon } from "react-icons/pi";

export default function FormSignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const router = useRouter();
  const { isLoadingAuth, start2FAAuth } = useStart2FAAuth();

  const defaultValues = {
    document: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<FieldValues>({ defaultValues });

  const formValues = watch() as typeof defaultValues;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      const response = await signIn("credentials", {
        document: data.document,
        password: data.password,
        redirect: false,
      });

      if (response?.error !== null) {
        return tosty.error("Datos incorrectos!");
      }

      if (response?.ok) {
        if (data.document === "0000000000") {
          tosty.success("Admin logueado!");
          router.refresh();
          router.push("/profile/admin");
          reset();
        } else {
          tosty.success("Usuario logueado!");
          router.refresh();
          router.push("/profile/user");
          reset();
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        tosty.error(error.message);
        console.error({ error });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <Input
          inputProps={{
            id: "document",
            type: "text",
            placeholder: "0000000000",
            autoComplete: "username",
          }}
          label="Número de Identificación"
          register={register}
          errors={errors}
        />
      </div>

      <div className="mb-1">
        <Input
          inputProps={{
            id: "password",
            type: passwordVisible ? "text" : "password",
            placeholder: "•••••••••",
            autoComplete: "current-password",
          }}
          label="Contraseña"
          register={register}
          errors={errors}
        />
      </div>
      <div className="mb-4 flex items-center">
        <InputShowPsw
          set={setPasswordVisible}
          checked={passwordVisible}
          isLoading={isLoading}
        />
      </div>
      <p className="mb-6 text-sm">
        <Link
          href="/forgot-password"
          className="leading-6 text-boston-blue-600 hover:text-sushi-500 active:text-sushi-400"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </p>
      <button
        type="submit"
        className="rounded-md px-10 py-2 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 duration-300 bg-boston-blue-600 hover:bg-sushi-500 disabled:opacity-50 w-full flex items-center justify-center gap-x-1 disabled:cursor-not-allowed enabled:active:bg-sushi-400 mb-2"
        disabled={isLoading}
      >
        <SignInIcon className="text-2xl" />
        {isLoading ? "CARGANDO..." : "INGRESAR"}
      </button>
      <button
        type="button"
        className="rounded-md px-10 py-2 font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 duration-300 bg-zinc-300 dark:bg-zinc-400 dark:text-slate-900 enabled:hover:bg-sushi-500 dark:enabled:hover:text-white enabled:hover:text-white disabled:opacity-50 w-full flex items-center justify-center gap-x-1 disabled:cursor-not-allowed"
        onClick={() => start2FAAuth(formValues.document)}
        disabled={isLoadingAuth || !formValues.document}
      >
        <FingerPrintIcon className="text-2xl" />
        {isLoadingAuth ? "CARGANDO..." : "WEBAUTHN"}
      </button>
    </form>
  );
}
