"use client";

import { useEffect, useState } from "react";
import { tosty } from "@/libs/tosty";
import { useRouter } from "next-nprogress-bar";
import clsxe from "@/libs/clsxe";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import api from "@/libs/api";
import { isAxiosError } from "axios";

interface ModalFormSavingMeaningProps {
  setOpen: (st: boolean) => void;
  setOpen2: (st: boolean) => void;
}

export default function ModalFormSavingMeaning({
  setOpen,
  setOpen2,
}: ModalFormSavingMeaningProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSavingMeaning, setIsLoadingSavingMeaning] = useState(false);
  const router = useRouter();

  const defaultValues = {
    savingMeaning: "",
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
      const response = await api.put("/admin/first-dimension/saving", {
        savingMeaning: data.savingMeaning,
      });

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
    const getSavingMeaning = async () => {
      try {
        setIsLoadingSavingMeaning(true);

        const savingMeaning = await fetch(`/api/admin/first-dimension/saving`);
        const response = await savingMeaning.json();

        reset(formValues => ({
          ...formValues,
          savingMeaning: response.savingMeaning,
        }));
      } catch (error) {
        console.error({ error });
      } finally {
        setIsLoadingSavingMeaning(false);
      }
    };

    getSavingMeaning();
  }, [reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4 w-full">
        <label
          className="text-gray-700 dark:text-gray-300"
          htmlFor="savingMeaning"
        >
          Concepto de Ahorro
        </label>
        <textarea
          id="savingMeaning"
          rows={4}
          {...register("savingMeaning", {
            required: "El concepto de ahorro es un campo obligatorio!",
          })}
          className={clsxe(errors.savingMeaning, "resize-none w-full mt-2")}
          spellCheck="false"
          placeholder="Por favor deja el concepto de ahorro aquí..."
          disabled={isLoading || isLoadingSavingMeaning}
        />
      </div>

      <div>
        <button
          type="submit"
          className="text-sm rounded-md px-10 py-2 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 duration-300 bg-boston-blue-600 hover:bg-sushi-500 disabled:opacity-50 w-full flex items-center justify-center gap-x-1 disabled:cursor-not-allowed enabled:active:bg-sushi-400 mb-2"
          disabled={isLoading || isLoadingSavingMeaning}
        >
          {isLoading || isLoadingSavingMeaning ? "CARGANDO..." : "ACTUALIZAR"}
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
