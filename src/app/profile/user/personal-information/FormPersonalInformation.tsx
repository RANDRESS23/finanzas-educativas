"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import Input from "@/components/Input";
import InputSelect from "@/components/InputSelect";
import InputCheckBox from "@/components/InputCheckBox";
import InputRadio from "@/components/InputRadio";
import { useRouter } from "next/navigation";
import api from "@/libs/api";

export default function FormPersonalInformation() {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      documentType: "",
      document: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      gender: "",
      age: [0, 0],
      civilStatus: "",
      educationLevel: "",
      residenceArea: "",
      typeOfHousing: "",
      houseServices: [],
      socioeconomicLevel: 0,
      numberPeopleContributing: 0,
      incomeComeFrom: "",
      isInAPensionFund: "No",
      healthSystemAffiliation: "",
      numberPeopleDependFinancially: 0,
      financialProducts: [],
    },
  });

  useEffect(() => {
    if (session?.user) {
      const {
        documentType,
        document,
        firstName,
        lastName,
        phoneNumber,
        email
      } = session.user;

      reset(formValues => ({
        ...formValues,
        documentType,
        document,
        firstName,
        lastName,
        phoneNumber,
        email,
      }))
    }
  }, [session?.user, reset])
  
  useEffect(() => {
    const getMoreInfoUser = async () => {
      const response = await api.get(`/user/userMoreInfo/${session?.user?.id}`);

      if (response.status === 404) return console.log("No hay datos del usuario");

      console.log(response.data);

      reset(formValues => ({
        ...formValues,
        ...response.data,
        isInAPensionFund: response.data.isInAPensionFund ? "Si" : "No",
      }))
    }

    if (session?.user) {
      getMoreInfoUser();
    }
  }, [session?.user, reset])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);

      const response = await api.post("/user/userMoreInfo", {
        userId: session?.user?.id,
        documentSession: session?.user?.document,
        emailSession: session?.user?.email,
        isInAPensionFund: data.isInAPensionFund === "Si",
        ...data
      });

      if (response.status === 201) {
        toast.success("¡Datos completados exitosamente!");
        router.refresh();
        router.push("/profile/user");
      } else toast.error("Error al completar datos!");
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log({ errorMessage: error.response.data.message });
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col sm:grid md:grid-cols-2 gap-5 md:gap-7 md:place-content-center w-[330px] sm:w-[500px] md:w-[600px] lg:w-[700px]"
    >
      <InputSelect
        name="documentType"
        label="Tipo de Documento"
        register={register}
        errors={errors}
        options={[
          { value: "cedula_ciudadania", label: "Cédula de Ciudadanía" },
          { value: "cedula_extranjeria", label: "Cédula de Extranjería" },
        ]}
      />

      <Input
        name="document"
        type="text"
        label="Número de Identificación"
        register={register}
        errors={errors}
      />

      <Input
        name="firstName"
        type="text"
        label="Nombres"
        register={register}
        errors={errors}
      />

      <Input
        name="lastName"
        type="text"
        label="Apellidos"
        register={register}
        errors={errors}
      />

      <Input
        name="phoneNumber"
        type="tel"
        label="Celular"
        register={register}
        errors={errors}
      />

      <Input
        name="email"
        type="email"
        label="Correo Electrónico"
        register={register}
        errors={errors}
      />

      <InputSelect
        name="gender"
        label="Género"
        register={register}
        errors={errors}
        options={[
          { value: "masculino", label: "Masculino" },
          { value: "femenino", label: "Femenino" },
          { value: "otro", label: "Otro" },
        ]}
      />
      
      <InputSelect
        name="age"
        label="Rango de edad"
        register={register}
        errors={errors}
        options={[
          { value: ["0", "17"], label: "Menor de 18 años" },
          { value: ["18", "25"], label: "Entre 18 y 25 años" },
          { value: ["26", "33"], label: "Entre 26 y 33 años" },
          { value: ["34", "41"], label: "Entre 34 y 41 años" },
          { value: ["42", "49"], label: "Entre 42 y 49 años" },
          { value: ["50", "57"], label: "Entre 50 y 57 años" },
          { value: ["58", "130"], label: "Más de 57 años" },
        ]}
      />
      
      <InputSelect
        name="civilStatus"
        label="Estado Civil"
        register={register}
        errors={errors}
        options={[
          { value: "soltero(a)", label: "Soltero(a)" },
          { value: "casado(a)", label: "Casado(a)" },
          { value: "union libre", label: "Unión libre" },
          { value: "divorciado(a)", label: "Divorciado(a)" },
          { value: "viudo(a)", label: "Viudo(a)" },
        ]}
      />
      
      <InputSelect
        name="educationLevel"
        label="Nivel de Educación"
        register={register}
        errors={errors}
        options={[
          { value: "ninguna", label: "Ninguna" },
          { value: "primaria incompleta", label: "Primaria incompleta" },
          { value: "primaria completa", label: "Primaria completa" },
          { value: "secundaria incompleta", label: "Secundaria incompleta" },
          { value: "secundaria completa", label: "Secundaria completa" },
          { value: "profesional incompleto", label: "Profesional incompleto" },
          { value: "profesional completo", label: "Profesional completo" },
          { value: "postgrado", label: "Postgrado" },
        ]}
      />
      
      <InputSelect
        name="residenceArea"
        label="¿En que zona vive?"
        register={register}
        errors={errors}
        options={[
          { value: "urbana", label: "Urbana" },
          { value: "rural", label: "Rural" },
        ]}
      />
      
      <InputSelect
        name="typeOfHousing"
        label="Tipo de vivienda donde habita"
        register={register}
        errors={errors}
        options={[
          { value: "propia", label: "Propia" },
          { value: "alquilada", label: "Alquilada (arrendamiento)" },
          { value: "hipotecada", label: "Hipotecada" },
          { value: "cedida", label: "Cedida (propiedad de un familiar que le permite habitar allí)" },
        ]}
      />
      
      <InputCheckBox
        name="houseServices"
        label="Servicios con los que cuenta"
        register={register}
        errors={errors}
        options={[
          { value: "acueducto", label: "Acueducto" },
          { value: "alcantarillado", label: "Alcantarillado" },
          { value: "energia", label: "Energía" },
          { value: "gas", label: "Gas" },
          { value: "telefonia", label: "Telefonía" },
          { value: "internet", label: "Internet" },
          { value: "tv por cable", label: "TV por cable" },
          { value: "ninguno", label: "Ninguno de los anteriores" },
        ]}
      />

      <InputSelect
        name="socioeconomicLevel"
        label="Estrato Socioeconómico"
        register={register}
        errors={errors}
        options={[
          { value: 1, label: "Estrato 1" },
          { value: 2, label: "Estrato 2" },
          { value: 3, label: "Estrato 3" },
          { value: 4, label: "Estrato 4" },
          { value: 5, label: "Estrato 5" },
        ]}
      />
      
      <InputSelect
        name="numberPeopleContributing"
        label="Número de personas que aportan ingresos al hogar"
        register={register}
        errors={errors}
        options={[
          { value: 1, label: "1 persona" },
          { value: 2, label: "2 personas" },
          { value: 3, label: "3 personas" },
          { value: 4, label: "4 o más personas" },
        ]}
      />
      
      <InputSelect
        name="incomeComeFrom"
        label="Los ingresos que percibe provienen de"
        register={register}
        errors={errors}
        options={[
          { value: "ventas informales", label: "Ventas informales" },
          { value: "vinculacion laboral con una empresa", label: "Vinculación laboral con una empresa" },
          { value: "subsidios del gobierno", label: "Subsidios del gobierno" },
          { value: "emprendimiento propio", label: "Emprendimiento propio" },
          { value: "ninguno", label: "No percibo ningún tipo de ingresos" },
        ]}
      />

      <InputRadio
        name="isInAPensionFund"
        label="¿Está afiliado a un fondo de pensiones?"
        register={register}
        options={[
          { value: "Si", label: "Si" },
          { value: "No", label: "No" },
        ]}
      />

      <InputSelect
        name="healthSystemAffiliation"
        label="Que tipo de afiliación tiene al sistema de salud"
        register={register}
        errors={errors}
        options={[
          { value: "regimen contributivo", label: "Régimen contributivo" },
          { value: "regimen subsidiado", label: "Régimen subsidiado" },
          { value: "ninguno", label: "No cuento con ningún tipo de afiliación" },
        ]}
      />

      <InputSelect
        name="numberPeopleDependFinancially"
        label="Número de personas que dependen económicamente de usted"
        register={register}
        errors={errors}
        options={[
          { value: 1, label: "1 persona" },
          { value: 2, label: "2 personas" },
          { value: 3, label: "3 personas" },
          { value: 4, label: "4 o más personas" },
        ]}
      />

      <InputCheckBox
        name="financialProducts"
        label="Con cuáles de los siguientes productos financieros cuenta"
        register={register}
        errors={errors}
        options={[
          { value: "cuenta de ahorros", label: "Cuenta de ahorros" },
          { value: "cuenta corriente", label: "Cuenta corriente" },
          { value: "tarjeta de credito", label: "Tarjeta de crédito" },
          { value: "tarjeta debito", label: "Tarjeta debito" },
          { value: "CDT", label: "CDT" },
          { value: "credito hipotecario", label: "Crédito hipotecario (crédito de vivienda)" },
          { value: "credito de libre inversión", label: "Crédito de libre inversión" },
          { value: "fondos de inversion", label: "Fondos de inversión" },
          { value: "credito educativo", label: "Crédito educativo" },
          { value: "ninguno", label: "Ninguno de los anteriores" },
        ]}
      />

      <button
        type="submit"
        className="rounded-md px-10 py-2 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 duration-300 bg-[#008aae] hover:bg-[#79ad34] disabled:opacity-50 w-full col-span-2"
        disabled={isLoading}
      >
        {isLoading ? "Cargando.." : "COMPLETAR PERFIL"}
      </button>
    </form>
  );
}
