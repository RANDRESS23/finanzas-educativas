import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import Title from "@/components/Title";

export default async function ProfileUserPage() {
  const session = await getServerSession();

  if (session?.user?.email === "admin@gmail.com") {
    return redirect("/profile/admin");
  }

  return (
    <div className="mb-20">
      <div className="relative isolate px-6 pb-20 lg:py-0 lg:pl-36 lg:flex lg:justify-between lg:gap-10 lg:h-screen">
        <div className="max-w-xl h-screen lg:h-full flex flex-col justify-center items-start bg-white">
          <div className="flex mb-8 justify-center">
            <div className="relative rounded-full px-5 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Completar mi información personal.{" "}
              <Link
                href="/profile/user/personal-information"
                className="font-semibold text-[#008aae]"
              >
                <span className="absolute inset-0" aria-hidden="true" />
                Completar Perfil <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <div className="relative w-full">
            <h1 className="mb-5 sm:mb-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl w-full">
              Bienvenido a <span className='text-[#79ad34]'>¡Finanzas Educativas!</span> <Title text='¡Finanzas Educativas!' isTextStatic={false} />
            </h1>
            <p className="text-lg leading-8 text-gray-600 text-left">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
              fugiat aliqua.
            </p>
            <div className="mt-10 flex items-center justify-start gap-x-6">
              <Link
                href="/signup"
                className="rounded-md bg-[#008aae] hover:bg-[#79ad34] px-7 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-300"
              >
                REALIZAR TEST DE CONOCIMIENTO
              </Link>
            </div>
          </div>
        </div>
        <div className="relative">
          <Image
            width={500}
            height={400}
            src="https://images.unsplash.com/photo-1498758536662-35b82cd15e29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2102&q=80"
            alt=""
            className="object-cover lg:h-full w-[180%] h-auto aspect-square"
          />
        </div>
      </div>
    </div>
  );
}
