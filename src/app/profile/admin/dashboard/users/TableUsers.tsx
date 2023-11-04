import { db } from "@/libs/prismaDB";
import RowUsers from "./RowUsers";

async function TableUsers() {
  const users = await db.user.findMany();

  return (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800/20">
      <thead className="bg-gray-50 dark:bg-slate-800/50">
        <tr>
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
            Se unió en
          </th>
          <th
            scope="col"
            className="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
          >
            Dinero en proceso
          </th>
        </tr>
      </thead>
      <tbody>
        <RowUsers users={users} />
      </tbody>
    </table>
  );
}

export default TableUsers;
