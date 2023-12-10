import { htmlForAdminContact, htmlForUserContact } from "@/email_templates";
import { db } from "@/libs/prismaDB";
import { sendEmail } from "@/libs/sgMail";
import { contactSchema } from "@/schemas/contact.schema";
import { type Contact } from "@prisma/client";
import { NextResponse } from "next/server";
import pkg from "@/../package.json";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const contactData = contactSchema.parse(body) as Contact;

    const newContactRegister = await db.contact.create({
      data: { ...contactData },
    });

    if (newContactRegister === null) {
      throw new Error();
    }

    const subject = `Nuevo Contacto ${pkg.description}`;

    const msgSendedToUser = await sendEmail(
      contactData.email,
      subject,
      htmlForUserContact(),
    );
    if (!msgSendedToUser?.response) {
      return NextResponse.json(
        { message: `Error sending email to ${contactData.email}` },
        { status: 500 },
      );
    }

    const msgSendedToAdmin = await sendEmail(
      process.env.EMAIL_CONTACTS!,
      subject,
      htmlForAdminContact(contactData),
    );
    if (!msgSendedToAdmin?.response) {
      return NextResponse.json(
        { message: `Error sending email to ${process.env.EMAIL_CONTACTS}` },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: `Gracias por contactar con el equipo de ${pkg.description}` },
      { status: 201 },
    );
  } catch (error) {
    console.error({ error });

    return NextResponse.json(
      { message: "Something went wrong.", error },
      { status: 500 },
    );
  }
}
