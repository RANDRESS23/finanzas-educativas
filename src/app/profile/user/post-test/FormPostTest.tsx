"use client";

import InputRadio from "@/components/InputRadio";
import api from "@/libs/api";
import { tosty } from "@/libs/tosty";
import { isAxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { BsFillPatchCheckFill as CompleteIcon } from "react-icons/bs";

export default function FormPostTest() {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const { register, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      question1: "",
      question2: "",
      question3: "",
      question4: "",
      question5: "",
      question6: "",
      question7: "",
      question8: "",
      question9: "",
      question10: "",
      question11: "",
      question12: "",
      question13: "",
      question14: "",
      question15: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    try {
      setIsLoading(true);

      const questions = Object.entries(data);

      const questionsFirstDimension = questions
        .slice(0, 7)
        .map(([question, answer]) => {
          const id = question.replace("question", "");

          return { id, question, answer };
        });

      const questionsSecondDimension = questions
        .slice(7, 11)
        .map(([question, answer]) => {
          const id = question.replace("question", "");

          return { id, question, answer };
        });

      const questionsThirdDimension = questions
        .slice(11, 15)
        .map(([question, answer]) => {
          const id = question.replace("question", "");

          return { id, question, answer };
        });

      const response = await api.post("/user/post-test", {
        ...data,
        userId: session?.user?.id,
        questionsFirstDimension,
        questionsSecondDimension,
        questionsThirdDimension,
      });

      if (response.status === 201) {
        tosty.success("¡Post-Test completado exitosamente!");
        router.refresh();
        return router.push("/profile/user");
      }

      tosty.error("Error al completar datos!");
    } catch (error) {
      if (isAxiosError(error)) {
        tosty.error(error.response?.data.message);
      }

      console.error({ error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col sm:grid md:grid-cols-2 gap-7 md:gap-10 md:place-content-center w-full"
    >
      <InputRadio
        name="question1"
        label="1°- ¿La cantidad de ingresos que obtiene de sus actividades económicas le permite realizar ahorros?"
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
        label="2°- ¿La cantidad de ingresos que recibe de sus actividades económicas le permite pagar todos sus gastos?"
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
        label="3°- ¿Sabe perfectamente con cuánto dinero cuenta para sus gastos mensuales?"
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
        label="4°- ¿Organiza sus gastos conforme a lo que recibe o gana?"
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
        label="5°- ¿Lleva un control de lo que va a comprar y de lo que vende?"
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
        name="question6"
        label="6°- ¿Con lo que gana en su puesto de trabajo o su negocio, puede ahorrar?"
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
        name="question7"
        label="7°- ¿Con lo que gana en su puesto de trabajo o su negocio, puede pagar todas sus deudas?"
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

      <h2 className="mt-10 text-2xl font-bold tracking-tight -mb-3 lg:-mb-7 col-span-2">
        <span className="text-boston-blue-600">Dimensión 2:</span> Toma de{" "}
        <span className="text-sushi-600">Decisiones Financieras</span>{" "}
        (Resolución de problemas)
      </h2>
      <p className="text-lg font-normal -mb-3 lg:-mb-5 mx-auto w-full col-span-2">
        Esta dimensión implica evaluar diversas situaciones o circunstancias
        propias de la cotidianidad de los participantes, así como la gestión de
        recursos que pueden verse comprometidos al momento de ser ejecutadas.
      </p>
      <p className="text-lg font-normal lg:-mb-5 mx-auto w-full col-span-2">
        Indique en qué grado de acuerdo o desacuerdo se encuentra con realizar
        cada una de las siguientes acciones:
      </p>

      <InputRadio
        name="question8"
        label="8°- ¿Consideraría la posibilidad de invertir sus ahorros o parte de sus ahorros en productos financieros como CDT, fondos de inversión, acciones, bonos, entre otros?"
        register={register}
        options={[
          { value: "Totalmente de acuerdo", label: "Totalmente de acuerdo" },
          { value: "De acuerdo", label: "De acuerdo" },
          { value: "Indeciso", label: "Indeciso" },
          { value: "En desacuerdo", label: "En desacuerdo" },
          {
            value: "Totalmente en desacuerdo",
            label: "Totalmente en desacuerdo",
          },
        ]}
        disabled={false}
      />

      <InputRadio
        name="question9"
        label="9°- ¿Consideraría la posibilidad de adquirir un crédito o préstamo en una entidad financiera, para su negocio, vivienda, educación o libre inversión?"
        register={register}
        options={[
          { value: "Totalmente de acuerdo", label: "Totalmente de acuerdo" },
          { value: "De acuerdo", label: "De acuerdo" },
          { value: "Indeciso", label: "Indeciso" },
          { value: "En desacuerdo", label: "En desacuerdo" },
          {
            value: "Totalmente en desacuerdo",
            label: "Totalmente en desacuerdo",
          },
        ]}
        disabled={false}
      />

      <InputRadio
        name="question10"
        label="10°- Cuando necesita adquirir un préstamo de dinero, usted acude preferiblemente a:"
        register={register}
        options={[
          {
            value: "Una Entidad financiera",
            label: "Una Entidad financiera",
          },
          { value: "Un Familiar", label: "Un Familiar" },
          { value: "Un amigo", label: "Un amigo" },
          {
            value:
              "Préstamos informales ofrecidos por personas particulares (paga diario, gota a gota)",
            label:
              "Préstamos informales ofrecidos por personas particulares (paga diario, gota a gota)",
          },
          {
            value: "Casas de empeño o prenderías",
            label: "Casas de empeño o prenderías",
          },
        ]}
        disabled={false}
      />

      <InputRadio
        name="question11"
        label="11°- Cuenta con un fondo de emergencias para contar con suficiente dinero en caso de un imprevisto o calamidad"
        register={register}
        options={[
          { value: "Sí", label: "Sí" },
          { value: "No", label: "No" },
        ]}
        disabled={false}
      />

      <h2 className="mt-10 text-2xl font-bold tracking-tight -mb-3 lg:-mb-7 col-span-2">
        <span className="text-boston-blue-600">Dimensión 3:</span>{" "}
        Administración de{" "}
        <span className="text-sushi-600">Finanzas Propias</span>
      </h2>
      <p className="text-lg font-normal -mb-3 lg:-mb-5 mx-auto w-full col-span-2">
        Esta dimensión consiste en la aplicación de las finanzas personales para
        lograr la libertad financiera, considerar su futuro económico y
        financiero cuando llegue o considere el momento de su retiro.
      </p>

      <InputRadio
        name="question12"
        label="12°- Opción que consideraría más conveniente pensando en su jubilación:"
        register={register}
        options={[
          {
            value:
              "Procurar beneficiarse de las ayudas del gobierno para la tercera edad",
            label:
              "Procurar beneficiarse de las ayudas del gobierno para la tercera edad",
          },
          {
            value: "Comprar la lotería y participar en sorteos y apuestas",
            label: "Comprar la lotería y participar en sorteos y apuestas",
          },
          {
            value:
              "Empezar a planificar y ahorrar para su jubilación a lo largo de su vida laboral",
            label:
              "Empezar a planificar y ahorrar para su jubilación a lo largo de su vida laboral",
          },
          { value: "No lo sabe", label: "No lo sabe" },
        ]}
        disabled={false}
      />

      <InputRadio
        name="question13"
        label="13°- ¿Cuál de los siguientes factores es más importante al considerar la inversión a largo plazo?
        "
        register={register}
        options={[
          {
            value: "Ganar dinero rápidamente",
            label: "Ganar dinero rápidamente",
          },
          { value: "Minimizar el riesgo", label: "Minimizar el riesgo" },
          {
            value: "Invertir solo en acciones individuales",
            label: "Invertir solo en acciones individuales",
          },
          {
            value: "Ignorar las tasas de interés",
            label: "Ignorar las tasas de interés",
          },
        ]}
        disabled={false}
      />

      <InputRadio
        name="question14"
        label="14°- En la organización de sus gastos (presupuesto personal), ¿Qué respuesta o afirmación es verdadera?"
        register={register}
        options={[
          {
            value: "Un presupuesto es innecesario si tienes ingresos estables",
            label: "Un presupuesto es innecesario si tienes ingresos estables",
          },
          {
            value:
              "Un presupuesto solo se utiliza para el negocio, no para las finanzas personales",
            label:
              "Un presupuesto solo se utiliza para el negocio, no para las finanzas personales",
          },
          {
            value:
              "Un presupuesto ayuda a controlar los gastos y a alcanzar metas financieras",
            label:
              "Un presupuesto ayuda a controlar los gastos y a alcanzar metas financieras",
          },
          {
            value: "Un presupuesto solo debe actualizarse una vez al año",
            label: "Un presupuesto solo debe actualizarse una vez al año",
          },
        ]}
        disabled={false}
      />

      <InputRadio
        name="question15"
        label="15°- ¿Qué tipo de cuenta suele utilizarse para el ahorro a corto plazo y gastos diarios?"
        register={register}
        options={[
          { value: "Cuenta de ahorros", label: "Cuenta de ahorros" },
          { value: "Cuenta corriente", label: "Cuenta corriente" },
          {
            value: "Certificado de depósito",
            label: "Certificado de depósito",
          },
          { value: "No lo sabe", label: "No lo sabe" },
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
            COMPLETAR POST-TEST
          </>
        )}
      </button>
    </form>
  );
}
