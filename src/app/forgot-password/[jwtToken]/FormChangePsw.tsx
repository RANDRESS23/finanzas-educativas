"use client";

import InputShowPsw from "@/components/ChkbxPsw";
import Input from "@/components/Input";
import api from "@/libs/api";
import { tosty } from "@/libs/tosty";
import { type TPayload } from "@/types/TPayload";
import Link from "next/link";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { MdOutlineChangeCircle as ChangeIcon } from "react-icons/md";

interface IParams {
  jwtToken: string;
  payload: TPayload;
}

export default function FormChangePsw({ jwtToken, payload }: IParams) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    setIsLoading(true);

    try {
      const response = await api.patch("/security/forgot-password", {
        password: data.password,
        confirmPassword: data.confirmPassword,
        jwtToken,
      });

      if (response.status !== 201) {
        tosty.error(
          "Ha ocurrido un error al cambiar la contraseña, intente nuevamente más tarde.",
        );
        return;
      }

      tosty.success("Su contraseña ha sido cambiada exitosamente");
      router.refresh();
      router.push("/signin");
      reset();
    } catch (error: any) {
      if (error.response.data !== undefined) {
        const errorsMessages = Object.values(error.response.data);
        let errorsMessagesString = "";

        errorsMessages.forEach((message: any) => {
          errorsMessagesString += `🔸 ${message} ${"\n"}`;
        });

        return tosty.error(errorsMessagesString);
      }

      console.error({ error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="hidden">
        <label htmlFor="username">Nombre de usuario:</label>
        <input
          type="text"
          id="username"
          name="username"
          autoComplete="username"
          defaultValue={payload.email}
        />
      </div>
      {/* hidden field for accesibility */}

      <div className="mb-4">
        <Input
          inputProps={{
            id: "password",
            type: passwordVisible ? "text" : "password",
            placeholder: "•••••••••",
            autoComplete: "new-password",
          }}
          label="Nueva contraseña"
          register={register}
          errors={errors}
        />
      </div>
      <div className="mb-2">
        <Input
          inputProps={{
            id: "confirmPassword",
            type: passwordVisible ? "text" : "password",
            placeholder: "•••••••••",
            autoComplete: "new-password",
          }}
          label="Confirmar nueva contraseña"
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

      <button
        type="submit"
        className="rounded-md px-10 py-2 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 duration-300 bg-boston-blue-600 hover:bg-sushi-500 disabled:opacity-50 w-full flex items-center justify-center gap-x-1 disabled:cursor-not-allowed enabled:active:bg-sushi-400"
        disabled={isLoading}
      >
        <ChangeIcon />
        {isLoading ? "CARGANDO..." : "CONTINUAR"}
      </button>

      <Link
        href="/"
        className=" my-3 text-sm leading-6 text-boston-blue-600 hover:text-sushi-500 active:text-sushi-400"
      >
        Ir al inicio
      </Link>
    </form>
  );
}
