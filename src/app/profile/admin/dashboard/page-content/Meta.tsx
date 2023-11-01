"use client";

import MetaModal from "@/components/Modals/MetaModal";
import { LiaEdit as EditIcon } from "react-icons/lia";
import { useEffect, useState } from "react";
import api from "@/libs/api";

export default function Meta() {
  const [aboutInfo, setAboutInfo] = useState({
    whoami: "",
    mision: "",
    vision: "",
  });
  const [openWhoami, setOpenWhoami] = useState(false);
  const [openMision, setOpenMision] = useState(false);
  const [openVision, setOpenVision] = useState(false);

  const getAboutInfo = async () => {
    const {
      data: {
        message: {
          mision: [mision],
          vision: [vision],
          whoami: [whoami],
        },
      },
    } = await api("/admin/meta");
    setAboutInfo({ mision, vision, whoami });
  };

  useEffect(() => {
    getAboutInfo();
  }, []);

  return (
    <>
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
              Quienes Somos?
            </span>
            <h3 className="text-base font-normal text-gray-500">
              {aboutInfo.whoami.split(" ").slice(0, 4).join(" ")}...
            </h3>
          </div>
          <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
            <button
              onClick={() => setOpenWhoami(true)}
              className="rounded-full p-5 bg-green-100 hover:bg-green-200"
            >
              <EditIcon />
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
              Misión
            </span>
            <h3 className="text-base font-normal text-gray-500">
              {aboutInfo.mision.split(" ").slice(0, 4).join(" ")}...
            </h3>
          </div>
          <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
            <button className="rounded-full p-5 bg-green-100 hover:bg-green-200">
              <EditIcon onClick={() => setOpenMision(true)} />
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
              Visión
            </span>
            <h3 className="text-base font-normal text-gray-500">
              {aboutInfo.vision.split(" ").slice(0, 4).join(" ")}...
            </h3>
          </div>
          <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
            <button className="rounded-full p-5 bg-green-100 hover:bg-green-200">
              <EditIcon onClick={() => setOpenVision(true)} />
            </button>
          </div>
        </div>
      </div>

      <MetaModal
        meta={"whoami" as any}
        description="Quienes somos"
        open={openWhoami}
        setOpen={setOpenWhoami}
      />
      <MetaModal
        meta={"mision" as any}
        description="Misión"
        open={openMision}
        setOpen={setOpenMision}
      />
      <MetaModal
        meta={"vision" as any}
        description="Visión"
        open={openVision}
        setOpen={setOpenVision}
      />
    </>
  );
}
