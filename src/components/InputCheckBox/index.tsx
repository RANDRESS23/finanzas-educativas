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
  disabled
}: InputCheckBoxProps): React.ReactNode {
  return (
    <div>
      <label
        htmlFor={name}
        className="block font-medium leading-6 text-gray-900"
      >
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
                className="h-4 w-4 rounded border-gray-300 text-[#008aae] focus:ring-[#008aae]"
                disabled={disabled}
              />
            </div>
            <div className="text-sm leading-6">
              <label htmlFor={value} className={`font-medium ${disabled ? "text-gray-600" : "text-gray-900"}`}>
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
