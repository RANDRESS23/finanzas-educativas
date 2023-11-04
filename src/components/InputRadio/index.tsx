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
}: InputRadioProps): React.ReactNode {
  return (
    <div>
      <label htmlFor={name} className="block font-medium leading-6">
        {label}
      </label>
      <div className="mt-4 flex gap-5">
        {options.map(({ value, label }) => (
          <div key={label} className="relative flex gap-x-3">
            <div className="flex h-6 items-center">
              <input
                id={label}
                {...register(name)}
                type="radio"
                value={value}
                className="h-4 w-4 accent-boston-blue-600 cursor-pointer bg-zinc-50 dark:bg-slate-800 disabled:cursor-not-allowed"
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
