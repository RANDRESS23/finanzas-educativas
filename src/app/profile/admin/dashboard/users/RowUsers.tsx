import { db } from "@/libs/prismaDB";
import { Role } from "@prisma/client";
import { notFound } from "next/navigation";
import { FaCheckDouble as YesIcon } from "react-icons/fa6";
import { FaRegTimesCircle as NotIcon } from "react-icons/fa";

async function RowUsers() {
  const users = await db.user.findMany({
    select: {
      document: true,
      email: true,
      phoneNumber: true,
      firstName: true,
      lastName: true,
      createdAt: true,
      is2FAEnabled: true,
      moreInfo: { select: { userId: true } },
      preTest: { select: { userId: true } },
      postTest: { select: { userId: true } },
    },
    where: { role: Role.USER },
  });

  if (!users) {
    notFound();
  }

  return users.map((u, i) => (
    <tr key={i}>
      <td className="p-4 whitespace-nowrap text-sm font-normal">{i + 1}</td>
      <td className="p-4 whitespace-nowrap text-sm font-normal">
        {u.document}
      </td>
      <td className="p-4 whitespace-nowrap text-sm font-normal">
        {`${u.firstName} ${u.lastName}`.toUpperCase()}
      </td>
      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500 dark:text-gray-400">
        {u.email}
      </td>
      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500 dark:text-gray-400">
        {u.phoneNumber}
      </td>
      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500 dark:text-gray-400">
        {u.is2FAEnabled ? <YesIcon /> : <NotIcon />}
      </td>
      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500 dark:text-gray-400">
        {u.moreInfo[0] ? <YesIcon /> : <NotIcon />}
      </td>
      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500 dark:text-gray-400">
        {u.preTest[0] ? <YesIcon /> : <NotIcon />}
      </td>
      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500 dark:text-gray-400">
        {u.postTest[0] ? <YesIcon /> : <NotIcon />}
      </td>
      <td className="p-4 whitespace-nowrap text-sm font-semibold">
        {new Date(u.createdAt).toLocaleString()}
      </td>
    </tr>
  ));
}

export default RowUsers;
