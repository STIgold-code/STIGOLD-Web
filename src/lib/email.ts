import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

interface ContactEmailData {
  name: string;
  email: string;
  message: string;
  lang: string;
}

export async function sendContactEmail(data: ContactEmailData) {
  const { name, email, message, lang } = data;

  const subject = lang === 'en'
    ? `New contact from ${name} - STIGOLD Website`
    : `Nuevo contacto de ${name} - Sitio web STIGOLD`;

  await resend.emails.send({
    from: 'STIGOLD Web <noreply@stigold.com>',
    to: ['contacto@stigold.com'],
    replyTo: email,
    subject,
    html: `
      <h2>${lang === 'en' ? 'New contact message' : 'Nuevo mensaje de contacto'}</h2>
      <p><strong>${lang === 'en' ? 'Name' : 'Nombre'}:</strong> ${name}</p>
      <p><strong>${lang === 'en' ? 'Email' : 'Correo'}:</strong> ${email}</p>
      <p><strong>${lang === 'en' ? 'Message' : 'Mensaje'}:</strong></p>
      <p>${message}</p>
    `,
  });
}
