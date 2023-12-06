"use client";

import Input from "@/components/Input";
import api from "@/libs/api";
import { tosty } from "@/libs/tosty";
import { isAxiosError } from "axios";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { SiMinutemailer as SendIcon } from "react-icons/si";

export default function FormSendEmail() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: { email: "" } });

  const onSubmit: SubmitHandler<FieldValues> = async ({ email }) => {
    setIsLoading(true);

    try {
      const response = await api(`/security/forgot-password/${email}`);

      if (response.status !== 201) {
        tosty.error("Ha ocurrido un error al enviar el correo electrónico");
        return;
      }

      tosty.success(
        `Hemos enviado a ${email} un link para recuperar tu contraseña.`,
      );
      reset();
    } catch (error) {
      if (isAxiosError(error)) {
        tosty.error(error.response?.data.message);
      }

      console.error({ error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <Input
          inputProps={{
            id: "email",
            type: "email",
            placeholder: "johndoe@finanzas-educativas.com",
            autoComplete: "username",
          }}
          label="Correo electrónico de registro"
          register={register}
          errors={errors}
        />
      </div>

      <button
        type="submit"
        className="rounded-md px-10 py-2 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 duration-300 bg-boston-blue-600 hover:bg-sushi-500 disabled:opacity-50 w-full flex items-center justify-center gap-x-1 disabled:cursor-not-allowed enabled:active:bg-sushi-400"
        disabled={isLoading}
      >
        <SendIcon />
        {isLoading ? "ENVIANDO..." : "ENVIAR"}
      </button>

      <button
        type="button"
        onClick={() => router.back()}
        className="my-3 text-sm leading-6 text-boston-blue-600 hover:text-sushi-500 active:text-sushi-400"
      >
        Volver atrás
      </button>
    </form>
  );
}
