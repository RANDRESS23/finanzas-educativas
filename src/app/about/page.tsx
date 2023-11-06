import { db } from "@/libs/prismaDB";
import { type InformationSchema } from "@prisma/client";
import { type Metadata } from "next";
import AboutSection from "./AboutSection";
import Team from "./Team";
import metaKeys from "@/meta/metaKeys";

export const metadata: Metadata = {
  title: "Finanzas Educativas | Nosotros",
};

export const dynamic = "force-dynamic";

export default async function About(): Promise<React.ReactElement> {
  const [aboutInfo] =
    (await db.informationSchema.findRaw()) as unknown as InformationSchema[];

  return (
    <>
      <div className="w-5 h-5 mt-[-70px]" />
      <main className="px-8 md:px-16 py-40">
        {metaKeys.map(({ svgName, title, key }) => (
          <AboutSection
            svgName={svgName}
            svgInLeftPosition
            title={title}
            description={aboutInfo[key][0]}
            moreDescription={aboutInfo[key][1]}
          />
        ))}

        <Team />
      </main>
    </>
  );
}
