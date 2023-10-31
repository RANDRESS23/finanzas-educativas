"use client";

import clsxe from "@/libs/clsxe";
import clsx from "clsx";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { VscFeedback as SendIcon } from "react-icons/vsc";

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
      phoneNumber: "",
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
          className={clsxe(errors.name)}
          spellCheck="false"
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
          className={clsxe(errors.email)}
          spellCheck="false"
        />
        {errors.email !== undefined && (
          <p className="my-2 text-sm text-rose-500">
            {errors.email.message as any}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="phoneNumber"
          className="block font-medium leading-6 text-gray-900"
        >
          Teléfono
        </label>
        <input
          type="text"
          id="phoneNumber"
          {...register("phoneNumber", {
            required: "El teléfono es un campo obligatorio!",
          })}
<<<<<<< HEAD
          className={`block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-[#008aae] sm:max-w-xs
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
=======
          className={clsxe(errors.phone_number)}
          spellCheck="false"
>>>>>>> 5bfc5638286e77a60e81277f657306f5146e5421
        />
        {errors.phoneNumber !== undefined && (
          <p className="my-2 text-sm text-rose-500">
            {errors.phoneNumber.message as any}
          </p>
        )}
      </div>

      <div className="mb-6">
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
            className={clsxe(errors.message, "resize-none")}
            defaultValue={""}
            spellCheck="false"
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
        className={clsx(
          "rounded-md px-10 py-2 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 duration-300 bg-[#008aae] hover:bg-[#79ad34] disabled:opacity-50 w-full flex items-center justify-center gap-x-1",
          { "cursor-not-allowed": isLoading }
        )}
        disabled={isLoading}
      >
        <SendIcon />
        {isLoading ? "CARGANDO..." : "ENVIAR"}
      </button>
    </form>
  );
}
