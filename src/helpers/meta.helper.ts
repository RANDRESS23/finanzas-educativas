import { type MetaProps } from "@/app/profile/admin/dashboard/page-content/Meta";
import { shorttxt } from "@/libs/shorttxt";
import type { Dispatch, SetStateAction } from "react";

export const getMetaActions = (
  aboutInfo: MetaProps["aboutInfo"],
  handlers: Dispatch<SetStateAction<boolean>>[]
) => {
  const [whoamiHandler, misionHandler, visionHandler] = handlers;

  return [
    {
      key: "whoami",
      title: "Quienes Somos?",
      description: shorttxt(aboutInfo.whoami![0]),
      handleChange: () => whoamiHandler(true),
    },
    {
      key: "mision",
      title: "Misión",
      description: shorttxt(aboutInfo.mision![0]),
      handleChange: () => misionHandler(true),
    },
    {
      key: "vision",
      title: "Visión",
      description: shorttxt(aboutInfo.vision![0]),
      handleChange: () => visionHandler(true),
    },
  ];
};
