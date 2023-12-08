import api from "@/libs/api";
import clsxe from "@/libs/clsxe";
import { tosty } from "@/libs/tosty";
import { type META } from "@/types/TMeta";
import { type Meta } from "@prisma/client";
import { isAxiosError } from "axios";
import { useRouter } from "next-nprogress-bar";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";

export default function MetaForm({
  meta,
  metaInfo,
  closeMetaModal,
  setIsLoadingForm,
}: {
  meta: META;
  metaInfo: Partial<Meta>;
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
      [meta]: metaInfo[meta]![0],
      [`more${meta}`]: metaInfo[meta]![1],
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    setIsLoadingForm(true);

    try {
      const response = await api.patch(`/admin/meta/${meta}`, {
        id: metaInfo.id,
        [meta]: Object.values(data),
      });

      if (response.status === 200) {
        tosty.success("Informacíon actualizada exitosamente!");
        reset();
        closeMetaModal();
        router.refresh();
      }
    } catch (error) {
      if (isAxiosError(error)) {
        tosty.error(error.response?.data.message);
      }

      console.error({ error });
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
          {errors[meta]!.message as string}
        </p>
      )}
    </section>
  );
}
