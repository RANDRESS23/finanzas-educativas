"use client";

import Input from "@/components/Input";
import InputSelect from "@/components/InputSelect";
import InputShowPsw from "@/components/inputShowPsw";
import api from "@/libs/api";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { LiaSignInAltSolid as SignupIcon } from "react-icons/lia";

export default function FormSignUp(): React.ReactNode {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      documentType: "cedula_ciudadania",
      document: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);

      const response = await api.post("/user", data);

      if (response.status === 201) {
        toast.success("Te registraste exitosamente!");

        const response = await signIn("credentials", {
          document: data.document,
          password: data.password,
          redirect: false,
        });

        if (response?.error !== null) {
          return toast.error("Datos incorrectos!");
        }

        if (response?.ok) {
          router.refresh();
          router.push("/profile/user");
          reset();
        }
      } else toast.error("Error al registrarse!");
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
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 dark:border-zinc-200/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <InputSelect
                name="documentType"
                label="Tipo de Documento"
                register={register}
                errors={errors}
                options={[
                  { value: "cedula_ciudadania", label: "Cédula de Ciudadanía" },
                  {
                    value: "cedula_extranjeria",
                    label: "Cédula de Extranjería",
                  },
                ]}
              />
            </div>

            <div className="sm:col-span-3">
              <Input
                name="document"
                type="text"
                label="Número de Identificación"
                register={register}
                errors={errors}
              />
            </div>

            <div className="sm:col-span-3">
              <Input
                name="firstName"
                type="text"
                label="Nombres"
                register={register}
                errors={errors}
              />
            </div>

            <div className="sm:col-span-3">
              <Input
                name="lastName"
                type="text"
                label="Apellidos"
                register={register}
                errors={errors}
              />
            </div>

            <div className="sm:col-span-3">
              <Input
                name="phoneNumber"
                type="tel"
                label="Celular"
                register={register}
                errors={errors}
              />
            </div>

            <div className="sm:col-span-3">
              <Input
                name="email"
                type="email"
                label="Correo Electrónico"
                register={register}
                errors={errors}
              />
            </div>

            <div className="sm:col-span-3">
              <Input
                name="password"
                type={passwordVisible ? "text" : "password"}
                label="Contraseña"
                register={register}
                errors={errors}
              />
            </div>

            <div className="sm:col-span-3">
              <Input
                name="confirmPassword"
                type={passwordVisible ? "text" : "password"}
                label="Confirmar Contraseña"
                register={register}
                errors={errors}
              />
            </div>

            <div className="sm:col-span-3 -my-5">
              <InputShowPsw
                set={setPasswordVisible}
                checked={passwordVisible}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 dark:border-zinc-200/10 pb-12">
          <div className="mt-10 space-y-10">
            <div className="relative flex justify-center items-center gap-x-3">
              <div className="flex h-6 items-center">
                <input
                  id="terminos"
                  name="terminos"
                  type="checkbox"
                  className="h-6 w-6 accent-boston-blue-600 cursor-pointer bg-zinc-50 dark:bg-slate-800 disabled:cursor-not-allowed"
                  checked={termsAccepted}
                  onChange={() => {
                    setTermsAccepted(!termsAccepted);
                  }}
                />
              </div>
              <div className="leading-6">
                <label htmlFor="terminos" className="font-medium">
                  He leído y acepto los Términos Legales y la Política de
                  Privacidad de Finanzas Educativas
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-x-6">
        <button
          type="submit"
          className="rounded-md px-10 py-2 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 duration-300 bg-boston-blue-600 hover:bg-sushi-500 disabled:opacity-50 flex items-center justify-center gap-x-1 disabled:cursor-not-allowed"
          disabled={!termsAccepted || isLoading}
        >
          <SignupIcon />
          {isLoading ? "CARGANDO..." : "REGISTRARME"}
        </button>
      </div>
      <p className="mt-10 text-center text-gray-500">
        ¿Ya estás registrado?{" "}
        <Link
          href="/signin"
          className="font-semibold leading-6 text-boston-blue-600 hover:text-sushi-500"
        >
          Iniciar Sesión
        </Link>
      </p>
    </form>
  );
}
