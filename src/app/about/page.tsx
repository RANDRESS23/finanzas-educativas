import { db } from "@/libs/prismaDB";
import metaKeys from "@/meta/metaKeys";
import { type Metadata } from "next";
import AboutSection from "./AboutSection";
import Team from "./Team";

export const metadata: Metadata = {
  title: "Finanzas Educativas | Nosotros",
};

export const dynamic = "force-dynamic";

export default async function About(): Promise<React.ReactElement> {
  const [metaInfo] = await db.meta.findMany();

  return (
    <>
      <div className="w-5 h-5 mt-[-70px]" />
      <main className="px-8 md:px-16 py-40">
        {metaKeys.map(({ svgName, title, key }) => (
          <AboutSection
            key={key}
            svgName={svgName}
            svgInLeftPosition
            title={title}
            description={metaInfo[key][0]}
            moreDescription={metaInfo[key][1]}
          />
        ))}

        <Team />
      </main>
    </>
  );
}
