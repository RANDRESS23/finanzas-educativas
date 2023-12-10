"use client";

import { useEffect, useState } from "react";
import { tosty } from "@/libs/tosty";
import { useRouter } from "next-nprogress-bar";
import clsxe from "@/libs/clsxe";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import api from "@/libs/api";
import { isAxiosError } from "axios";

interface ModalFormTakeIntoAccountAGoodDecisionProps {
  setOpen: (st: boolean) => void;
}
// editar el archivo
export default function ModalFormTakeIntoAccountAGoodDecision({
  setOpen,
}: ModalFormTakeIntoAccountAGoodDecisionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [
    isLoadingTakeIntoAccountAGoodDecision,
    setIsLoadingTakeIntoAccountAGoodDecision,
  ] = useState(false);
  const router = useRouter();

  const defaultValues = {
    firstParagraph: "",
    secondParagraph: "",
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
        "/admin/second-dimension/take-into-account-a-good-decision",
        {
          firstParagraph: data.firstParagraph,
          secondParagraph: data.secondParagraph,
        },
      );

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
    const getTakeIntoAccountAGoodDecision = async () => {
      try {
        setIsLoadingTakeIntoAccountAGoodDecision(true);

        const takeIntoAccountAGoodDecision = await fetch(
          `/api/admin/second-dimension/take-into-account-a-good-decision`,
        );
        const response = await takeIntoAccountAGoodDecision.json();

        reset(formValues => ({
          ...formValues,
          firstParagraph: response[0],
          secondParagraph: response[1],
        }));
      } catch (error) {
        console.error({ error });
      } finally {
        setIsLoadingTakeIntoAccountAGoodDecision(false);
      }
    };

    getTakeIntoAccountAGoodDecision();
  }, [reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4 w-full">
        <label
          className="text-gray-700 dark:text-gray-300"
          htmlFor="firstParagraph"
        >
          Primer Párrafo
        </label>
        <textarea
          id="firstParagraph"
          rows={4}
          {...register("firstParagraph", {
            required:
              "El primer párrafo para tener una buena decisión es un campo obligatorio!",
          })}
          className={clsxe(errors.firstParagraph, "resize-none w-full mt-2")}
          spellCheck="false"
          placeholder="Por favor deja el primer párrafo para tener una buena decisión aquí..."
          disabled={isLoading || isLoadingTakeIntoAccountAGoodDecision}
        />
      </div>

      <div className="mb-4 w-full">
        <label
          className="text-gray-700 dark:text-gray-300"
          htmlFor="secondParagraph"
        >
          Segundo Párrafo
        </label>
        <textarea
          id="secondParagraph"
          rows={4}
          {...register("secondParagraph", {
            required:
              "El segundo párrafo para tener una buena decision es un campo obligatorio!",
          })}
          className={clsxe(errors.secondParagraph, "resize-none w-full mt-2")}
          spellCheck="false"
          placeholder="Por favor deja el segundo párrafo para tener una buena decision aquí..."
          disabled={isLoading || isLoadingTakeIntoAccountAGoodDecision}
        />
      </div>

      <div>
        <button
          type="submit"
          className="text-sm rounded-md px-10 py-2 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 duration-300 bg-boston-blue-600 hover:bg-sushi-500 disabled:opacity-50 w-full flex items-center justify-center gap-x-1 disabled:cursor-not-allowed enabled:active:bg-sushi-400 mb-2"
          disabled={isLoading || isLoadingTakeIntoAccountAGoodDecision}
        >
          {isLoading || isLoadingTakeIntoAccountAGoodDecision
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
