"use client";

import { useEffect, useState } from "react";
import { tosty } from "@/libs/tosty";
import { useRouter } from "next-nprogress-bar";
import clsxe from "@/libs/clsxe";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import api from "@/libs/api";
import { isAxiosError } from "axios";

interface ModalFormWelcomeProps {
  setOpen: (st: boolean) => void;
}

export default function ModalFormWelcome({ setOpen }: ModalFormWelcomeProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSubtitle, setIsLoadingSubtitle] = useState(false);
  const router = useRouter();

  const defaultValues = {
    subtitle: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues });

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    setIsLoading(true);

    try {
      const response = await api.put("/admin/home-content/welcome", {
        subtitle: data.subtitle,
      });

      if (response.status === 201) {
        tosty.success("¡Datos actualizados exitosamente!");
        router.refresh();
        setOpen(false);
      } else {
        tosty.error("Error al actualizar datos!");
      }
    } catch (error: any) {
      if (isAxiosError(error)) {
        tosty.error(error.response?.data.message);
      }

      console.error({ error });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getSubtitle = async () => {
      try {
        setIsLoadingSubtitle(true);

        const subtitle = await fetch(`/api/admin/home-content/welcome`);
        const response = await subtitle.json();

        reset(formValues => ({
          ...formValues,
          subtitle: response.subtitle,
        }));
      } catch (error) {
        console.error({ error });
      } finally {
        setIsLoadingSubtitle(false);
      }
    };

    getSubtitle();
  }, [reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4 w-full">
        <label className="text-gray-700 dark:text-gray-300" htmlFor="subtitle">
          Subtitulo de la Página de Inicio
        </label>
        <textarea
          id="subtitle"
          rows={4}
          {...register("subtitle", {
            required: "El mensaje es un campo obligatorio!",
          })}
          className={clsxe(errors.subtitle, "resize-none w-full mt-2")}
          spellCheck="false"
          placeholder="Por favor deja el subtitulo de la página de inicio aquí..."
          disabled={isLoading || isLoadingSubtitle}
        />
      </div>

      <div>
        <button
          type="submit"
          className="text-sm rounded-md px-10 py-2 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 duration-300 bg-boston-blue-600 hover:bg-sushi-500 disabled:opacity-50 w-full flex items-center justify-center gap-x-1 disabled:cursor-not-allowed enabled:active:bg-sushi-400 mb-2"
          disabled={isLoading || isLoadingSubtitle}
        >
          {isLoading || isLoadingSubtitle ? "CARGANDO..." : "ACTUALIZAR"}
        </button>
        <button
          type="button"
          className="text-sm rounded-md px-10 py-2 font-semibold bg-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 duration-300 hover:bg-gray-100 dark:hover:bg-gray-200 disabled:opacity-50 ring-1 ring-inset ring-gray-300 w-full flex items-center justify-center gap-x-1 disabled:cursor-not-allowed enabled:active:bg-sushi-400 mb-2 text-gray-900"
          disabled={isLoading}
          onClick={() => setOpen(false)}
        >
          {isLoading ? "CARGANDO..." : "CANCELAR"}
        </button>
      </div>
    </form>
  );
}
