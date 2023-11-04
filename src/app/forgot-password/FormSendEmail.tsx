"use client";

import Input from "@/components/Input";
import api from "@/libs/api";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { SiMinutemailer as SendIcon } from "react-icons/si";

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
      <div className="mb-4">
        <Input
          name="email"
          type="email"
          label="Correo electrónico de registro"
          register={register}
          errors={errors}
        />
      </div>

      <button
        type="submit"
        className="rounded-md px-10 py-2 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 duration-300 bg-boston-blue-600 hover:bg-sushi-500 disabled:opacity-50 w-full flex items-center justify-center gap-x-1 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        <SendIcon />
        {isLoading ? "ENVIANDO..." : "ENVIAR"}
      </button>

      <button
        type="button"
        onClick={goBack}
        className=" my-3 text-sm leading-6 text-boston-blue-600 hover:text-sushi-500"
      >
        Volver atrás
      </button>
    </form>
  );
};

export default FormSendEmail;
