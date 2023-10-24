import { Resend } from 'resend'

export type PayloadResend = {
  from: string
  to: string
  subject: string
  html: string
}

export const sendEmail = async (payload: PayloadResend) => {
  const resend = new Resend(process.env.RESEND_API_KEY)

  return await resend.emails.send({ ...payload })
}
