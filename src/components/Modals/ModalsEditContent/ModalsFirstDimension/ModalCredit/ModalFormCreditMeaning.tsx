"use client";

import { useEffect, useState } from "react";
import { tosty } from "@/libs/tosty";
import { useRouter } from "next-nprogress-bar";
import clsxe from "@/libs/clsxe";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import api from "@/libs/api";
import { isAxiosError } from "axios";

interface ModalFormCreditMeaningProps {
  setOpen: (st: boolean) => void;
  setOpen2: (st: boolean) => void;
}

export default function ModalFormCreditMeaning({
  setOpen,
  setOpen2,
}: ModalFormCreditMeaningProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCreditMeaning, setIsLoadingCreditMeaning] = useState(false);
  const router = useRouter();

  const defaultValues = {
    creditMeaning: "",
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
      const response = await api.put("/admin/first-dimension/credit", {
        creditMeaning: data.creditMeaning,
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
    const getCreditMeaning = async () => {
      try {
        setIsLoadingCreditMeaning(true);

        const creditMeaning = await fetch(`/api/admin/first-dimension/credit`);
        const response = await creditMeaning.json();

        reset(formValues => ({
          ...formValues,
          creditMeaning: response.creditMeaning,
        }));
      } catch (error) {
        console.error({ error });
      } finally {
        setIsLoadingCreditMeaning(false);
      }
    };

    getCreditMeaning();
  }, [reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4 w-full">
        <label
          className="text-gray-700 dark:text-gray-300"
          htmlFor="creditMeaning"
        >
          Concepto de Crédito
        </label>
        <textarea
          id="creditMeaning"
          rows={4}
          {...register("creditMeaning", {
            required: "El concepto de crédito es un campo obligatorio!",
          })}
          className={clsxe(errors.creditMeaning, "resize-none w-full mt-2")}
          spellCheck="false"
          placeholder="Por favor deja el concepto de crédito aquí..."
          disabled={isLoading || isLoadingCreditMeaning}
        />
      </div>

      <div>
        <button
          type="submit"
          className="text-sm rounded-md px-10 py-2 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 duration-300 bg-boston-blue-600 hover:bg-sushi-500 disabled:opacity-50 w-full flex items-center justify-center gap-x-1 disabled:cursor-not-allowed enabled:active:bg-sushi-400 mb-2"
          disabled={isLoading || isLoadingCreditMeaning}
        >
          {isLoading || isLoadingCreditMeaning ? "CARGANDO..." : "ACTUALIZAR"}
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
