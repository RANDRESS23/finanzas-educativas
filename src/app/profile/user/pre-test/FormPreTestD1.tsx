"use client";

import InputRadio from "@/components/InputRadio";
// import InputSelect from "@/components/InputSelect";
// import Title from "@/components/Title";
// import api from "@/libs/api";
// import { tosty } from "@/libs/tosty";
// import { isAxiosError } from "axios";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useState } from "react"
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { BsFillPatchCheckFill as CompleteIcon } from "react-icons/bs";

export default function FormPreTestD1() {
  // const [editInfo, setEditInfo] = editInfoState;
  // const [isLoadingDataUser, setIsLoadingDataUser] = useState(true);
  // const [isExistUserData, setIsExistUserData] = useState(true);
  const [isLoading, _] = useState(false);
  // const { data: session } = useSession();
  // const router = useRouter();

  const {
    register,
    handleSubmit,
    // reset,
    // formState: { errors },
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

  // useEffect(() => {
  //   if (session?.user) {
  //     const {
  //       documentType,
  //       document,
  //       firstName,
  //       lastName,
  //       phoneNumber,
  //       email,
  //     } = session.user;

  //     reset(formValues => ({
  //       ...formValues,
  //       documentType,
  //       document,
  //       firstName,
  //       lastName,
  //       phoneNumber,
  //       email,
  //     }));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [session?.user]);

  // useEffect(() => {
  //   const getMoreInfoUser = async () => {
  //     try {
  //       const response = await api.get(
  //         `/user/userMoreInfo/${session?.user?.id}`,
  //       );

  //       if (response.status === 404) {
  //         setIsExistUserData(false);
  //         setEditInfo(false);
  //         return console.error({ error: "No hay datos del usuario" });
  //       }

  //       reset(formValues => ({
  //         ...formValues,
  //         ...response.data,
  //         isInAPensionFund: response.data.isInAPensionFund ? "Si" : "No",
  //       }));
  //     } catch (error) {
  //       if (isAxiosError(error)) {
  //         tosty.warn(error.response?.data.message);
  //       }

  //       console.error({ error });
  //     } finally {
  //       setIsLoadingDataUser(false);
  //     }
  //   };

  //   if (session?.user) {
  //     getMoreInfoUser();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [session?.user]);

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    console.log({ data });
    
    // if (editInfo) {
    //   setIsLoading(true);
    //   let response;

    //   try {
    //     if (isExistUserData) {
    //       response = await api.put(`/user/userMoreInfo/${session?.user?.id}`, {
    //         ...data,
    //         userId: session?.user?.id,
    //         documentSession: session?.user?.document,
    //         emailSession: session?.user?.email,
    //         isInAPensionFund: data.isInAPensionFund === "Si",
    //       });
    //     } else {
    //       response = await api.post("/user/userMoreInfo", {
    //         ...data,
    //         userId: session?.user?.id,
    //         documentSession: session?.user?.document,
    //         emailSession: session?.user?.email,
    //         isInAPensionFund: data.isInAPensionFund === "Si",
    //       });
    //     }

    //     if (response.status === 201) {
    //       tosty.success("¡Datos completados exitosamente!");
    //       router.refresh();
    //       return router.push("/profile/user");
    //     }

    //     tosty.error("Error al completar datos!");
    //   } catch (error) {
    //     if (isAxiosError(error)) {
    //       tosty.error(error.response?.data.message);
    //     }

    //     console.error({ error });
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }
  };

  // if (isLoadingDataUser) {
  //   return (
  //     <div className="top-0 left-0 w-screen h-screen flex justify-center mt-20">
  //       <div
  //         className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"
  //         role="status"
  //       >
  //         <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
  //           Loading...
  //         </span>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col sm:grid md:grid-cols-2 gap-7 md:gap-10 md:place-content-center w-full"
    >
      <InputRadio
        name="question1"
        label="1°- ¿Sabe perfectamente con cuánto dinero cuenta para sus gastos mensuales?"
        register={register}
        options={[
          { value: "Siempre", label: "Siempre" },
          { value: "Casi siempre", label: "Casi siempre" },
          { value: "A veces", label: "A veces" },
          { value: "Casi Nunca", label: "Casi nunca" },
          { value: "Nunca", label: "Nunca" },
        ]}
        disabled={false}
      />
      
      <InputRadio
        name="question2"
        label="2°- ¿Es organizado con sus gastos de acuerdo con lo que recibe o gana?"
        register={register}
        options={[
          { value: "Siempre", label: "Siempre" },
          { value: "Casi siempre", label: "Casi siempre" },
          { value: "A veces", label: "A veces" },
          { value: "Casi Nunca", label: "Casi nunca" },
          { value: "Nunca", label: "Nunca" },
        ]}
        disabled={false}
      />
      
      <InputRadio
        name="question3"
        label="3°- ¿En su puesto de trabajo o su negocio: lleva un control de lo que va a comprar y de lo que vende?"
        register={register}
        options={[
          { value: "Siempre", label: "Siempre" },
          { value: "Casi siempre", label: "Casi siempre" },
          { value: "A veces", label: "A veces" },
          { value: "Casi Nunca", label: "Casi nunca" },
          { value: "Nunca", label: "Nunca" },
        ]}
        disabled={false}
      />
      
      <InputRadio
        name="question4"
        label="4°- ¿Con lo que gana en su puesto de trabajo o su negocio, puede ahorrar?"
        register={register}
        options={[
          { value: "Siempre", label: "Siempre" },
          { value: "Casi siempre", label: "Casi siempre" },
          { value: "A veces", label: "A veces" },
          { value: "Casi Nunca", label: "Casi nunca" },
          { value: "Nunca", label: "Nunca" },
        ]}
        disabled={false}
      />
      
      <InputRadio
        name="question5"
        label="5°- ¿Con lo que recibe por las ventas en su puesto de trabajo o su negocio, puede pagar sus deudas?"
        register={register}
        options={[
          { value: "Siempre", label: "Siempre" },
          { value: "Casi siempre", label: "Casi siempre" },
          { value: "A veces", label: "A veces" },
          { value: "Casi Nunca", label: "Casi nunca" },
          { value: "Nunca", label: "Nunca" },
        ]}
        disabled={false}
      />
      
      <p className="text-lg font-normal mx-auto mt-6 -mb-5 w-full col-span-2">
        Indique en cada una de las siguientes acciones, si corresponde a un gasto, un ingreso, un ahorro o una inversión:
      </p>

      <InputRadio
        name="question6"
        label="6°- Una de las actividades cotidianas que usted suele hacer es el pago de la renta (arriendo) y de servicios públicos. Dichos pagos usted los considera:"
        register={register}
        options={[
          { value: "Un gasto", label: "Un gasto" },
          { value: "Un ingreso", label: "Un ingreso" },
          { value: "Un ahorro", label: "Un ahorro" },
          { value: "Una inversion", label: "Una inversión" },
        ]}
        disabled={false}
      />
      
      <InputRadio
        name="question7"
        label="7°- Algunas personas como usted, deben pagar la universidad suya o de sus hijos. Este pago se le puede considerar:"
        register={register}
        options={[
          { value: "Un gasto", label: "Un gasto" },
          { value: "Un ingreso", label: "Un ingreso" },
          { value: "Un ahorro", label: "Un ahorro" },
          { value: "Una inversion", label: "Una inversión" },
        ]}
        disabled={false}
      />
      
      <InputRadio
        name="question8"
        label="8°- Cuando usted recibe el pago de su salario o ganancias de su trabajo, a esto se le considera:"
        register={register}
        options={[
          { value: "Un gasto", label: "Un gasto" },
          { value: "Un ingreso", label: "Un ingreso" },
          { value: "Un ahorro", label: "Un ahorro" },
          { value: "Una inversion", label: "Una inversión" },
        ]}
        disabled={false}
      />
      
      <InputRadio
        name="question9"
        label="9°- Cuando usted guarda o reserva parte del dinero que recibe de su salario para el futuro, dicho dinero se le considera:"
        register={register}
        options={[
          { value: "Un gasto", label: "Un gasto" },
          { value: "Un ingreso", label: "Un ingreso" },
          { value: "Un ahorro", label: "Un ahorro" },
          { value: "Una inversion", label: "Una inversión" },
        ]}
        disabled={false}
      />

      <button
        type="submit"
        className="rounded-md px-10 py-2 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 duration-300 bg-boston-blue-600 hover:bg-sushi-500 disabled:opacity-50 w-full col-span-2 flex items-center justify-center gap-x-2 disabled:cursor-not-allowed enabled:active:bg-sushi-400 mt-3"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <CompleteIcon />
            CARGANDO...
          </>
        ) : (
          <>
            <CompleteIcon />
            COMPLETAR PRE-TEST
          </>
          )
        }
      </button>
    </form>
  );
}
