import clsx from "clsx";

interface InputCheckBoxProps {
  name: string;
  label: string;
  register: any;
  errors: any;
  options: { value: string; label: string }[];
  disabled: boolean;
}

export default function InputCheckBox({
  name,
  label,
  register,
  errors,
  options,
  disabled,
}: InputCheckBoxProps): React.ReactNode {
  return (
    <div>
      <label htmlFor={name} className="block font-medium leading-6">
        {label}
      </label>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {options.map(({ value, label }) => (
          <div key={value} className="relative flex gap-x-3">
            <div className="flex h-6 items-center">
              <input
                id={value}
                {...register(name)}
                type="checkbox"
                value={value}
                className="h-4 w-4 accent-boston-blue-600 cursor-pointer bg-zinc-50 dark:bg-slate-800 disabled:cursor-not-allowed"
                disabled={disabled}
              />
            </div>
            <div className="text-sm leading-6">
              <label
                htmlFor={value}
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
      {errors[name] !== undefined && (
        <p className="mt-2 text-sm text-rose-500">
          {errors[name].message as any}
        </p>
      )}
    </div>
  );
}
