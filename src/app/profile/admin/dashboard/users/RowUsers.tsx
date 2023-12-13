import ThemeTooltip from "@/components/Tooltip/ThemeTooltip";
import { db } from "@/libs/prismaDB";
import { Role } from "@prisma/client";
import clsx from "clsx";
import { notFound } from "next/navigation";
import { FaRegTimesCircle as NotIcon } from "react-icons/fa";
import { FaCheckDouble as YesIcon } from "react-icons/fa6";
import ButtonDisableUser from "./ButtonDisableUser";
import Link from "next/link";

export const cl = clsx("origin-right top-8 capitalize text-sm right-0");

export default async function RowUsers() {
  const users = await db.user.findMany({
    select: {
      id: true,
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
    where: {
      role: Role.USER,
      disabled: {
        equals: false,
      },
    },
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
        {u.moreInfo[0] ? (
          <ThemeTooltip
            message={`Ver caracterización ${u.firstName} ${u.lastName}`}
            cl={`${cl} w-50`}
          >
            <Link
              href={`/profile/admin/dashboard/users/instruments/characterization/${u.id}`}
            >
              <YesIcon className="text-boston-blue-600 hover:text-2xl transition-all duration-300" />
            </Link>
          </ThemeTooltip>
        ) : (
          <NotIcon />
        )}
      </td>
      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500 dark:text-gray-400">
        {u.preTest[0] ? (
          <ThemeTooltip
            message={`Ver pre-test ${u.firstName} ${u.lastName}`}
            cl={`${cl} w-50`}
          >
            <Link
              href={`/profile/admin/dashboard/users/instruments/pre-test/${u.id}`}
            >
              <YesIcon className="text-boston-blue-600 hover:text-2xl transition-all duration-300" />
            </Link>
          </ThemeTooltip>
        ) : (
          <NotIcon />
        )}
      </td>
      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500 dark:text-gray-400">
        {u.postTest[0] ? (
          <ThemeTooltip
            message={`Ver post-test ${u.firstName} ${u.lastName}`}
            cl={`${cl} w-50`}
          >
            <Link
              href={`/profile/admin/dashboard/users/instruments/post-test/${u.id}`}
            >
              <YesIcon className="text-boston-blue-600 hover:text-2xl transition-all duration-300" />
            </Link>
          </ThemeTooltip>
        ) : (
          <NotIcon />
        )}
      </td>
      <td className="p-4 whitespace-nowrap text-sm font-semibold">
        {new Date(u.createdAt).toLocaleString()}
      </td>
      <td className="p-4 whitespace-nowrap text-sm font-semibold">
        <ThemeTooltip message="Deshabilitar" cl={`${cl} w-20`}>
          <ButtonDisableUser userId={u.id} />
        </ThemeTooltip>
      </td>
    </tr>
  ));
}
