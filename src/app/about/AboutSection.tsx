"use client";

import { useState } from "react";
import { AboutUs, Mision, Vision } from "./svgs";
import clsx from "clsx";
import {
  HiArrowNarrowUp as ArrowUpIcon,
  HiArrowNarrowDown as ArrowDownIcon,
} from "react-icons/hi";

const SVGS_IMAGES: Record<string, () => JSX.Element> = {
  ABOUT_US: () => <AboutUs />,
  MISION: () => <Mision />,
  VISION: () => <Vision />,
};

interface AboutSectionProps {
  svgName: string;
  svgInLeftPosition: boolean;
  title: string;
  description: string;
  moreDescription: string;
}

export default function AboutSection({
  svgName,
  svgInLeftPosition,
  title,
  description,
  moreDescription,
}: AboutSectionProps): React.ReactNode {
  const [viewMoreInfoVision, setViewMoreInfoVision] = useState(false);

  const handleViewMoreInfoVision = () => {
    setViewMoreInfoVision(!viewMoreInfoVision);
  };

  return (
    <section className="w-full md:flex md:justify-center md:items-center md:gap-16 mb-16">
      {svgInLeftPosition && (
        <div className="hidden md:block lg:w-96">{SVGS_IMAGES[svgName]()}</div>
      )}
      <div className="flex flex-col gap-3 w-full md:w-5/12">
        <h1 className="font-bold text-4xl text-sushi-500">{title}</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          {description}
        </p>
        {viewMoreInfoVision && (
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {moreDescription}
          </p>
        )}
        <button
          className="text-white font-bold py-2 px-6 mt-4 rounded-2xl transition-colors duration-300 flex justify-center items-center gap-x-2 bg-boston-blue-600 hover:bg-sushi-500"
          onClick={handleViewMoreInfoVision}
        >
          {viewMoreInfoVision
            ? "Ocultar Información extra"
            : "Mostrar más información"}
          <p
            className={clsx("text-xl", {
              "animate-bounce": !viewMoreInfoVision,
            })}
          >
            {viewMoreInfoVision ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </p>
        </button>
      </div>
      {!svgInLeftPosition && (
        <div className="hidden md:block lg:w-96">{SVGS_IMAGES[svgName]()}</div>
      )}
    </section>
  );
}
