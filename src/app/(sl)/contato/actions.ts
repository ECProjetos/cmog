'use server'

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;

  const currentDate = new Date().toLocaleDateString('pt-BR');

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev', // This should be a verified sender email in Resend
      to: 'joaoleonardo@ecprojetos.com.br',
      subject: `CMOG - ${subject} - ${currentDate}`,
      html: `
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Assunto:</strong> ${subject}</p>
        <p><strong>Mensagem:</strong> ${message}</p>
        <p><strong>Data de Criação:</strong> ${currentDate}</p>
      `,
    });
    return { success: true, message: 'Email enviado com sucesso' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'falha ao enviar email' };
  }
}
