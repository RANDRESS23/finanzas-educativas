import { MetaProps } from "@/app/profile/admin/dashboard/page-content/Meta";
import { shorttxt } from "@/libs/shorttxt";
import metaKeys from "@/meta/metaKeys";
import { Dispatch, SetStateAction } from "react";

export const getMetaActions = (
  aboutInfo: MetaProps["aboutInfo"],
  handlers: Dispatch<SetStateAction<boolean>>[]
) => {
  const metaActions = metaKeys.map((keyItem, index) => ({
    ...keyItem,
    description: shorttxt(aboutInfo[keyItem.key]![0]),
    handleChange: () => handlers[index](true),
  }));

  return metaActions;
};
