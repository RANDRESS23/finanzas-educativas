"use client";

import { useEffect, useState } from "react";
import { PiMoonStarsFill as DarkIcon } from "react-icons/pi";
import { TbSunFilled as LightIcon } from "react-icons/tb";

export default function Toggler() {
  const [isDark, setIsDark] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDark(e.target.checked);
    window.localStorage.setItem("dark-mode", `${e.target.checked}`);
  };

  useEffect(() => {
    setIsDark(
      window.localStorage.getItem("dark-mode") === "true" ||
        (!("dark-mode" in window.localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );

    document.documentElement.classList[isDark ? "add" : "remove"]("dark");
  }, [isDark]);

  return (
    <div className="flex flex-col justify-center">
      <input
        type="checkbox"
        id="themeToggler"
        className="sr-only"
        onChange={handleChange}
        checked={isDark}
      />
      <label className="relative cursor-pointer -m-4" htmlFor="themeToggler">
        <DarkIcon className="text-xl dark:hidden" />
        <LightIcon className="text-xl hidden dark:block" />
        <span className="sr-only">Switch to light / dark version</span>
      </label>
    </div>
  );
}
