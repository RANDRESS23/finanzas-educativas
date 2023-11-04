"use client";

import Input from "@/components/Input";
import InputShowPsw from "@/components/inputShowPsw";
import api from "@/libs/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { MdOutlineChangeCircle as ChangeIcon } from "react-icons/md";

const FormChangePsw: React.FC<{ jwtToken: string }> = ({ jwtToken }) => {
  const router = useRouter();
  const goBack = () => router.back();

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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);

      const response = await api.patch("/security/forgot-password", {
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
        <Input
          name="password"
          type={passwordVisible ? "text" : "password"}
          label="Nueva contraseña"
          register={register}
          errors={errors}
        />
      </div>
      <div className="mb-2">
        <Input
          name="confirmPassword"
          type={passwordVisible ? "text" : "password"}
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
        className="rounded-md px-10 py-2 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 duration-300 bg-boston-blue-600 hover:bg-sushi-500 disabled:opacity-50 w-full flex items-center justify-center gap-x-1 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        <ChangeIcon />
        {isLoading ? "CARGANDO..." : "CONTINUAR"}
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

export default FormChangePsw;
