import pkg from "@/../package.json";
import { type Contact } from "@prisma/client";
import { recoveryPassword } from "./recoveryPassword";

const htmlForChangePsw = (resetPasswordLink: string) =>
  recoveryPassword({ resetPasswordLink });

const htmlForUserContact = () => `
<p>Gracias por contactar al equipo de <strong>${pkg.description}</strong>.</p>

<p>Revisaremos tu mensaje lo más pronto posible.</p>

<i><strong>Cordialmente,<br>
El equipo de ${pkg.description} ITFIP.</strong></i>
`;

const htmlForAdminContact = ({
  name,
  phoneNumber,
  email,
  message,
}: Contact) => `
<p>Nuevo contacto equipo de <strong>${pkg.description}</strong>.</p>

<p><strong>Nombre:</strong> ${name}</p>
<p><strong>Número de Teléfono:</strong> ${phoneNumber}</p>
<p><strong>Correo electrónico:</strong> ${email}</p>
<p><strong>Mensaje:</strong> ${message}</p>

<i><strong>Cordialmente,<br>
El equipo de ${pkg.description} ITFIP.</strong></i>
`;

export { htmlForAdminContact, htmlForChangePsw, htmlForUserContact };
