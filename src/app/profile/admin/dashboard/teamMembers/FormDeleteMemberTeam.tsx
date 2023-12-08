"use client";

import { deleteMember } from "@/actions/teamMembers/delete";
import { useFormStatus } from "react-dom";
import { FiMinusCircle as MinusIcon } from "react-icons/fi";

function Submit() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="rounded-md px-10 py-2 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 duration-300 bg-red-500 hover:bg-red-600 disabled:opacity-50 w-full flex items-center justify-center gap-x-1 disabled:cursor-not-allowed enabled:active:bg-red-400"
      disabled={pending}
    >
      <MinusIcon />
    </button>
  );
}

export default function FormDeleteMemberTeam({
  memberId,
}: {
  memberId: string;
}) {
  return (
    <form action={deleteMember}>
      <input type="hidden" name="memberId" id="memberId" value={memberId} />
      <Submit />
    </form>
  );
}
