import { db } from "@/libs/prismaDB";
import { notFound } from "next/navigation";

async function RowUsers() {
  const users = await db.user.findMany();

  if (!users) {
    notFound();
  }

  return users.map(u => (
    <tr key={u.id}>
      <td className="p-4 whitespace-nowrap text-sm font-normal">
        {`${u.firstName} ${u.lastName}`.toUpperCase()}
      </td>
      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500 dark:text-gray-400">
        {u.email}
      </td>
      <td className="p-4 whitespace-nowrap text-sm font-semibold">
        {new Date(u.createdAt).toLocaleString()}
      </td>
    </tr>
  ));
}

export default RowUsers;
