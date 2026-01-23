import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fullName, email, phone, curtainType, room, message } = req.body;

  if (!fullName || !email || !phone || !curtainType || !room) {
    return res.status(400).json({ 
      success: false, 
      error: 'Faltan campos obligatorios' 
    });
  }

  try {
    const data = await resend.emails.send({
      from: 'Cortinados <onboarding@resend.dev>',
      to: ['seboladeina@gmail.com'], // Replace with your email
      subject: `Nueva consulta de ${fullName} - Cortinados`,
      html: `
        <h2>Nueva consulta recibida</h2>
        <p><strong>De:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Tipo de cortina:</strong> ${curtainType}</p>
        <p><strong>Ambiente:</strong> ${room}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message || 'Sin mensaje'}</p>
      `,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ success: false, error: 'Error al enviar el correo' });
  }
}
