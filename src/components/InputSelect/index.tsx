interface InputSelectProps {
  name: string;
  label: string;
  register: any;
  errors: any;
  options: Array<{value: string | string[] | number, label: string}>;
}

export default function InputSelect({
  name,
  label,
  register,
  errors,
  options,
}: InputSelectProps): React.ReactNode {
  return (
    <div className="">
      <label
        htmlFor={name}
        className="block font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2 w-full">
        <select
          id={name}
          {...register(name, {
            required: "Este es un campo obligatorio!",
          })}
          className={`block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-[#008aae]
          ${
            errors[name] !== undefined
              ? "ring-rose-500"
              : "border-gray-300"
          }}
          ${
            errors[name] !== undefined
              ? "focus:outline-rose-500"
              : "focus:outline-[#008aae]"
          }`}
        >
          {
            options.map(({value, label}) => (
              <option key={label} value={value}>{label}</option>
            ))
          }
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
