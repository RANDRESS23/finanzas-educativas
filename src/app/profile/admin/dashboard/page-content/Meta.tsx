"use client";

import MetaModal from "@/components/Modals/MetaModal";
import { shorttxt } from "@/libs/shorttxt";
import { InformationSchema } from "@prisma/client";
import { useState } from "react";
import { LiaEdit as EditIcon } from "react-icons/lia";

export default function Meta({
  aboutInfo,
}: {
  aboutInfo: Partial<InformationSchema>;
}) {
  const [openWhoami, setOpenWhoami] = useState(false);
  const [openMision, setOpenMision] = useState(false);
  const [openVision, setOpenVision] = useState(false);

  return (
    <>
      <div className="shadow dark:shadow-slate-700 rounded-lg p-4 sm:p-6 xl:p-8 ">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className="text-2xl sm:text-3xl leading-none font-bold">
              Quienes Somos?
            </span>
            <h3 className="text-sm font-normal text-gray-500 dark:text-gray-300 whitespace-nowrap overflow-hidden animate-typing">
              {shorttxt(aboutInfo.whoami![0])}
            </h3>
          </div>
          <div className="ml-5 w-0 flex items-center justify-end flex-1 text-base font-bold">
            <button
              onClick={() => setOpenWhoami(true)}
              className="rounded-full p-5 bg-sushi-400 hover:bg-sushi-300"
            >
              <EditIcon />
            </button>
          </div>
        </div>
      </div>
      <div className="shadow dark:shadow-slate-700 rounded-lg p-4 sm:p-6 xl:p-8 ">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className="text-2xl sm:text-3xl leading-none font-bold">
              Misión
            </span>
            <h3 className="text-sm font-normal text-gray-500 dark:text-gray-300 whitespace-nowrap overflow-hidden animate-typing">
              {shorttxt(aboutInfo.mision![0])}
            </h3>
          </div>
          <div className="ml-5 w-0 flex items-center justify-end flex-1 text-base font-bold">
            <button className="rounded-full p-5 bg-sushi-400 hover:bg-sushi-300">
              <EditIcon onClick={() => setOpenMision(true)} />
            </button>
          </div>
        </div>
      </div>
      <div className="shadow dark:shadow-slate-700 rounded-lg p-4 sm:p-6 xl:p-8 ">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className="text-2xl sm:text-3xl leading-none font-bold">
              Visión
            </span>
            <h3 className="text-base font-normal text-gray-500 dark:text-gray-300 whitespace-nowrap overflow-hidden animate-typing">
              {shorttxt(aboutInfo.vision![0])}
            </h3>
          </div>
          <div className="ml-5 w-0 flex items-center justify-end flex-1 text-base font-bold">
            <button className="rounded-full p-5 bg-sushi-400 hover:bg-sushi-300">
              <EditIcon onClick={() => setOpenVision(true)} />
            </button>
          </div>
        </div>
      </div>

      <MetaModal
        meta={"whoami" as any}
        description="Quienes somos"
        aboutInfo={aboutInfo}
        open={openWhoami}
        setOpen={setOpenWhoami}
      />
      <MetaModal
        meta={"mision" as any}
        description="Misión"
        aboutInfo={aboutInfo}
        open={openMision}
        setOpen={setOpenMision}
      />
      <MetaModal
        meta={"vision" as any}
        description="Visión"
        aboutInfo={aboutInfo}
        open={openVision}
        setOpen={setOpenVision}
      />
    </>
  );
}
