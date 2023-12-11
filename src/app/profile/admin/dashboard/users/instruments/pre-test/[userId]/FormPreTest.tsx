"use client";

import InputRadio from "@/components/InputRadio";
import api from "@/libs/api";
import { UserPreTest } from "@prisma/client";
import { useEffect, useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";

interface IProps {
  userId: string;
}

const initialState = {
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
};

export default function FormPreTest({ userId }: IProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState<
    { [key: string]: string } | typeof initialState
  >(initialState);

  const { register } = useForm<FieldValues>({ defaultValues: initialState });

  useEffect(() => {
    (async () => {
      try {
        const response = await api<UserPreTest>(`/user/pre-test/${userId}`);

        if (response.status === 404) {
          return console.error({ error: "No hay datos del usuario" });
        }

        const { data } = response;

        // Objeto acumulador para todas las preguntas y respuestas
        let updatedQuestions = { ...questions };

        // Mapeo para la primera dimensión
        data.questionsFirstDimension.forEach(item => {
          updatedQuestions = {
            ...updatedQuestions,
            [item.question]: item.answer,
          };
        });

        // Mapeo para la segunda dimensión
        data.questionsSecondDimension.forEach(item => {
          updatedQuestions = {
            ...updatedQuestions,
            [item.question]: item.answer,
          };
        });

        // Mapeo para la tercera dimensión
        data.questionsThirdDimension.forEach(item => {
          updatedQuestions = {
            ...updatedQuestions,
            [item.question]: item.answer,
          };
        });

        // Actualizar el estado una vez con todas las preguntas y respuestas
        setQuestions(updatedQuestions);
      } catch (error) {
        console.error({ error });
      } finally {
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className="top-0 left-0 right-0 flex justify-center mt-20">
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
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-xl md:max-w-5xl">
        <h2 className="mt-5 text-2xl font-bold tracking-tight mb-2">
          <span className="text-boston-blue-600">Dimensión 1:</span>{" "}
          Conocimiento de las{" "}
          <span className="text-sushi-600">Finanzas Personales</span>
        </h2>
      </div>

      <form className="flex flex-col sm:grid md:grid-cols-2 gap-7 md:gap-10 md:place-content-center w-full">
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
          ].map(opt =>
            opt.value === questions.question1 ? { ...opt, checked: true } : opt,
          )}
          disabled
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
          ].map(opt =>
            opt.value === questions.question2 ? { ...opt, checked: true } : opt,
          )}
          disabled
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
          ].map(opt =>
            opt.value === questions.question3 ? { ...opt, checked: true } : opt,
          )}
          disabled
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
          ].map(opt =>
            opt.value === questions.question4 ? { ...opt, checked: true } : opt,
          )}
          disabled
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
          ].map(opt =>
            opt.value === questions.question5 ? { ...opt, checked: true } : opt,
          )}
          disabled
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
          ].map(opt =>
            opt.value === questions.question6 ? { ...opt, checked: true } : opt,
          )}
          disabled
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
          ].map(opt =>
            opt.value === questions.question7 ? { ...opt, checked: true } : opt,
          )}
          disabled
        />

        <h2 className="mt-10 text-2xl font-bold tracking-tight -mb-3 lg:-mb-7 col-span-2">
          <span className="text-boston-blue-600">Dimensión 2:</span> Toma de{" "}
          <span className="text-sushi-600">Decisiones Financieras</span>{" "}
          (Resolución de problemas)
        </h2>

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
          ].map(opt =>
            opt.value === questions.question8 ? { ...opt, checked: true } : opt,
          )}
          disabled
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
          ].map(opt =>
            opt.value === questions.question9 ? { ...opt, checked: true } : opt,
          )}
          disabled
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
          ].map(opt =>
            opt.value === questions.question10
              ? { ...opt, checked: true }
              : opt,
          )}
          disabled
        />

        <InputRadio
          name="question11"
          label="11°- Cuenta con un fondo de emergencias para contar con suficiente dinero en caso de un imprevisto o calamidad"
          register={register}
          options={[
            { value: "Sí", label: "Sí" },
            { value: "No", label: "No" },
          ].map(opt =>
            opt.value === questions.question11
              ? { ...opt, checked: true }
              : opt,
          )}
          disabled
        />

        <h2 className="mt-10 text-2xl font-bold tracking-tight -mb-3 lg:-mb-7 col-span-2">
          <span className="text-boston-blue-600">Dimensión 3:</span>{" "}
          Administración de{" "}
          <span className="text-sushi-600">Finanzas Propias</span>
        </h2>

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
          ].map(opt =>
            opt.value === questions.question12
              ? { ...opt, checked: true }
              : opt,
          )}
          disabled
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
          ].map(opt =>
            opt.value === questions.question13
              ? { ...opt, checked: true }
              : opt,
          )}
          disabled
        />

        <InputRadio
          name="question14"
          label="14°- En la organización de sus gastos (presupuesto personal), ¿Qué respuesta o afirmación es verdadera?"
          register={register}
          options={[
            {
              value:
                "Un presupuesto es innecesario si tienes ingresos estables",
              label:
                "Un presupuesto es innecesario si tienes ingresos estables",
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
          ].map(opt =>
            opt.value === questions.question14
              ? { ...opt, checked: true }
              : opt,
          )}
          disabled
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
          ].map(opt =>
            opt.value === questions.question15
              ? { ...opt, checked: true }
              : opt,
          )}
          disabled
        />
      </form>
    </>
  );
}
