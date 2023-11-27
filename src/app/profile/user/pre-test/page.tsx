import { authOptions } from "@/libs/authOptions";
import Title from "@/components/Title";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import FormPreTestD1 from "./FormPreTestD1";

export default async function PreTestPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.email === "admin@gmail.com") {
    redirect("/profile/admin");
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 pb-12 lg:px-8 mb-10 py-20">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl md:max-w-3xl">
        <h2 className="mt-5 text-center text-3xl font-bold leading-9 tracking-tight">
          Completa tu pre-test en{" "}
          <Title text="¡Finanzas Educativas!" isTextStatic />
        </h2>
      </div>
      <div className="flex justify-center items-center gap-16 mt-7">
        <div className="pb-12 sm:mx-auto sm:w-full sm:max-w-xl md:max-w-5xl">
          <div className="sm:mx-auto sm:w-full sm:max-w-xl md:max-w-5xl">
            <h2 className="mt-5 text-2xl font-bold tracking-tight mb-2">
              <span className="text-boston-blue-600">Dimensión 1:</span> Conocimiento de las{" "}
              <span className="text-sushi-600">Finanzas Personales</span>
            </h2>
            <p className="text-lg font-normal mb-5 mx-auto w-full">
              Esta dimensión busca determinar el nivel de comprensión y conocimiento de los participantes con relación a los conceptos básicos de las finanzas personales, aplicados en las diferentes actividades de la cotidianidad de los participantes.
            </p>
            <p className="text-lg font-normal mb-5 mx-auto w-full">
              A continuación, indique que tan probable es que conozca o realice las siguientes actividades:
            </p>
          </div>
          <FormPreTestD1 />
        </div>
      </div>
    </div>
  );
}
