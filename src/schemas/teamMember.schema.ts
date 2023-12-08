import { z } from "zod";

export const teamMemberSchema = z.object({
  cc: z
    .string()
    .min(7, {
      message: "El número de documento debe tener al menos 7 caracteres.",
    })
    .max(12, {
      message: "El número de documento debe tener un máximo de 12 caracteres.",
    }),
  fullName: z
    .string()
    .min(4, {
      message: "Los nombres deben tener al menos 4 caracteres.",
    })
    .max(100, {
      message: "Los nombres deben tener un máximo de 100 caracteres.",
    }),
  teamId: z.string(),
});
