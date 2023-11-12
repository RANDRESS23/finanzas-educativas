import { META } from "@/types/TMeta";
import type { TSvgName } from "@/meta/aboutSection";

interface MetaKey {
  key: META;
  title: string;
  svgName: TSvgName;
}

const metaKeys: MetaKey[] = [
  { key: META.whoami, title: "Quienes Somos?", svgName: "ABOUT_US" },
  { key: META.mision, title: "Misión", svgName: "MISION" },
  { key: META.vision, title: "Visión", svgName: "VISION" },
];

export default metaKeys;
