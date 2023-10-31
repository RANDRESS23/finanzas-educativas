import pkg from "@/../package.json";
import { Contact } from "@prisma/client";

const htmlForChangePsw = (resetPasswordLink: string) => `
<p>Hemos detectado que solicitaste un <strong>cambio de contraseña</strong>.</p>

<p>Por favor, haga clic en el siguiente enlace para cambiar tu contraseña.</p>
<a href="${resetPasswordLink}">Cambiar contraseña</a>

<p>Si no solicitaste este cambio, por favor, ignora este correo electrónico.</p>

<i><strong>Cordialmente,<br>
El equipo de ${pkg.description} ITFIP.</strong></i>
`;

const htmlForUserContact = () => `
<p>Gracias por contactar al equipo de <strong>Finanzas Educativas</strong>.</p>

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
<p>Nuevo contacto equipo de <strong>Finanzas Educativas</strong>.</p>

<p><strong>Nombre:</strong> ${name}</p>
<p><strong>Número de Teléfono:</strong> ${phoneNumber}</p>
<p><strong>Correo electrónico:</strong> ${email}</p>
<p><strong>Mensaje:</strong> ${message}</p>

<i><strong>Cordialmente,<br>
El equipo de ${pkg.description} ITFIP.</strong></i>
`;

export { htmlForAdminContact, htmlForChangePsw, htmlForUserContact };
