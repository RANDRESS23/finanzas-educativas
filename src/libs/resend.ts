import { Resend } from 'resend'

export interface PayloadResend {
  from: string
  to: string
  subject: string
  html: string
}

export const sendEmail = async (payload: PayloadResend) => {
  const resend = new Resend(process.env.RESEND_API_KEY)

  const result = await resend.emails.send({ ...payload })
  return result
}
