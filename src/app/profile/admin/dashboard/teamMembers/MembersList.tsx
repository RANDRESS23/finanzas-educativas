import { db } from "@/libs/prismaDB";
import Image from "next/image";
import FormDeleteMemberTeam from "./FormDeleteMemberTeam";

export default async function MembersList() {
  const teamMembers = await db.teamMembers.findMany();

  if (teamMembers.length === 0) {
    return <div className="text-center text-9xl font-bold">0</div>;
  }

  return (
    <ul role="list" className="divide-y divide-gray-200">
      {teamMembers.map(({ cc, fullName, teamRole }, i) => (
        <li key={i} className="py-3 sm:py-4">
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
              <p className="text-sm text-gray-500 truncate">{teamRole}</p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-600 dark:text-gray-400">
              <FormDeleteMemberTeam cc={cc} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
