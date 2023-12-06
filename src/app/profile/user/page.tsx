import { authOptions } from "@/libs/authOptions";
import Title from "@/components/Title";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import ButtonRedirectPreTest from "@/components/ButtonRedirectPreTest";
import ButtonRedirectPostTest from "@/components/ButtonRedirectPostTest";

const isUserAnwseredPreTest = async (idUser: string) => {
  try {
    const existUserPreTestInfo = await fetch(
      `${process.env.NEXTAUTH_URL}/api/user/pre-test/${idUser}`,
    );
    const data = await existUserPreTestInfo.json();

    return data.id ? true : false;
  } catch (error) {
    console.log({ error });
  }
};

const isUserAnwseredPostTest = async (idUser: string) => {
  try {
    const existUserPostTestInfo = await fetch(
      `${process.env.NEXTAUTH_URL}/api/user/post-test/${idUser}`,
    );
    const data = await existUserPostTestInfo.json();

    return data.id ? true : false;
  } catch (error) {
    console.log({ error });
  }
};

export default async function ProfileUserPage() {
  const session = await getServerSession(authOptions);
  const isUserAnwseredPreTestInApp = await isUserAnwseredPreTest(
    session?.user.id,
  );
  const isUserAnwseredPostTestInApp = await isUserAnwseredPostTest(
    session?.user.id,
  );

  if (session?.user?.email === "admin@gmail.com") {
    redirect("/profile/admin");
  }

  return (
    <div className="mb-20">
      <div className="relative isolate px-6 pb-20 lg:py-0 lg:pl-36 lg:flex lg:justify-between lg:gap-10 lg:h-screen">
        <div className="max-w-xl h-screen lg:h-full flex flex-col justify-center items-center">
          <div className="flex mb-8 justify-center">
            <div className="relative rounded-full px-5 py-1 text-sm leading-6 text-gray-600 dark:text-gray-400 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:ring-zinc-200/10 dark:hover:ring-gray-200/20 text-center">
              Completar mi información personal.{" "}
              <Link
                href="/profile/user/personal-information"
                className="font-semibold text-boston-blue-600"
              >
                <span className="absolute inset-0" aria-hidden="true" />
                Completar Perfíl <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <div className="relative text-center">
            <h1 className="mb-5 sm:mb-10 text-4xl font-bold tracking-tight sm:text-6xl w-full">
              <span className="block w-full">Bienvenido a </span>
              <span className="text-sushi-500">¡Finanzas Educativas!</span>{" "}
              <Title />
            </h1>
            <p className="text-lg leading-8 text-gray-600 dark:text-gray-400">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
              fugiat aliqua.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              {isUserAnwseredPreTestInApp && isUserAnwseredPostTestInApp ? (
                <></>
              ) : isUserAnwseredPreTestInApp ? (
                <ButtonRedirectPostTest />
              ) : (
                <ButtonRedirectPreTest idUser={session?.user.id} />
              )}
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 relative rounded-lg overflow-hidden flex justify-center items-center">
          <Image
            width={500}
            height={400}
            src="https://images.unsplash.com/photo-1498758536662-35b82cd15e29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2102&q=80"
            alt="photo"
            className="object-cover aspect-square transform hover:scale-105 hover:brightness-105 transition-all duration-300 cursor-pointer rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
