import pkg from "@/../package.json";
import { db } from "@/libs/prismaDB";
import metaKeys from "@/meta/metaKeys";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import AboutSection from "./AboutSection";
import Team from "./Team";

export const metadata: Metadata = {
  title: `${pkg.description} | Nosotros`,
};

export const dynamic = "force-dynamic";

export default async function About() {
  const [metaInfo] = await db.meta.findMany();

  if (!metaInfo) {
    notFound();
  }

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
