"use client";

import MetaModal, { META } from "@/components/Modals/MetaModal";
import { getMetaActions } from "@/helpers/meta.helper";
import { type InformationSchema } from "@prisma/client";
import { useState } from "react";
import { LiaEdit as EditIcon } from "react-icons/lia";

export interface MetaProps {
  aboutInfo: Partial<InformationSchema>;
}

export default function Meta({ aboutInfo }: MetaProps) {
  const [openWhoami, setOpenWhoami] = useState(false);
  const [openMision, setOpenMision] = useState(false);
  const [openVision, setOpenVision] = useState(false);

  const metaFeatures = getMetaActions(aboutInfo, [
    setOpenWhoami,
    setOpenMision,
    setOpenVision,
  ]);

  return (
    <>
      {metaFeatures.map(({ key, title, description, handleChange }) => (
        <div
          key={key}
          className="shadow dark:shadow-slate-700 rounded-lg p-4 sm:p-6 xl:p-8 "
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl sm:text-3xl leading-none font-bold">
                {title}
              </span>
              <h3 className="text-sm font-normal text-gray-500 dark:text-gray-300 whitespace-nowrap overflow-hidden animate-typing">
                {description}
              </h3>
            </div>
            <div className="ml-5 w-0 flex items-center justify-end flex-1 text-base font-bold">
              <button
                onClick={handleChange}
                className="rounded-full p-5 bg-sushi-400 hover:bg-sushi-300 transition-colors duration-300"
              >
                <EditIcon />
              </button>
            </div>
          </div>
        </div>
      ))}

      <MetaModal
        meta={"whoami" as META.whoami}
        description="Quienes somos"
        aboutInfo={aboutInfo}
        open={openWhoami}
        setOpen={setOpenWhoami}
      />
      <MetaModal
        meta={"mision" as META.mision}
        description="Misión"
        aboutInfo={aboutInfo}
        open={openMision}
        setOpen={setOpenMision}
      />
      <MetaModal
        meta={"vision" as META.vision}
        description="Visión"
        aboutInfo={aboutInfo}
        open={openVision}
        setOpen={setOpenVision}
      />
    </>
  );
}
