import clsxe from "@/libs/clsxe";

interface InputSelectProps {
  name: string;
  label: string;
  register: any;
  errors: any;
  options: { value: string | string[] | number; label: string }[];
  disabled?: boolean;
}

export default function InputSelect({
  name,
  label,
  register,
  errors,
  options,
  disabled,
}: InputSelectProps): React.ReactNode {
  return (
    <div>
      <label htmlFor={name} className="block font-medium leading-6">
        {label}
      </label>
      <div className="mt-2 w-full">
        <select
          id={name}
          {...register(name, {
            required: "Este es un campo obligatorio!",
          })}
          className={clsxe(errors[name])}
          disabled={disabled}
        >
          {options.map(({ value, label }) => (
            <option key={label} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      {errors[name] !== undefined && (
        <p className="mt-2 text-sm text-rose-500">
          {errors[name].message as any}
        </p>
      )}
    </div>
  );
}
