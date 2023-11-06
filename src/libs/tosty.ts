import {
  AiFillCheckCircle as SuccessIcon,
  AiFillWarning as WarnIcon,
} from "react-icons/ai";
import { BiSolidErrorCircle as ErrorIcon } from "react-icons/bi";
import { BsInfoCircleFill as InfoIcon } from "react-icons/bs";
import { type IconType } from "react-icons";
import { type ToastOptions } from "react-hot-toast";
import Tosty from "@/components/Custom/Tosty";

export type TostyProps = {
  icon?: {
    ReactIcon: IconType;
    color: "red" | "yellow" | "blue" | "green";
  };
  subject?: string;
  options?: ToastOptions;
  text: string;
};

type fnTosty = (
  text: TostyProps["text"],
  options?: Omit<TostyProps, "text">
) => string;
interface Tosty {
  success: fnTosty;
  warn: fnTosty;
  error: fnTosty;
  info: fnTosty;
}

export const tosty: Tosty = {
  success: (text, options) =>
    Tosty({
      ...options,
      text,
      icon: { ReactIcon: SuccessIcon, color: "green" },
    }),
  warn: (text, options) =>
    Tosty({
      ...options,
      text,
      icon: { ReactIcon: WarnIcon, color: "yellow" },
    }),
  error: (text, options) =>
    Tosty({
      ...options,
      text,
      icon: { ReactIcon: ErrorIcon, color: "red" },
    }),
  info: (text, options) =>
    Tosty({
      ...options,
      text,
      icon: { ReactIcon: InfoIcon, color: "blue" },
    }),
};
