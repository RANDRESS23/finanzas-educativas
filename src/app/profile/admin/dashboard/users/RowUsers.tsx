import { type User } from "@prisma/client";

function RowUsers({ users }: { users: User[] }) {
  return users.map((u) => (
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
      <td className="p-4 whitespace-nowrap text-sm font-semibold">
        ${Math.floor(Math.random() * 10000)} USD
      </td>
    </tr>
  ));
}

export default RowUsers;
