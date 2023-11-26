import {
  type MetaProps,
  initialState,
} from "@/app/profile/admin/dashboard/page-content/Meta";
import { shorttxt } from "@/libs/shorttxt";
import metaKeys from "@/meta/metaKeys";
import type { Dispatch, SetStateAction } from "react";

export const getMetaActions = (
  aboutInfo: MetaProps["metaInfo"],
  setOpenMeta: Dispatch<SetStateAction<typeof initialState>>,
) => {
  const metaActions = metaKeys.map(keyItem => ({
    ...keyItem,
    description: shorttxt(aboutInfo[keyItem.key]![0]),
    handleChange: () =>
      setOpenMeta(st => ({ ...st, [keyItem.key]: !st[keyItem.key] })),
  }));

  return metaActions;
};
