import { db } from "@/libs/prismaDB";
import { notFound } from "next/navigation";
import { BiHomeAlt2 as HomeIcon } from "react-icons/bi";
import Meta from "./Meta";

export const dynamic = "force-dynamic";

export default async function HomeContent() {
  const [metaInfo] = await db.meta.findMany();

  if (!metaInfo) {
    notFound();
  }

  const { id, whoami, mision, vision } = metaInfo;

  return (
    <div className="flex">
      <div
        id="main-content"
        className="w-full dark:bg-slate-800/20 pt-20 pb-15 relative lg:ml-64"
      >
        <main>
          <div className="pt-6 px-7">
            <blockquote className="w-full flex items-center gap-3 text-2xl font-semibold leading-8 sm:text-3xl sm:leading-9 mb-10">
              <HomeIcon className="text-6xl md:text-4xl" />
              <p className="">
                Editar información de <span className="text-sushi-500">Inicio</span>
              </p>
            </blockquote>
            <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <Meta metaInfo={{ id, mision, vision, whoami }} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
