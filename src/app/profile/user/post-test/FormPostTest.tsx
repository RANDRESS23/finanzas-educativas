"use client";

import InputRadio from "@/components/InputRadio";
import api from "@/libs/api";
import { tosty } from "@/libs/tosty";
import { isAxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
      question16: "",
      question17: "",
      question18: "",
      question19: "",
      question20: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    try {
      setIsLoading(true);

      const questions = Object.entries(data);

      const questionsFirstDimension = questions
        .slice(0, 9)
        .map(([question, answer]) => {
          const id = question.replace("question", "");

          return { id, question, answer };
        });

      const questionsSecondDimension = questions
        .slice(9, 15)
        .map(([question, answer]) => {
          const id = question.replace("question", "");

          return { id, question, answer };
        });

      const questionsThirdDimension = questions
        .slice(9, 15)
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
        Indique en cada una de las siguientes acciones, si corresponde a un
        gasto, un ingreso, un ahorro o una inversión:
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
        name="question10"
        label="10°- ¿Consideraría la posibilidad de invertir sus ahorros o parte de sus ahorros en productos financieros como CDT, fondos de inversión, acciones, bonos, entre otros?"
        register={register}
        options={[
          { value: "Totalmente de acuerdo", label: "Totalmente de acuerdo" },
          { value: "De acuerdo", label: "De acuerdo" },
          { value: "En desacuerdo", label: "En desacuerdo" },
          {
            value: "Totalmente en desacuerdo",
            label: "Totalmente en desacuerdo",
          },
        ]}
        disabled={false}
      />

      <InputRadio
        name="question11"
        label="11°- ¿Consideraría la posibilidad de adquirir un crédito o préstamo en una entidad financiera, para su negocio, vivienda, educación o libre inversión?"
        register={register}
        options={[
          { value: "Totalmente de acuerdo", label: "Totalmente de acuerdo" },
          { value: "De acuerdo", label: "De acuerdo" },
          { value: "En desacuerdo", label: "En desacuerdo" },
          {
            value: "Totalmente en desacuerdo",
            label: "Totalmente en desacuerdo",
          },
        ]}
        disabled={false}
      />

      <InputRadio
        name="question12"
        label="12°- Cuando necesita adquirir un préstamo de dinero, usted acude  preferiblemente a:"
        register={register}
        options={[
          {
            value: "Una Entidad financiera ( como Bancos, Fintech u otro)",
            label: "Una Entidad financiera ( como Bancos, Fintech u otro)",
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
        name="question13"
        label="13°- ¿Cuál de las siguientes opciones elegiría como forma efectiva para reducir sus gastos mensuales?"
        register={register}
        options={[
          {
            value: "Adquirir o conseguir nuevas tarjetas de crédito",
            label: "Adquirir o conseguir nuevas tarjetas de crédito",
          },
          {
            value: "Comprar solamente lo necesario",
            label: "Comprar solamente lo necesario",
          },
          {
            value: "Cancelar alguno de los servicios públicos",
            label: "Cancelar alguno de los servicios públicos",
          },
          {
            value: "Hacer rifas o participar en sorteos (apuestas)",
            label: "Hacer rifas o participar en sorteos (apuestas)",
          },
        ]}
        disabled={false}
      />

      <InputRadio
        name="question14"
        label="14°- ¿Qué se debe tener en cuenta para tener una tarjeta de crédito?
        "
        register={register}
        options={[
          {
            value: "La cantidad de efectivo que puedes retirar",
            label: "La cantidad de efectivo que puedes retirar",
          },
          {
            value: "El banco o establecimiento",
            label: "El banco o establecimiento",
          },
          { value: "La tasa de interés", label: "La tasa de interés" },
          { value: "No lo sabe", label: "No lo sabe" },
        ]}
        disabled={false}
      />

      <InputRadio
        name="question15"
        label="15°- ¿Cómo puede asegurarse de tener suficiente dinero para emergencias inesperadas?
        "
        register={register}
        options={[
          {
            value: "Manteniendo un fondo de emergencia",
            label: "Manteniendo un fondo de emergencia",
          },
          {
            value: "Pedir dinero prestado cuando surjan emergencias",
            label: "Pedir dinero prestado cuando surjan emergencias",
          },
          { value: "Vender los bienes", label: "Vender los bienes" },
          { value: "No sabe qué hacer", label: "No sabe qué hacer" },
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
        name="question16"
        label="16°- ¿Cuál de las siguientes opciones es recomendable, pensando para cuando deje de trabajar (jubilación)?
        "
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
        name="question17"
        label="17°- ¿Cuál de los siguientes factores es más importante al considerar la inversión a largo plazo?
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
        name="question18"
        label="18°- En la organización de sus gastos (presupuesto personal), ¿Qué respuesta o afirmación es verdadera?
        "
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
        name="question19"
        label="19°- ¿Cuál es una forma efectiva de reducir las deudas?"
        register={register}
        options={[
          {
            value: "Hacer pagos mínimos cada mes",
            label: "Hacer pagos mínimos cada mes",
          },
          {
            value: "Priorizar las deudas de mayor interés y pagarlas primero",
            label: "Priorizar las deudas de mayor interés y pagarlas primero",
          },
          {
            value: "Consolidar todas las deudas en una sola tarjeta de crédito",
            label: "Consolidar todas las deudas en una sola tarjeta de crédito",
          },
          { value: "No lo sabe", label: "No lo sabe" },
        ]}
        disabled={false}
      />

      <InputRadio
        name="question20"
        label="20°- ¿Qué tipo de cuenta suele utilizarse para el ahorro a corto plazo y gastos diarios?"
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
