"use client";

import MetaModal from "@/components/Modals/MetaModal";
import P from "@/components/Skeletons/P";
import Round from "@/components/Skeletons/Round";
import api from "@/libs/api";
import { InformationSchema } from "@prisma/client";
import { AxiosError } from "axios";
import { cache, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LiaEdit as EditIcon } from "react-icons/lia";

export default function Meta() {
  const [aboutInfo, setAboutInfo] = useState<Partial<InformationSchema>>({
    id: "",
    whoami: ["", ""],
    mision: ["", ""],
    vision: ["", ""],
  });
  const [openWhoami, setOpenWhoami] = useState(false);
  const [openMision, setOpenMision] = useState(false);
  const [openVision, setOpenVision] = useState(false);
  const [isMetaLoading, setIsMetaLoading] = useState(true);

  const getAboutInfo = cache(async () => {
    try {
      const {
        data: {
          message: {
            _id: { $oid },
            mision,
            vision,
            whoami,
          },
        },
      } = await api("/admin/meta");
      setAboutInfo({ id: $oid, mision, vision, whoami });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error("Error cargando información.");
      }
    } finally {
      setIsMetaLoading(false);
    }
  });

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
              {isMetaLoading ? (
                <P />
              ) : (
                aboutInfo
                  .whoami![0].split(" ")
                  .slice(0, 4)
                  .join(" ")
                  .concat("...")
              )}
            </h3>
          </div>
          <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
            {isMetaLoading ? (
              <Round />
            ) : (
              <button
                onClick={() => setOpenWhoami(true)}
                className="rounded-full p-5 bg-green-100 hover:bg-green-200"
              >
                <EditIcon />
              </button>
            )}
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
              {isMetaLoading ? (
                <P />
              ) : (
                aboutInfo
                  .mision![0].split(" ")
                  .slice(0, 4)
                  .join(" ")
                  .concat("...")
              )}
            </h3>
          </div>
          <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
            {isMetaLoading ? (
              <Round />
            ) : (
              <button className="rounded-full p-5 bg-green-100 hover:bg-green-200">
                <EditIcon onClick={() => setOpenMision(true)} />
              </button>
            )}
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
              {isMetaLoading ? (
                <P />
              ) : (
                aboutInfo
                  .vision![0].split(" ")
                  .slice(0, 4)
                  .join(" ")
                  .concat("...")
              )}
            </h3>
          </div>
          <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
            {isMetaLoading ? (
              <Round />
            ) : (
              <button className="rounded-full p-5 bg-green-100 hover:bg-green-200">
                <EditIcon onClick={() => setOpenVision(true)} />
              </button>
            )}
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
