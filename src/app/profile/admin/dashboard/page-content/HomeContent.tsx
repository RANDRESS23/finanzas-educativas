import { BiHomeAlt2 as HomeIcon } from "react-icons/bi";
import CardContent from "./CardContent";
import { HomeContent } from "@/types/home-content";

export const dynamic = "force-dynamic";

const getHomeContent = async () => {
  try {
    const homeContent = await fetch(
      `${process.env.NEXTAUTH_URL}/api/admin/home-content`,
    );
    const data = await homeContent.json();
    return data;
  } catch (error) {
    console.error({ error });
  }
};

export default async function HomeContent() {
  const {
    welcomeContent,
    knowledgePillsContent,
    informativeVideosContent,
  }: HomeContent = await getHomeContent();
  const welcomeDescription = welcomeContent.subtitle.slice(0, 30);
  const knowledgePillsDescription = knowledgePillsContent.subtitle.slice(0, 30);
  const informativeVideosDescription = informativeVideosContent.subtitle.slice(
    0,
    30,
  );

  return (
    <div className="flex">
      <div
        id="main-content"
        className="w-full dark:bg-slate-800/20 pt-20 pb-15 relative lg:ml-64"
      >
        <main>
          <div className="pt-6 px-7">
            <blockquote className="w-full flex items-center gap-3 text-2xl font-semibold leading-8 sm:leading-9 mb-10">
              <HomeIcon className="text-3xl" />
              <p className="">
                Editar información de{" "}
                <span className="text-sushi-500">Inicio</span>
              </p>
            </blockquote>
            <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <CardContent
                title="Bienvenida"
                description={`${welcomeDescription}...`}
                section="home"
              />
              <CardContent
                title="Pildoras de Conocimiento"
                description={`${knowledgePillsDescription}...`}
                section="home"
              />
              <CardContent
                title="Videos Informativos Educativos"
                description={`${informativeVideosDescription}...`}
                section="home"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
