import Image from "next/image";
import teamMembers from "@/meta/teamMembers";

export default function Team() {
  return (
    <div className="bg-white py-24 sm:py-32 dark:bg-slate-900">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Nuestro <span className="text-sushi-600">Equipo</span></h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
            Libero fames augue nisl porttitor nisi, quis. Id ac elit odio vitae elementum enim vitae ullamcorper
            suspendisse.
          </p>
        </div>
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {teamMembers.map(({ name, role, imageSrc }) => (
            <li key={name}>
              <div className="flex items-center gap-x-6">
                <Image 
                  src={imageSrc} 
                  alt="" 
                  width={64} 
                  height={64}
                  className="h-16 w-16 object-center object-cover rounded-full" />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900 dark:text-white">{name}</h3>
                  <p className="text-sm font-semibold leading-6 text-sushi-600">{role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
