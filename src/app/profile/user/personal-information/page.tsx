import pkg from "@/../package.json";
import Title from "@/components/Title";
import { authOptions } from "@/libs/authOptions";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import PersonalInfo from "./PersonalInfo";

export default async function PersonalInformationPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.email === "admin@gmail.com") {
    redirect("/profile/admin");
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 pb-12 lg:px-8 mb-10 py-20">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl md:max-w-3xl">
        <h2 className="mt-3 text-center text-3xl font-bold leading-9 tracking-tight">
          Completa tu perfíl en{" "}
          <Title text={`¡${pkg.description}!`} isTextStatic />
        </h2>
      </div>
      <div className="flex justify-center items-center gap-16 mt-7">
        <div className="pb-12">
          <PersonalInfo />
        </div>
      </div>
    </div>
  );
}
