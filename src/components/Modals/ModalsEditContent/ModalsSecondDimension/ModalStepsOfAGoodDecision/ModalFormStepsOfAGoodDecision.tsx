"use client";

import { useEffect, useState } from "react";
import { tosty } from "@/libs/tosty";
import { useRouter } from "next-nprogress-bar";
import clsxe from "@/libs/clsxe";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import api from "@/libs/api";
import { isAxiosError } from "axios";

interface ModalFormStepsOfAGoodDecisionProps {
  setOpen: (st: boolean) => void;
  setOpen2: (st: boolean) => void;
  idStepOfAGoodDecision: string;
}

export default function ModalFormStepsOfAGoodDecision({
  setOpen,
  setOpen2,
  idStepOfAGoodDecision,
}: ModalFormStepsOfAGoodDecisionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingStepsOfAGoodDecision, setIsLoadingStepsOfAGoodDecision] =
    useState(false);
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

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    setIsLoading(true);

    try {
      const response = await api.put(
        `/admin/second-dimension/steps-of-a-good-decision/${idStepOfAGoodDecision}`,
        {
          title: data.title,
          description: data.description,
        },
      );

      if (response.status === 201) {
        tosty.success("¡Datos actualizados exitosamente!");
        router.refresh();
        setOpen(false);
        setOpen2(false);
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
    const getStepsOfAGoodDecision = async () => {
      try {
        setIsLoadingStepsOfAGoodDecision(true);

        const stepsOfAGoodDecision = await fetch(
          `/api/admin/second-dimension/steps-of-a-good-decision/${idStepOfAGoodDecision}`,
        );
        const response = await stepsOfAGoodDecision.json();

        reset(formValues => ({
          ...formValues,
          title: response.title,
          description: response.description,
        }));
      } catch (error) {
        console.error({ error });
      } finally {
        setIsLoadingStepsOfAGoodDecision(false);
      }
    };

    getStepsOfAGoodDecision();
  }, [reset, idStepOfAGoodDecision]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4 w-full">
        <label className="text-gray-700 dark:text-gray-300" htmlFor="title">
          Titulo de la Forma de Tomar una Buena Decisión
        </label>
        <input
          id="title"
          type="text"
          {...register("title", {
            required: "El titulo es un campo obligatorio!",
          })}
          className={clsxe(errors.title, "resize-none w-full mt-2")}
          placeholder="Por favor deja el titulo de la forma de tomar una buena decisión aquí..."
          disabled={isLoading || isLoadingStepsOfAGoodDecision}
        />
      </div>

      <div className="mb-4 w-full">
        <label
          className="text-gray-700 dark:text-gray-300"
          htmlFor="description"
        >
          Descripción de la Forma de Tomar una Buena Decisión
        </label>
        <textarea
          id="description"
          rows={4}
          {...register("description", {
            required: "La descripción es un campo obligatorio!",
          })}
          className={clsxe(errors.description, "resize-none w-full mt-2")}
          spellCheck="false"
          placeholder="Por favor deja la descripción de la Forma de tomar una buena decisión aquí..."
          disabled={isLoading || isLoadingStepsOfAGoodDecision}
        />
      </div>

      <div>
        <button
          type="submit"
          className="text-sm rounded-md px-10 py-2 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 duration-300 bg-boston-blue-600 hover:bg-sushi-500 disabled:opacity-50 w-full flex items-center justify-center gap-x-1 disabled:cursor-not-allowed enabled:active:bg-sushi-400 mb-2"
          disabled={isLoading || isLoadingStepsOfAGoodDecision}
        >
          {isLoading || isLoadingStepsOfAGoodDecision
            ? "CARGANDO..."
            : "ACTUALIZAR"}
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
