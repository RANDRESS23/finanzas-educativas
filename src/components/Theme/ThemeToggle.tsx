import { useTheme } from "next-themes";
import { PiMoonStarsFill as DarkIcon } from "react-icons/pi";
import { TbSunFilled as LightIcon } from "react-icons/tb";

export default function ThemeToggle({ id }: { id: string }) {
  const { theme, setTheme } = useTheme();

  const handleChange = () => setTheme(theme === "dark" ? "ligth" : "dark");

  return (
    <div className="flex flex-col justify-center">
      <input
        type="checkbox"
        id={id}
        className="sr-only"
        checked={theme === "light"}
        onChange={handleChange}
      />
      <label className="relative cursor-pointer -m-4" htmlFor={id}>
        <DarkIcon className="text-xl dark:hidden" />
        <LightIcon className="text-xl hidden dark:block" />
        <span className="sr-only">Switch to light / dark version</span>
      </label>
    </div>
  );
}
