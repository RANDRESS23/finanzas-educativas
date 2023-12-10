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
  setOpen2: (st: boolean) => void;
  idVideo: string;
}

export default function ModalFormVideo({
  setOpen,
  setOpen2,
  idVideo,
}: ModalFormWelcomeProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);
  const router = useRouter();

  const defaultValues = {
    title: "",
    url: "",
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
        `/admin/home-content/informative-videos/${idVideo}`,
        {
          title: data.title,
          url: data.url,
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
    const getVideoInfo = async () => {
      try {
        setIsLoadingVideo(true);

        const video = await fetch(
          `/api/admin/home-content/informative-videos/${idVideo}`,
        );
        const response = await video.json();

        reset(formValues => ({
          ...formValues,
          title: response.title,
          url: response.url,
        }));
      } catch (error) {
        console.error({ error });
      } finally {
        setIsLoadingVideo(false);
      }
    };

    getVideoInfo();
  }, [reset, idVideo]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4 w-full">
        <label className="text-gray-700 dark:text-gray-300" htmlFor="title">
          Titulo del Video Informativo Educativo
        </label>
        <input
          id="title"
          type="text"
          {...register("title", {
            required: "El titulo es un campo obligatorio!",
          })}
          className={clsxe(errors.title, "resize-none w-full mt-2")}
          placeholder="Por favor deja el titulo del video aquí..."
          disabled={isLoading || isLoadingVideo}
        />
      </div>

      <div className="mb-4 w-full">
        <label className="text-gray-700 dark:text-gray-300" htmlFor="url">
          Url del Video Informativo Educativo
        </label>
        <textarea
          id="url"
          rows={4}
          {...register("url", {
            required: "La url del video es un campo obligatorio!",
          })}
          className={clsxe(errors.url, "resize-none w-full mt-2")}
          spellCheck="false"
          placeholder="Por favor deja la url del video informativo educativo aquí..."
          disabled={isLoading || isLoadingVideo}
        />
      </div>

      <div>
        <button
          type="submit"
          className="text-sm rounded-md px-10 py-2 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 duration-300 bg-boston-blue-600 hover:bg-sushi-500 disabled:opacity-50 w-full flex items-center justify-center gap-x-1 disabled:cursor-not-allowed enabled:active:bg-sushi-400 mb-2"
          disabled={isLoading || isLoadingVideo}
        >
          {isLoading || isLoadingVideo ? "CARGANDO..." : "ACTUALIZAR"}
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
