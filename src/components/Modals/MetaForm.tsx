import api from "@/libs/api";
import clsxe from "@/libs/clsxe";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { META } from "./MetaModal";

export default function FormMision({ meta }: { meta: META }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      [meta]: "",
      [`more${meta}`]: "",
    },
  });

  const getMetaD = async () => {
    const {
      data: {
        message: [metaD, moreMetaD],
      },
    } = await api(`/admin/meta/${meta}`);
    setValue(meta, metaD);
    setValue("moreMision", moreMetaD);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await api.post(`/admin/meta/${meta}`, { ...data });

      if (response.status === 200) {
        toast.success("Informacíon actualizada exitosamente!");
        router.refresh();
        reset();
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log({ errorMessage: error.response.data.message });
      console.log({ error });
    }
  };

  useEffect(() => {
    getMetaD();
  }, [getMetaD]);

  return (
    <form
      className="flex gap-5 py-8"
      onSubmit={handleSubmit(onSubmit)}
      id="formMeta"
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
        {...register(`more${meta}`, {
          required: "Este campo es obligatorio, favor diligenciarlo.",
        })}
        className={clsxe(errors[`more${meta}`], "resize-none")}
      />
    </form>
  );
}
