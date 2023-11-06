import Image from "next/image";
import teamMembers from "@/meta/teamMembers";

export default function Team() {
  return (
    <div className="w-full mt-10">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
        <div className="text-center pb-12">
          <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-dark">
            Mira Nuestro equipo
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="w-full bg-gray-900 dark:bg-slate-800 hover:bg-gray-900/95 rounded-lg shadow-lg shadow-slate-950/40 p-12 relative overflow-hidden transition-colors duration-300"
            >
              <div className="flex flex-col justify-center items-center transform hover:scale-110 hover:brightness-105 transition-all duration-300 cursor-pointer">
                <div className="mb-8">
                  <Image
                    className="object-center object-cover rounded-full"
                    width={100}
                    height={76}
                    src={member.imageSrc}
                    alt="photo"
                  />
                </div>
                <div className="text-center">
                  <p className="text-xl text-white font-bold mb-2">
                    {member.name}
                  </p>
                  <p className="text-base text-gray-400 font-normal">
                    {member.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
