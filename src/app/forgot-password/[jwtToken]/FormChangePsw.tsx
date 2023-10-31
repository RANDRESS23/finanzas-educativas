"use client";

import api from "@/libs/api";
import clsxe from "@/libs/clsxe";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { MdOutlineChangeCircle as ChangeIcon } from "react-icons/md";

const FormChangePsw: React.FC<{ jwtToken: string }> = ({ jwtToken }) => {
  const router = useRouter();
  const goBack = () => router.back();

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

        toast.error(errorsMessagesString, { className: "text-center" });
      } else {
        console.log({ error });
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
          className={clsxe(errors.password)}
          autoComplete="off"
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
          className={clsxe(errors.confirmPassword)}
          autoComplete="off"
        />
        {errors.confirmPassword !== undefined && (
          <p className="mt-2 text-sm text-rose-500">
            {errors.confirmPassword.message as any}
          </p>
        )}
      </div>

      <button
        type="submit"
        className={clsx(
          "rounded-md px-10 py-2 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 duration-300 bg-[#008aae] hover:bg-[#79ad34] disabled:opacity-50 w-full flex items-center justify-center gap-x-1",
          { "cursor-not-allowed": isLoading }
        )}
        disabled={isLoading}
      >
        <ChangeIcon />
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
