import { db } from "@/libs/prismaDB";
import { InformationSchema } from "@prisma/client";
import { type Metadata } from "next";
import AboutSection from "./AboutSection";
import Team from "./Team";

export const metadata: Metadata = {
  title: "Finanzas Educativas | Nosotros",
};

export const revalidate = "5";

export default async function About(): Promise<React.ReactElement> {
  const [aboutInfo] =
    (await db.informationSchema.findRaw()) as unknown as Array<InformationSchema>;
  const {
    whoami: [whoami, moreWhoami],
    mision: [mision, moreMision],
    vision: [vision, moreVision],
  } = aboutInfo;

  return (
    <>
      <div id="quienesSomos" className="w-5 h-5 mt-[-70px]" />
      <main className="px-8 md:px-16 py-40">
        <AboutSection
          svgName="ABOUT_US"
          svgInLeftPosition
          title="¿Quienes somos?"
          description={whoami}
          moreDescription={moreWhoami}
        />
        <div id="mision" />
        <AboutSection
          svgName="MISION"
          svgInLeftPosition={false}
          title="Misión"
          description={mision}
          moreDescription={moreMision}
        />
        <div id="vision" />
        <AboutSection
          svgName="VISION"
          svgInLeftPosition
          title="Visión"
          description={vision}
          moreDescription={moreVision}
        />
        <div id="team" />
        <Team />
      </main>
    </>
  );
}
