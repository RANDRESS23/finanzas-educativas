"use server";

import { db } from "@/libs/prismaDB";
import { teamMemberSchema } from "@/schemas/teamMember.schema";
import { revalidatePath } from "next/cache";
import pkg from "@/../package.json";

export async function addMember(formData: FormData) {
  const parsed = teamMemberSchema.parse({
    cc: formData.get("cc"),
    fullName: formData.get("fullName"),
    teamRole: formData.get("teamRole"),
  });

  try {
    await db.teamMembers.create({ data: { ...parsed } });
    revalidatePath("/");

    return {
      message: `${parsed.fullName} ahora es miembro de ${pkg.description}`,
    };
  } catch (error) {
    console.log({ error });
    return { message: "Error al agregar el miembro al equipo" };
  }
}
