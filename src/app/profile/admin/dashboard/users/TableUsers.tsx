import ThemeTooltip from "@/components/Tooltip/ThemeTooltip";
import RowUsers from "./RowUsers";

const cl = "origin-center w-32 top-5 capitalize text-sm";

export default function TableUsers() {
  return (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800/20">
      <thead className="bg-gray-50 dark:bg-slate-800/50">
        <tr>
          <th
            scope="col"
            className="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
          >
            No.
          </th>
          <th
            scope="col"
            className="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
          >
            Cédula
          </th>
          <th
            scope="col"
            className="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
          >
            Nombre usuario
          </th>
          <th
            scope="col"
            className="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
          >
            Email
          </th>
          <th
            scope="col"
            className="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
          >
            Teléfono
          </th>
          <th
            scope="col"
            className="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
          >
            2FA
          </th>
          <th
            scope="col"
            className="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
          >
            <ThemeTooltip message="Caracterizacíon completado" cl={cl}>
              Perfíl
            </ThemeTooltip>
          </th>
          <th
            scope="col"
            className="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
          >
            <ThemeTooltip message="Pre-Test completado" cl={cl}>
              Pre-Test
            </ThemeTooltip>
          </th>
          <th
            scope="col"
            className="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
          >
            <ThemeTooltip message="Post-Test completado" cl={cl}>
              Post-Test
            </ThemeTooltip>
          </th>
          <th
            scope="col"
            className="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
          >
            Se unió en
          </th>
          <th
            scope="col"
            className="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
          >
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        <RowUsers />
      </tbody>
    </table>
  );
}
