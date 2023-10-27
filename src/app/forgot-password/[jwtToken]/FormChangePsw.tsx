"use client";

import api from "@/libs/api";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

const FormChangePsw: React.FC<{ jwtToken: string }> = ({ jwtToken }) => {
  const goBack = useRouter().back;

  const [isLoading, setIsLoading] = useState(false);

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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);

      const response = await api.post("/security/forgot-password", {
        password: data.password,
        confirmPassword: data.confirmPassword,
        jwtToken,
      });

      if (response.status !== 201) {
        toast.error(
          "Ha ocurrido un error al cambiar la contraseña, intente nuevamente más tarde."
        );
        return;
      }

      toast.success("Su contraseña ha sido cambiada exitosamente");
      reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        console.log({ errorMessage: error.response?.data.message });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <!-- Username Input --> */}
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block font-medium leading-6 text-gray-900"
        >
          Nueva contraseña
        </label>
        <input
          type="password"
          id="password"
          {...register("password", {
            required: "La contraseña es un campo obligatorio!",
          })}
          className={`block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-[#008aae] sm:max-w-xs"
                autoComplete="off
                ${
                  errors.password !== undefined
                    ? "ring-rose-500"
                    : "border-gray-300"
                }}
                ${
                  errors.password !== undefined
                    ? "focus:outline-rose-500"
                    : "focus:outline-[#008aae]"
                }`}
        />
        {errors.password !== undefined && (
          <p className="mt-2 text-sm text-rose-500">
            {errors.password.message as any}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="confirmPassword"
          className="block font-medium leading-6 text-gray-900"
        >
          Confirmar nueva contraseña
        </label>
        <input
          type="password"
          id="confirmPassword"
          {...register("confirmPassword", {
            required: "La contraseña es un campo obligatorio!",
          })}
          className={`block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-[#008aae] sm:max-w-xs"
                autoComplete="off
                ${
                  errors.confirmPassword !== undefined
                    ? "ring-rose-500"
                    : "border-gray-300"
                }}
                ${
                  errors.confirmPassword !== undefined
                    ? "focus:outline-rose-500"
                    : "focus:outline-[#008aae]"
                }`}
        />
        {errors.confirmPassword !== undefined && (
          <p className="mt-2 text-sm text-rose-500">
            {errors.confirmPassword.message as any}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="rounded-md px-10 py-2 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 duration-300 bg-[#008aae] hover:bg-[#79ad34] disabled:opacity-50 w-full"
        disabled={isLoading}
      >
        {isLoading ? "CARGANDO..." : "CONTINUAR"}
      </button>

      <button
        type="button"
        onClick={goBack}
        className=" my-3 text-sm leading-6 text-[#008aae] hover:text-[#79ad34]"
      >
        Volver atrás
      </button>
    </form>
  );
};

export default FormChangePsw;
