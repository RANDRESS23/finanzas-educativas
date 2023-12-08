"use server";

import { db } from "@/libs/prismaDB";
import { revalidatePath } from "next/cache";

export async function deleteMember(formData: FormData): Promise<any> {
  const id = formData.get("memberId") as string;

  if (!id) {
    return { message: "Error al eliminar el miembro del equipo." };
  }

  try {
    const deletedMember = await db.teamMember.delete({ where: { id } });
    if (deletedMember) {
      return { message: "Error al eliminar el miembro del equipo." };
    }

    revalidatePath("/profile/admin/dashboard/teamMembers");
  } catch (error) {
    console.error({ error });
    return { message: "Error al eliminar el miembro del equipo." };
  }
}
