"use client";

import MetaModal from "@/components/Modals/MetaModal";
import { getMetaActions } from "@/helpers/meta.helper";
import { type Meta } from "@prisma/client";
import { Fragment, useState } from "react";
import { LiaEdit as EditIcon } from "react-icons/lia";

export interface MetaProps {
  metaInfo: Partial<Meta>;
}

export const initialState = {
  whoami: false,
  mision: false,
  vision: false,
};

export default function Meta({ metaInfo }: MetaProps) {
  const [openMeta, setOpenMeta] = useState(initialState);

  const metaFeatures = getMetaActions(metaInfo, setOpenMeta);

  return metaFeatures.map(({ key, title, description, handleChange }) => (
    <Fragment key={key}>
      <div className="shadow dark:shadow-slate-700 rounded-lg p-4 sm:p-6 xl:p-8 ">
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
              className="rounded-full p-5 bg-sushi-400 hover:bg-sushi-300 transition-colors duration-300 enabled:active:bg-sushi-500"
            >
              <EditIcon />
            </button>
          </div>
        </div>
      </div>

      <MetaModal
        meta={key}
        description={title}
        metaInfo={metaInfo}
        open={openMeta[key]}
        setOpen={handleChange}
      />
    </Fragment>
  ));
}
