import degradeDarkAvif from "@/assets/degrade-dark.avif";
import degradeDarkPng from "@/assets/degrade-dark@tinypng.png";
import degradeAvif from "@/assets/degrade.avif";
import degradePng from "@/assets/degrade@tinypng.png";

export default function Overflow() {
  return (
    <div className="fixed -z-40 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none">
      <div className="w-[108rem] flex-none flex justify-end">
        <picture>
          <source srcSet={degradeAvif.src} type="image/avif" />
          <img
            src={degradePng.src}
            alt=""
            className="w-[71.75rem] flex-none max-w-none dark:hidden"
            decoding="async"
          />
        </picture>
        <picture>
          <source srcSet={degradeDarkAvif.src} type="image/avif" />
          <img
            src={degradeDarkPng.src}
            alt=""
            className="w-[90rem] flex-none max-w-none hidden dark:block"
            decoding="async"
          />
        </picture>
      </div>
    </div>
  );
}
