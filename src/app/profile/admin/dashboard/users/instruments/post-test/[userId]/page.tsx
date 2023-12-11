import { db } from "@/libs/prismaDB";
import FormPostTest from "./FormPostTest";

interface IParams {
  params: { userId: string };
}

export default async function PostTestPage({ params: { userId } }: IParams) {
  const existingUser = await db.user.findUnique({
    select: { firstName: true, lastName: true },
    where: { id: userId },
  });

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 pb-12 lg:px-8 mb-10 py-20">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl md:max-w-3xl">
        <h2 className="mt-5 text-center text-3xl font-bold leading-9 tracking-tight">
          Respuestas post-test de {existingUser?.firstName}{" "}
          {existingUser?.lastName}
        </h2>
      </div>
      <div className="flex justify-center items-center gap-16 mt-7">
        <div className="pb-12 sm:mx-auto sm:w-full sm:max-w-xl md:max-w-5xl">
          <FormPostTest userId={userId} />
        </div>
      </div>
    </div>
  );
}
