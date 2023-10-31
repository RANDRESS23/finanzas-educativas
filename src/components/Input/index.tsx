interface InputProps {
  name: string;
  type: string;
  label: string;
  register: any;
  errors: any;
}

export default function Input({
  name,
  type,
  label,
  register,
  errors,
}: InputProps): React.ReactNode {
  return (
    <div>
      <label
        htmlFor={name}
        className="block font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          type={type}
          id={name}
          {...register(name, {
            required: "Este es un campo obligatorio!",
          })}
          className={`block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-[#008aae]
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
        />
      </div>
      {errors[name] !== undefined && (
        <p className="mt-2 text-sm text-rose-500">
          {errors[name].message as any}
        </p>
      )}
    </div>
  );
}
