import clsx from "clsx";

interface InputRadioProps {
  name: string;
  label: string;
  register: any;
  options: { value: string | boolean; label: string }[];
  disabled: boolean;
}

export default function InputRadio({
  name,
  label,
  register,
  options,
  disabled,
}: InputRadioProps) {
  return (
    <div>
      <span className="block font-medium leading-6">{label}</span>
      <div className="mt-4 flex gap-5">
        {options.map(({ value, label }) => (
          <div key={label} className="relative flex gap-x-3">
            <div className="flex h-6 items-center">
              <input
                id={label}
                {...register(name)}
                type="radio"
                value={value}
                className="h-4 w-4 bg-white dark:bg-slate-900 border-gray-300 dark:border-gray-400 text-boston-blue-600 dark:text-boston-blue-600 focus:ring-boston-blue-600 dark:focus:ring-boston-blue-600 cursor-pointer disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:checked:bg-boston-blue-600/60 dark:disabled:checked:bg-boston-blue-600/60 checked:bg-boston-blue-600 dark:checked:bg-boston-blue-600 dark:disabled:opacity-70 hover:border-gray-400 dark:hover:border-gray-300 disabled:cursor-not-allowed"
                disabled={disabled}
              />
            </div>
            <div className="text-sm leading-6">
              <label
                htmlFor={label}
                className={clsx("font-medium", {
                  "text-gray-600 dark:text-gray-400": disabled,
                })}
              >
                {label}
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
