"use server";

import { db } from "@/libs/prismaDB";
import { teamMemberSchema } from "@/schemas/teamMember.schema";
import { revalidatePath } from "next/cache";
import pkg from "@/../package.json";

export async function addMember(
  _prevState: any,
  formData: FormData,
): Promise<any> {
  const parse = teamMemberSchema.safeParse({
    cc: formData.get("cc"),
    fullName: formData.get("fullName"),
    teamRole: formData.get("teamRole"),
  });

  if (!parse.success) {
    return { message: "Error al agregar el miembro al equipo." };
  }

  const data = parse.data;

  try {
    const existingMember = await db.teamMembers.findFirst({
      where: { cc: data.cc },
    });
    if (existingMember) {
      return {
        message: "El miembro del equipo ya existe.",
      };
    }
    await db.teamMembers.create({ data });
    revalidatePath("/profile/admin/dashboard/teamMembers");

    return {
      ok: true,
      message: `${data.fullName} ahora es miembro de ${pkg.description}!`,
    };
  } catch (error) {
    console.error({ error });
    return { message: "Error al agregar el miembro al equipo." };
  }
}
