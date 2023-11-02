import api from "@/libs/api";
import clsxe from "@/libs/clsxe";
import { InformationSchema } from "@prisma/client";
import { AxiosError } from "axios";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import type { META } from "./MetaModal";
import { useRouter } from "next/navigation";

export default function MetaForm({
  meta,
  aboutInfo,
  closeMetaModal,
  setIsLoadingForm,
}: {
  meta: META;
  aboutInfo: Partial<InformationSchema>;
  closeMetaModal: () => void;
  setIsLoadingForm: (st: boolean) => void;
}) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      [meta]: aboutInfo[meta]![0],
      [`more${meta}`]: aboutInfo[meta]![1],
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoadingForm(true);

    try {
      const response = await api.patch(`/admin/meta/${meta}`, {
        id: aboutInfo.id,
        [meta]: Object.values(data),
      });

      if (response.status === 200) {
        toast.success("Informacíon actualizada exitosamente!");
        reset();
        closeMetaModal();
        router.refresh();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        console.log({ errorMessage: error.response?.data.message });
        console.log({ error });
      }
    } finally {
      setIsLoadingForm(false);
    }
  };

  return (
    <section className="py-8">
      <form
        className="flex gap-5"
        onSubmit={handleSubmit(onSubmit)}
        id="metaForm"
      >
        <textarea
          id={meta}
          rows={10}
          {...register(meta, {
            required: "Este campo es obligatorio, favor diligenciarlo.",
          })}
          className={clsxe(errors.mision, "resize-none")}
        />
        <textarea
          id={`more${meta}`}
          rows={10}
          {...register(`more${meta}`)}
          className={clsxe(errors[`more${meta}`], "resize-none")}
        />
      </form>

      {errors[meta] !== undefined && (
        <p className="my-2 text-sm text-rose-500">
          {errors[meta]!.message as any}
        </p>
      )}
    </section>
  );
}
