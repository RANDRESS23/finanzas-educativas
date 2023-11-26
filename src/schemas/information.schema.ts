import { z } from "zod";

const stringInformationSchema = z
  .string()
  .max(500, { message: "El campo es demasiado extenso." });

export const informationSchema = z
  .array(
    z.union([
      stringInformationSchema.min(3, {
        message: "El campo es demasiado corto.",
      }),
      stringInformationSchema.optional(),
    ]),
  )
  .min(1)
  .max(2, {
    message:
      "Por favor diligencia uno o dos campos para completar la informacíon.",
  });
