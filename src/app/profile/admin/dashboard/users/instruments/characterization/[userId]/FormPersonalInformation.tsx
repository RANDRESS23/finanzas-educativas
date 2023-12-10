"use client";

import Input from "@/components/Input";
import InputCheckBox from "@/components/InputCheckBox";
import InputRadio from "@/components/InputRadio";
import InputSelect from "@/components/InputSelect";
import api from "@/libs/api";
import { tosty } from "@/libs/tosty";
import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";

interface IProps {
  userId: string;
}

export default function FormPersonalInformation({ userId }: IProps) {
  const [isLoadingDataUser, setIsLoadingDataUser] = useState(true);

  const {
    register,
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
    const getMoreInfoUser = async () => {
      try {
        const response = await api.get(`/user/userMoreInfo/see/${userId}`);

        if (response.status === 404) {
          return console.error({ error: "No hay datos del usuario" });
        }

        reset(formValues => ({
          ...formValues,
          ...response.data,
          isInAPensionFund: response.data.isInAPensionFund ? "Si" : "No",
        }));
      } catch (error) {
        if (isAxiosError(error)) {
          return tosty.warn(error.response?.data.message);
        }

        console.error({ error });
      } finally {
        setIsLoadingDataUser(false);
      }
    };

    getMoreInfoUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoadingDataUser) {
    return (
      <div className="top-0 left-0 w-screen h-screen flex justify-center mt-20">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <form className="flex flex-col sm:grid md:grid-cols-2 gap-5 md:gap-7 md:place-content-center w-[330px] sm:w-[500px] md:w-[600px] lg:w-[700px]">
      <InputSelect
        selectProps={{ id: "documentType", disabled: true }}
        label="Tipo de Documento"
        register={register}
        errors={errors}
        options={[
          { value: "cedula_ciudadania", label: "Cédula de Ciudadanía" },
          { value: "cedula_extranjeria", label: "Cédula de Extranjería" },
        ]}
      />

      <Input
        inputProps={{
          id: "document",
          type: "text",
          disabled: true,
          placeholder: "0000000000",
        }}
        label="Número de Identificación"
        register={register}
        errors={errors}
      />

      <Input
        inputProps={{
          id: "firstName",
          type: "text",
          disabled: true,
          placeholder: "John",
        }}
        label="Nombres"
        register={register}
        errors={errors}
      />

      <Input
        inputProps={{
          id: "lastName",
          type: "text",
          disabled: true,
          placeholder: "Doe",
        }}
        label="Apellidos"
        register={register}
        errors={errors}
      />

      <Input
        inputProps={{
          id: "phoneNumber",
          type: "tel",
          disabled: true,
          placeholder: "3XX XXX XXXX",
        }}
        label="Celular"
        register={register}
        errors={errors}
      />

      <Input
        inputProps={{
          id: "email",
          type: "email",
          disabled: true,
          placeholder: "johndoe@finanzas-educativas.com",
          autoComplete: "username",
        }}
        label="Correo Electrónico"
        register={register}
        errors={errors}
      />

      <InputSelect
        selectProps={{ id: "gender", disabled: true }}
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
        selectProps={{ id: "age", disabled: true }}
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
        selectProps={{ id: "civilStatus", disabled: true }}
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
        selectProps={{ id: "educationLevel", disabled: true }}
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
        selectProps={{ id: "residenceArea", disabled: true }}
        label="¿En que zona vive?"
        register={register}
        errors={errors}
        options={[
          { value: "urbana", label: "Urbana" },
          { value: "rural", label: "Rural" },
        ]}
      />

      <InputSelect
        selectProps={{ id: "typeOfHousing", disabled: true }}
        label="Tipo de vivienda donde habita"
        register={register}
        errors={errors}
        options={[
          { value: "propia", label: "Propia" },
          { value: "alquilada", label: "Alquilada (arrendamiento)" },
          { value: "hipotecada", label: "Hipotecada" },
          {
            value: "cedida",
            label:
              "Cedida (propiedad de un familiar que le permite habitar allí)",
          },
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
          { value: "no-house-services", label: "Ninguno de los anteriores" },
        ]}
        disabled
      />

      <InputSelect
        selectProps={{ id: "socioeconomicLevel", disabled: true }}
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
        selectProps={{ id: "numberPeopleContributing", disabled: true }}
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
        selectProps={{ id: "incomeComeFrom", disabled: true }}
        label="Los ingresos que percibe provienen de"
        register={register}
        errors={errors}
        options={[
          { value: "ventas informales", label: "Ventas informales" },
          {
            value: "negocio propio e informalidad",
            label: "Negocio propio e informalidad",
          },
          {
            value: "trabajar en una empresa e informalidad",
            label: "Trabajar en una empresa e informalidad",
          },
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
        disabled
      />

      <InputSelect
        selectProps={{ id: "healthSystemAffiliation", disabled: true }}
        label="Que tipo de afiliación tiene al sistema de salud"
        register={register}
        errors={errors}
        options={[
          { value: "regimen contributivo", label: "Régimen contributivo" },
          { value: "regimen subsidiado", label: "Régimen subsidiado" },
          {
            value: "ninguno",
            label: "No cuento con ningún tipo de afiliación",
          },
        ]}
      />

      <InputSelect
        selectProps={{
          id: "numberPeopleDependFinancially",
          disabled: true,
        }}
        label="Número de personas que dependen económicamente de sus ingresos"
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
          {
            value: "credito hipotecario",
            label: "Crédito hipotecario (crédito de vivienda)",
          },
          {
            value: "credito de libre inversión",
            label: "Crédito de libre inversión",
          },
          { value: "fondos de inversion", label: "Fondos de inversión" },
          { value: "credito educativo", label: "Crédito educativo" },
          { value: "ninguno", label: "Ninguno de los anteriores" },
        ]}
        disabled
      />
    </form>
  );
}
