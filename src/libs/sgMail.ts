import sgMail, { type MailDataRequired, ResponseError } from "@sendgrid/mail";

export async function sendEmail(to: string, subject: string, html: string) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

  const msg: MailDataRequired = {
    to,
    from: process.env.EMAIL_SENDER!,
    subject,
    html,
  };

  try {
    const [response] = await sgMail.send(msg);
    return { response: response.statusCode === 202 };
  } catch (error) {
    if (error instanceof ResponseError) {
      console.error(error.message);
    }

    console.error({ error });
  }
}
