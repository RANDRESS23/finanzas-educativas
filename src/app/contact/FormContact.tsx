"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";

export default function FormContact() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (_data) => {
    toast.success("Mensaje enviado!");
    reset();
    try {
      setIsLoading(true);
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
        <label
          htmlFor="name"
          className="block font-medium leading-6 text-gray-900"
        >
          Nombres
        </label>
        <input
          type="text"
          id="name"
          {...register("name", {
            required: "El nombre es un campo obligatorio!",
          })}
          className={`block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-[#008aae] sm:max-w-xs
                ${
                  errors.name !== undefined
                    ? "ring-rose-500"
                    : "border-gray-300"
                }}
                ${
                  errors.name !== undefined
                    ? "focus:outline-rose-500"
                    : "focus:outline-[#008aae]"
                }`}
        />
        {errors.name !== undefined && (
          <p className="my-2 text-sm text-rose-500">
            {errors.name.message as any}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block font-medium leading-6 text-gray-900"
        >
          Correo electrónico
        </label>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: "El correo electrónico es un campo obligatorio!",
          })}
          className={`block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-[#008aae] sm:max-w-xs
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
        {errors.email !== undefined && (
          <p className="my-2 text-sm text-rose-500">
            {errors.email.message as any}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="phone_number"
          className="block font-medium leading-6 text-gray-900"
        >
          Teléfono
        </label>
        <input
          type="text"
          id="phone_number"
          {...register("phone_number", {
            required: "El teléfono es un campo obligatorio!",
          })}
          className={`block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-[#008aae] sm:max-w-xs
                ${
                  errors.phone_number !== undefined
                    ? "ring-rose-500"
                    : "border-gray-300"
                }}
                ${
                  errors.phone_number !== undefined
                    ? "focus:outline-rose-500"
                    : "focus:outline-[#008aae]"
                }`}
        />
        {errors.phone_number !== undefined && (
          <p className="my-2 text-sm text-rose-500">
            {errors.phone_number.message as any}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="message"
          className="block font-medium leading-6 text-gray-900"
        >
          Mensaje
        </label>
        <div>
          <textarea
            id="message"
            rows={4}
            {...register("message", {
              required: "El mensaje es un campo obligatorio!",
            })}
            className={`block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-[#008aae] sm:max-w-xs resize-none
            ${
              errors.message !== undefined ? "ring-rose-500" : "border-gray-300"
            }}
            ${
              errors.message !== undefined
                ? "focus:outline-rose-500"
                : "focus:outline-[#008aae]"
            }`}
            defaultValue={""}
          />
        </div>
        {errors.message !== undefined && (
          <p className="my-2 text-sm text-rose-500">
            {errors.message.message as any}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="rounded-md px-10 py-2 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 duration-300 bg-[#008aae] hover:bg-[#79ad34] disabled:opacity-50 w-full"
        disabled={isLoading}
      >
        {isLoading ? "Cargando.." : "ENVIAR"}
      </button>
    </form>
  );
}
