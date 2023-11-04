const InputShowPsw: React.FC<{
  set: (st: boolean) => void;
  checked: boolean;
  isLoading: boolean;
}> = ({ set, checked, isLoading }) => (
  <>
    <input
      type="checkbox"
      id="showPassword"
      className="accent-boston-blue-600 cursor-pointer bg-zinc-50 dark:bg-slate-800 disabled:cursor-not-allowed"
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

export default InputShowPsw;
