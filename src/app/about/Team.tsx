import { db } from "@/libs/prismaDB";
import Image from "next/image";
import AtroposContainer from "../../containers/AtroposContainer";

export default async function Team() {
  const teamMembers = await db.teamMember.findMany({
    include: { team: { select: { teamName: true } } },
  });

  return (
    <article className="flex justify-center">
      <AtroposContainer
        atroposOpts={{
          rotateXMax: 2,
          rotateYMax: 2,
        }}
      >
        <div className="bg-white py-24 sm:py-32 dark:bg-slate-900 p-4 sm:p-6 h-full">
          <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Nuestro <span className="text-sushi-600">Equipo</span>
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                Somos un equipo comprometido, fusionando conocimiento y
                entusiasmo. Descubre quiénes somos y cómo trabajamos juntos para
                impulsar tu éxito financiero.
              </p>
            </div>
            <ul
              role="list"
              className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
            >
              {teamMembers.map(({ cc, fullName, team }) => (
                <li key={cc}>
                  <div className="flex items-center gap-x-6">
                    <Image
                      src={`https://guia.itfip.edu.co/sgacampus/images/dynamic/foto/1/${cc}/${cc}.jpg?width=1000&cut=1`}
                      alt={`${fullName} image`}
                      width={64}
                      height={64}
                      className="h-16 w-16 object-center object-cover rounded-full"
                    />
                    <div>
                      <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900 dark:text-white">
                        {fullName}
                      </h3>
                      <p className="text-sm font-semibold leading-6 text-sushi-600">
                        {team.teamName}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </AtroposContainer>
    </article>
  );
}
