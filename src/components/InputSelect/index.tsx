import clsxe from "@/libs/clsxe";
import type {
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

type InputSelectAttributes = React.JSX.IntrinsicElements["select"];

type InputSelectProps = {
  label: string;
  register?: UseFormRegister<FieldValues>;
  errors?: FieldErrors<FieldValues>;
  options: { value: string | string[] | number; label: string }[];
  selectProps: InputSelectAttributes;
};

export default function InputSelect({
  errors,
  label,
  register,
  options,
  selectProps,
}: InputSelectProps) {
  return (
    <div>
      <label htmlFor={selectProps.id} className="block font-medium leading-6">
        {label}
      </label>
      <div className="mt-2 w-full">
        <select
          id={selectProps.id}
          {...(register &&
            register(selectProps.id!, {
              required: "Este es un campo obligatorio!",
            }))}
          className={clsxe(
            errors && errors[selectProps.id!],
            "cursor-pointer " + selectProps.className,
          )}
          disabled={selectProps.disabled}
          {...selectProps}
        >
          {options.map(({ value, label }) => (
            <option key={label} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      {errors && errors[selectProps.id!] !== undefined && (
        <p className="mt-2 text-sm text-rose-500">
          {errors[selectProps.id!]?.message as string}
        </p>
      )}
    </div>
  );
}
