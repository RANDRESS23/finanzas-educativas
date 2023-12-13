interface IProps {
  set: (st: boolean) => void;
  checked: boolean;
  isLoading: boolean;
}

export default function ChkbxPsw({ set, checked, isLoading }: IProps) {
  return (
    <>
      <input
        type="checkbox"
        id="showPassword"
        className="h-4 w-4 rounded-md bg-white dark:bg-slate-900 border-gray-300 dark:border-gray-400 text-boston-blue-600 dark:text-boston-blue-600 focus:ring-boston-blue-600 dark:focus:ring-boston-blue-600 cursor-pointer disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:checked:bg-boston-blue-600/60 dark:disabled:checked:bg-boston-blue-600/60 checked:bg-boston-blue-600 dark:checked:bg-boston-blue-600 dark:disabled:opacity-70 hover:border-gray-400 dark:hover:border-gray-300 disabled:cursor-not-allowed"
        onChange={() => set(!checked)}
        checked={checked}
        disabled={isLoading}
      />
      <label
        htmlFor="showPassword"
        className="text-gray-600 dark:text-gray-500 ml-2 mb-1 text-sm"
      >
        Mostrar contraseña
      </label>
    </>
  );
}
