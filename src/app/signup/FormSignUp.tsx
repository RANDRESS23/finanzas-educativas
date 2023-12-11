"use client";

import pkg from "@/../package.json";
import InputShowPsw from "@/components/ChkbxPsw";
import Input from "@/components/Input";
import InputSelect from "@/components/InputSelect";
import api from "@/libs/api";
import { tosty } from "@/libs/tosty";
import { signIn } from "next-auth/react";
import { useRouter } from "next-nprogress-bar";
import Link from "next/link";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { LiaSignInAltSolid as SignupIcon } from "react-icons/lia";

export default function FormSignUp() {
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

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    setIsLoading(true);

    try {
      const response = await api.post("/user", data);

      if (response.status === 201) {
        tosty.success("Te registraste exitosamente!");

        const response = await signIn("credentials", {
          document: data.document,
          password: data.password,
          redirect: false,
        });

        if (response?.error !== null) {
          return tosty.error("Datos incorrectos o usuario deshabilitado.");
        }

        if (response?.ok) {
          router.refresh();
          reset();
          return router.push("/profile/user");
        }
      }

      tosty.error("Error al registrarse!");
    } catch (error: any) {
      if (error.response.data !== undefined) {
        const errorsMessages = Object.values(error.response.data);
        let errorsMessagesString = "";

        errorsMessages.forEach((message: any) => {
          errorsMessagesString += `🔸 ${message} ${"\n"}`;
        });

        return tosty.error(errorsMessagesString, {
          options: { className: "text-center" },
        });
      }

      console.error({ error });
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
                selectProps={{ id: "documentType" }}
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
                inputProps={{
                  id: "document",
                  type: "text",
                  placeholder: "0000000000",
                }}
                label="Número de Identificación"
                register={register}
                errors={errors}
              />
            </div>

            <div className="sm:col-span-3">
              <Input
                inputProps={{
                  id: "firstName",
                  type: "text",
                  placeholder: "John",
                }}
                label="Nombres"
                register={register}
                errors={errors}
              />
            </div>

            <div className="sm:col-span-3">
              <Input
                inputProps={{
                  id: "lastName",
                  type: "text",
                  placeholder: "Doe",
                }}
                label="Apellidos"
                register={register}
                errors={errors}
              />
            </div>

            <div className="sm:col-span-3">
              <Input
                inputProps={{
                  id: "phoneNumber",
                  type: "tel",
                  placeholder: "3XX XXX XXXX",
                }}
                label="Celular"
                register={register}
                errors={errors}
              />
            </div>

            <div className="sm:col-span-3">
              <Input
                inputProps={{
                  id: "email",
                  type: "email",
                  placeholder: "johndoe@finanzas-educativas.com",
                  autoComplete: "username",
                }}
                label="Correo Electrónico"
                register={register}
                errors={errors}
              />
            </div>

            <div className="sm:col-span-3">
              <Input
                inputProps={{
                  id: "password",
                  type: passwordVisible ? "text" : "password",
                  placeholder: "•••••••••",
                  autoComplete: "new-password",
                }}
                label="Contraseña"
                register={register}
                errors={errors}
              />
            </div>

            <div className="sm:col-span-3">
              <Input
                inputProps={{
                  id: "confirmPassword",
                  type: passwordVisible ? "text" : "password",
                  placeholder: "•••••••••",
                  autoComplete: "new-password",
                }}
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
                  id="legalInformation"
                  name="legalInformation"
                  type="checkbox"
                  className="h-6 w-6 rounded-md bg-white dark:bg-slate-900 border-gray-300 dark:border-gray-400 text-boston-blue-600 dark:text-boston-blue-600 focus:ring-boston-blue-600 dark:focus:ring-boston-blue-600 cursor-pointer disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:checked:bg-boston-blue-600/60 dark:disabled:checked:bg-boston-blue-600/60 checked:bg-boston-blue-600 dark:checked:bg-boston-blue-600 dark:disabled:opacity-70 hover:border-gray-400 dark:hover:border-gray-300 disabled:cursor-not-allowed"
                  checked={termsAccepted}
                  onChange={() => {
                    setTermsAccepted(!termsAccepted);
                  }}
                />
              </div>
              <div className="leading-6">
                <label htmlFor="legalInformation" className="font-medium">
                  He leído y acepto los Términos Legales y la Política de
                  Privacidad de {pkg.description}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-x-6">
        <button
          type="submit"
          className="rounded-md px-10 py-2 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 duration-300 bg-boston-blue-600 hover:bg-sushi-500 disabled:opacity-50 flex items-center justify-center gap-x-1 disabled:cursor-not-allowed enabled:active:bg-sushi-400"
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
          className="font-semibold leading-6 text-boston-blue-600 hover:text-sushi-500 active:text-sushi-400"
        >
          Iniciar Sesión
        </Link>
      </p>
    </form>
  );
}
