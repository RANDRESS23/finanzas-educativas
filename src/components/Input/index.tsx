import clsxe from "@/libs/clsxe";
import type {
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

type InputAttributes = React.JSX.IntrinsicElements["input"];

type InputProps = {
  label: string;
  register?: UseFormRegister<FieldValues>;
  errors?: FieldErrors<FieldValues>;
  inputProps: InputAttributes;
};

export default function Input({
  errors,
  label,
  register,
  inputProps,
}: InputProps) {
  return (
    <div>
      <label htmlFor={inputProps.id} className="block font-medium leading-6">
        {label}
      </label>
      <div className="mt-2 w-full">
        <input
          type={inputProps.type}
          id={inputProps.id}
          {...(register &&
            register(inputProps.id!, {
              required: "Este es un campo obligatorio!",
            }))}
          className={clsxe(
            errors && errors[inputProps.id!],
            inputProps.className,
          )}
          disabled={inputProps.disabled}
          spellCheck="false"
          {...inputProps}
        />
      </div>
      {errors && errors[inputProps.id!] !== undefined && (
        <p className="mt-2 text-sm text-rose-500">
          {errors[inputProps.id!]?.message as string}
        </p>
      )}
    </div>
  );
}
