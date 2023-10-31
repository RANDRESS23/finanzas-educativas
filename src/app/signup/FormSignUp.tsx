"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import api from "@/libs/api";

export default function FormSignUp(): React.ReactNode {
  const [termsAccepted, setTermsAccepted] = useState(false);
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
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="documentType"
                className="block font-medium leading-6 text-gray-900"
              >
                Tipo de Documento
              </label>
              <div className="mt-2">
                <select
                  id="documentType"
                  {...register("documentType", {
                    required: "El tipo de documento es un campo obligatorio!",
                  })}
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-[#008aae] sm:max-w-xs"
                >
                  <option value="cedula_ciudadania">
                    Cédula de Ciudadanía
                  </option>
                  <option value="cedula_extranjeria">
                    Cédula de Extranjería
                  </option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="document"
                className="block font-medium leading-6 text-gray-900"
              >
                Número de Identificación
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="document"
                  {...register("document", {
                    required:
                      "El número de identificación es un campo obligatorio!",
                  })}
                  className={`block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-[#008aae]
                        ${
                          errors.document !== undefined
                            ? "ring-rose-500"
                            : "border-gray-300"
                        }}
                        ${
                          errors.document !== undefined
                            ? "focus:outline-rose-500"
                            : "focus:outline-[#008aae]"
                        }`}
                />
              </div>
              {errors.document !== undefined && (
                <p className="mt-2 text-sm text-rose-500">
                  {errors.document.message as any}
                </p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="firstName"
                className="block font-medium leading-6 text-gray-900"
              >
                Nombres
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="firstName"
                  {...register("firstName", {
                    required: "Los nombres son un campo obligatorio!",
                  })}
                  className={`block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-[#008aae]
                        ${
                          errors.firstName !== undefined
                            ? "ring-rose-500"
                            : "border-gray-300"
                        }}
                        ${
                          errors.firstName !== undefined
                            ? "focus:outline-rose-500"
                            : "focus:outline-[#008aae]"
                        }`}
                />
              </div>
              {errors.firstName !== undefined && (
                <p className="mt-2 text-sm text-rose-500">
                  {errors.firstName.message as any}
                </p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="lastName"
                className="block font-medium leading-6 text-gray-900"
              >
                Apellidos
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="lastName"
                  {...register("lastName", {
                    required: "Los apellidos son un campo obligatorio!",
                  })}
                  className={`block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-[#008aae]
                        ${
                          errors.lastName !== undefined
                            ? "ring-rose-500"
                            : "border-gray-300"
                        }}
                        ${
                          errors.lastName !== undefined
                            ? "focus:outline-rose-500"
                            : "focus:outline-[#008aae]"
                        }`}
                />
              </div>
              {errors.lastName !== undefined && (
                <p className="mt-2 text-sm text-rose-500">
                  {errors.lastName.message as any}
                </p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="phoneNumber"
                className="block font-medium leading-6 text-gray-900"
              >
                Celular
              </label>
              <div className="mt-2">
                <input
                  type="tel"
                  id="phoneNumber"
                  {...register("phoneNumber", {
                    required: "El número de teléfono es un campo obligatorio!",
                  })}
                  className={`block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-[#008aae]
                        ${
                          errors.phoneNumber !== undefined
                            ? "ring-rose-500"
                            : "border-gray-300"
                        }}
                        ${
                          errors.phoneNumber !== undefined
                            ? "focus:outline-rose-500"
                            : "focus:outline-[#008aae]"
                        }`}
                />
              </div>
              {errors.phoneNumber !== undefined && (
                <p className="mt-2 text-sm text-rose-500">
                  {errors.phoneNumber.message as any}
                </p>
              )}
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block font-medium leading-6 text-gray-900"
              >
                Correo Electrónico
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "El correo electrónico es un campo obligatorio!",
                  })}
                  className={`block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-[#008aae]
                        ${
                          errors.email !== undefined
                            ? "ring-rose-500"
                            : "border-gray-300"
                        }}
                        ${
                          errors.email !== undefined
                            ? "focus:outline-rose-500"
                            : "focus:outline-[#008aae]"
                        }`}
                />
              </div>
              {errors.email !== undefined && (
                <p className="mt-2 text-sm text-rose-500">
                  {errors.email.message as any}
                </p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="password"
                className="block font-medium leading-6 text-gray-900"
              >
                Contraseña
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  id="password"
                  {...register("password", {
                    required: "La contraseña es un campo obligatorio!",
                  })}
                  className={`block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-[#008aae]
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
              </div>
              {errors.password !== undefined && (
                <p className="mt-2 text-sm text-rose-500">
                  {errors.password.message as any}
                </p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="confirmPassword"
                className="block font-medium leading-6 text-gray-900"
              >
                Confirmar Contraseña
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required:
                      "La confirmación de la contraseña es un campo obligatorio!",
                  })}
                  className={`block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-[#008aae]
                        ${
                          errors.confirm_password !== undefined
                            ? "ring-rose-500"
                            : "border-gray-300"
                        }}
                        ${
                          errors.confirm_password !== undefined
                            ? "focus:outline-rose-500"
                            : "focus:outline-[#008aae]"
                        }`}
                />
              </div>
              {errors.confirm_password !== undefined && (
                <p className="mt-2 text-sm text-rose-500">
                  {errors.confirm_password.message as any}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 space-y-10">
            <div className="relative flex justify-center items-center gap-x-3">
              <div className="flex h-6 items-center">
                <input
                  id="terminos"
                  name="terminos"
                  type="checkbox"
                  className="h-6 w-6 rounded border-gray-300 text-[#008aae] focus:ring-[#79ad34]"
                  checked={termsAccepted}
                  onChange={() => {
                    setTermsAccepted(!termsAccepted);
                  }}
                />
              </div>
              <div className="leading-6">
                <label htmlFor="terminos" className="font-medium text-gray-900">
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
          className="rounded-md px-10 py-2 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 duration-300 bg-[#008aae] hover:bg-[#79ad34] disabled:opacity-50"
          disabled={!termsAccepted || isLoading}
        >
          {isLoading ? "Cargando.." : "REGISTRARME"}
        </button>
      </div>
      <p className="mt-10 text-center text-gray-500">
        ¿Ya estás registrado?{" "}
        <Link
          href="/signin"
          className="font-semibold leading-6 text-[#008aae] hover:text-[#79ad34]"
        >
          Iniciar Sesión
        </Link>
      </p>
    </form>
  );
}
