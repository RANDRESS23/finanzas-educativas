import { z } from "zod";

export const sendEmailSchema = z.object({
  to: z.string().email({
    message: "El correo electrónico debe ser válido.",
  }),
});
