"use client";

import Input from "@/components/Input";
import InputShowPsw from "@/components/inputShowPsw";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { PiSignIn as SignInIcon } from "react-icons/pi";

export default function FormSignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      document: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);

      const response = await signIn("credentials", {
        document: data.document,
        password: data.password,
        redirect: false,
      });

      if (response?.error !== null) {
        return toast.error("Datos incorrectos!");
      }

      if (response?.ok) {
        if (data.document === "0000000000") {
          toast.success("Admin logueado!");
          router.refresh();
          router.push("/profile/admin");
          reset();
        } else {
          toast.success("Usuario logueado!");
          router.refresh();
          router.push("/profile/user");
          reset();
        }
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log({ errorMessage: error.response.data.message });
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <Input
          name="document"
          type="text"
          label="Número de Identificación"
          register={register}
          errors={errors}
        />
      </div>

      <div className="mb-1">
        <Input
          name="password"
          type={passwordVisible ? "text" : "password"}
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
          className="leading-6 text-boston-blue-600 hover:text-sushi-500"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </p>
      <button
        type="submit"
        className="rounded-md px-10 py-2 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 duration-300 bg-boston-blue-600 hover:bg-sushi-500 disabled:opacity-50 w-full flex items-center justify-center gap-x-1 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        <SignInIcon />
        {isLoading ? "CARGANDO..." : "INGRESAR"}
      </button>
    </form>
  );
}
