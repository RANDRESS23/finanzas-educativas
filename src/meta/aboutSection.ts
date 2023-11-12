import { AboutUs, Mision, Vision } from "@/app/about/svgs";

const SVGS_IMAGES = {
  ABOUT_US: AboutUs,
  MISION: Mision,
  VISION: Vision,
};

export { SVGS_IMAGES };
export type TSvgName = keyof typeof SVGS_IMAGES;
