import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(3, {
    message: "Ingrese su nombre completo, por favor.",
  }),
  email: z.string().email({
    message: "El correo electrónico debe ser válido.",
  }),
  phoneNumber: z
    .string()
    .min(8, {
      message: "El número de teléfono debe tener al menos 8 caracteres.",
    })
    .max(12, {
      message: "El número de teléfono debe tener un máximo de 12 caracteres.",
    }),
  message: z
    .string()
    .min(3, { message: "El mensaje es demasiado corto." })
    .max(255, { message: "El mensaje es demasiado extenso." }),
});
