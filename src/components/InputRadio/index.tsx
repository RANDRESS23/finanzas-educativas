interface InputRadioProps {
  name: string;
  label: string;
  register: any;
  options: Array<{value: string | boolean, label: string}>;
}

export default function InputRadio({
  name,
  label,
  register,
  options,
}: InputRadioProps): React.ReactNode {
  return (
    <div>
      <label
        htmlFor={name}
        className="block font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-4 flex gap-5">
        {
          options.map(({value, label}) => (
            <div key={label} className="relative flex gap-x-3">
              <div className="flex h-6 items-center">
                <input
                  id={label}
                  {...register(name)} 
                  type="radio"
                  value={value}
                  className="h-4 w-4 rounded border-gray-300 text-[#008aae] focus:ring-[#008aae]"
                />
              </div>
              <div className="text-sm leading-6">
                <label htmlFor={label} className="font-medium text-gray-900">
                  {label}
                </label>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
