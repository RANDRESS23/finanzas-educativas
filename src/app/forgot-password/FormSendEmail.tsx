"use client";

import api from "@/libs/api";
import clsxe from "@/libs/clsxe";
import { AxiosError } from "axios";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

const FormSendEmail: React.FC = () => {
  const goBack = useRouter().back;

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: { email: "" } });

  const onSubmit: SubmitHandler<FieldValues> = async ({ email }) => {
    try {
      setIsLoading(true);

      const response = await api(`/security/forgot-password/${email}`);

      if (response.status !== 201) {
        toast.error("Ha ocurrido un error al enviar el correo electrónico");
        return;
      }

      toast.success(
        `Hemos enviado a ${email} un link para recuperar tu contraseña.`
      );
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
          htmlFor="email"
          className="block font-medium leading-6 text-gray-900"
        >
          Correo electrónico de registro
        </label>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: "Por favor ingresa el correo electrónico de registro!",
          })}
          className={clsxe(errors.email)}
        />
        {errors.email !== undefined && (
          <p className="my-2 text-sm text-rose-500">
            {errors.email.message as any}
          </p>
        )}
      </div>

      <button
        type="submit"
        className={clsx(
          "rounded-md px-10 py-2 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 duration-300 bg-[#008aae] hover:bg-[#79ad34] disabled:opacity-50 w-full",
          { "cursor-not-allowed": isLoading }
        )}
        disabled={isLoading}
      >
        {isLoading ? "ENVIANDO..." : "ENVIAR"}
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

export default FormSendEmail;
