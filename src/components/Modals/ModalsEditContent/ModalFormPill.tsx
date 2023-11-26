"use client";

import { useEffect, useState } from "react";
import { tosty } from "@/libs/tosty";
import { useRouter } from "next/navigation";
import clsxe from "@/libs/clsxe";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import api from "@/libs/api";
import { isAxiosError } from "axios";

interface ModalFormWelcomeProps {
  setOpen: (st: boolean) => void;
  setOpen2: (st: boolean) => void;
  idPill: string;
}

export default function ModalFormPill({ setOpen, setOpen2, idPill }: ModalFormWelcomeProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPill, setIsLoadingPill] = useState(false);
  const router = useRouter();

  const defaultValues = {
    title: "",
    description: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      const response = await api.put(`/admin/home-content/knowledge-pills/${idPill}`, {
        title: data.title,
        description: data.description
      });

      if (response.status === 201) {
        tosty.success("¡Datos actualizados exitosamente!");
        router.refresh();
        setOpen(false)
        setOpen2(false)
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
    const getPillInfo = async () => {
      try {
        setIsLoadingPill(true)

        const pill = await fetch(`/api/admin/home-content/knowledge-pills/${idPill}`);
        const response = await pill.json();
  
        reset((formValues) => ({
          ...formValues,
          title: response.title,
          description: response.description,
        }));
      } catch (error) {
        console.log({error});
      } finally {
        setIsLoadingPill(false)
      }
    }

    getPillInfo()
  }, [reset, idPill])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4 w-full">
        <label className="text-gray-700 dark:text-gray-300" htmlFor="title">Titulo de la Pildora de Conocimiento</label>
        <input 
          id="title"
          type="text"
          {...register("title", {
            required: "El titulo es un campo obligatorio!",
          })}
          className={clsxe(errors.title, "resize-none w-full mt-2")}
          placeholder="Por favor deja el titulo de la pildora aquí..."
          disabled={isLoading || isLoadingPill}
        />
      </div>
      
      <div className="mb-4 w-full">
        <label className="text-gray-700 dark:text-gray-300" htmlFor="description">Descripción de la Pildora de Conocimiento</label>
        <textarea
          id="description"
          rows={4}
          {...register("description", {
            required: "El mensaje es un campo obligatorio!",
          })}
          className={clsxe(errors.description, "resize-none w-full mt-2")}
          spellCheck="false"
          placeholder="Por favor deja la descripción de la pildora aquí..."
          disabled={isLoading || isLoadingPill}
        />
      </div>

      <div>
        <button
          type="submit"
          className="text-sm rounded-md px-10 py-2 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 duration-300 bg-boston-blue-600 hover:bg-sushi-500 disabled:opacity-50 w-full flex items-center justify-center gap-x-1 disabled:cursor-not-allowed enabled:active:bg-sushi-400 mb-2"
          disabled={isLoading || isLoadingPill}
        >
          {isLoading || isLoadingPill ? "CARGANDO..." : "ACTUALIZAR"}
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
