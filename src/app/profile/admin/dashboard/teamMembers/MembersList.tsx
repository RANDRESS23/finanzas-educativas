import { db } from "@/libs/prismaDB";
import Image from "next/image";
import FormDeleteMemberTeam from "./FormDeleteMemberTeam";
import pkg from "@/../package.json";

export default async function MembersList() {
  const teamMembers = await db.teamMember.findMany({
    include: { team: { select: { teamName: true } } },
  });

  if (teamMembers.length === 0) {
    return (
      <article className="text-center">
        <div className="text-9xl font-bold">0</div>
        <span className="font-normal text-sm">
          Miembros en {pkg.description}
        </span>
      </article>
    );
  }

  return (
    <ul role="list" className="divide-y divide-gray-200">
      {teamMembers.map(({ cc, fullName, team, id }) => (
        <li key={id} className="py-3 sm:py-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <Image
                width={32}
                height={32}
                className="h-8 w-8 rounded-full"
                src={`https://guia.itfip.edu.co/sgacampus/images/dynamic/foto/1/${cc}/${cc}.jpg?width=1000&cut=1`}
                alt={`${fullName} image`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
                {fullName}
              </p>
              <p className="text-sm text-gray-500 truncate">{team.teamName}</p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-600 dark:text-gray-400">
              <FormDeleteMemberTeam memberId={id} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
