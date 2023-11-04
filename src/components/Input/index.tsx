import clsxe from "@/libs/clsxe";

interface InputProps {
  name: string;
  type: React.JSX.IntrinsicElements["input"]["type"];
  label: string;
  register: any;
  errors: any;
  disabled?: boolean;
}

export default function Input({
  name,
  type,
  label,
  register,
  errors,
  disabled,
}: InputProps): React.ReactNode {
  return (
    <div>
      <label htmlFor={name} className="block font-medium leading-6">
        {label}
      </label>
      <div className="mt-2 w-full">
        <input
          type={type}
          id={name}
          {...register(name, {
            required: "Este es un campo obligatorio!",
          })}
          className={clsxe(errors[name])}
          disabled={disabled}
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
