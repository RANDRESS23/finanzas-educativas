import { z } from 'zod'

export const sendEmailSchema = z.object({
  to: z.string().email({
    message: 'El correo electrónico debe ser válido.'
  })
})

export const payloadResendSchema = sendEmailSchema.extend({
  from: z.string().email({
    message: 'El correo electrónico debe ser válido.'
  }),

  subject: z
    .string()
    .min(4, {
      message: 'El asunto del email debe ser necesariamente descriptivo'
    })
    .max(255, {
      message: 'El asunto del email es demasiado extenso'
    })
})
