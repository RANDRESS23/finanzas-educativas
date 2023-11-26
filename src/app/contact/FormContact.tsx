"use client";

import Input from "@/components/Input";
import api from "@/libs/api";
import clsxe from "@/libs/clsxe";
import { tosty } from "@/libs/tosty";
import { isAxiosError } from "axios";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
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

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    setIsLoading(true);

    try {
      const response = await api.post("/contact", { ...data });

      if (response.status === 201) {
        tosty.success(response.data.message);
        reset();
      }
    } catch (error) {
      if (isAxiosError(error)) {
        tosty.error(error.response?.data.message);
      }

      console.error({ error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <Input
          inputProps={{
            id: "name",
            type: "text",
            placeholder: "John Doe",
            autoComplete: "off",
          }}
          label="Nombres"
          register={register}
          errors={errors}
        />
      </div>

      <div className="mb-4">
        <Input
          inputProps={{
            id: "email",
            type: "email",
            placeholder: "johndoe@finanzas-educativas.com",
            autoComplete: "username",
          }}
          label="Correo electrónico"
          register={register}
          errors={errors}
        />
      </div>

      <div className="mb-4">
        <Input
          inputProps={{
            id: "phoneNumber",
            type: "text",
            placeholder: "3XX XXX XXXX",
          }}
          label="Teléfono"
          register={register}
          errors={errors}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="message" className="block font-medium leading-6">
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
            placeholder="Por favor deja tu mensaje aquí..."
          />
        </div>
        {errors.message !== undefined && (
          <p className="my-2 text-sm text-rose-500">
            {errors.message.message as string}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="rounded-md px-10 py-2 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 duration-300 bg-boston-blue-600 hover:bg-sushi-500 disabled:opacity-50 w-full flex items-center justify-center gap-x-1 disabled:cursor-not-allowed enabled:active:bg-sushi-400"
        disabled={isLoading}
      >
        <SendIcon />
        {isLoading ? "CARGANDO..." : "ENVIAR"}
      </button>
    </form>
  );
}
