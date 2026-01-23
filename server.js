import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config();

const app = express();
const PORT = 3001;

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// Email sending endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { fullName, email, phone, curtainType, room, message } = req.body;

    // Validate required fields
    if (!fullName || !email || !phone || !curtainType || !room) {
      return res.status(400).json({ 
        success: false, 
        error: 'Todos los campos requeridos deben estar completos' 
      });
    }

    // Create HTML email template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #8b6f47 0%, #6b5537 100%);
              color: white;
              padding: 30px 20px;
              border-radius: 8px 8px 0 0;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              font-weight: 600;
            }
            .content {
              background: #f9f9f9;
              padding: 30px 20px;
              border-radius: 0 0 8px 8px;
            }
            .field {
              margin-bottom: 20px;
              background: white;
              padding: 15px;
              border-radius: 6px;
              border-left: 4px solid #8b6f47;
            }
            .field-label {
              font-weight: 600;
              color: #8b6f47;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 5px;
            }
            .field-value {
              color: #333;
              font-size: 16px;
            }
            .message-box {
              background: white;
              padding: 20px;
              border-radius: 6px;
              border: 1px solid #e0e0e0;
              margin-top: 10px;
              white-space: pre-wrap;
              font-size: 15px;
              line-height: 1.6;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 2px solid #e0e0e0;
              text-align: center;
              color: #666;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>📋 Nueva Solicitud de Cotización</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="field-label">Nombre y Apellido</div>
              <div class="field-value">${fullName}</div>
            </div>
            
            <div class="field">
              <div class="field-label">Email</div>
              <div class="field-value">${email}</div>
            </div>
            
            <div class="field">
              <div class="field-label">Teléfono / WhatsApp</div>
              <div class="field-value">${phone}</div>
            </div>
            
            <div class="field">
              <div class="field-label">Tipo de Cortina</div>
              <div class="field-value">${curtainType}</div>
            </div>
            
            <div class="field">
              <div class="field-label">Ambiente</div>
              <div class="field-value">${room}</div>
            </div>
            
            ${message ? `
              <div class="field">
                <div class="field-label">Mensaje Adicional</div>
                <div class="message-box">${message}</div>
              </div>
            ` : ''}
            
            <div class="footer">
              <p>Este email fue enviado desde el formulario de contacto de Cortinados</p>
              <p style="margin-top: 10px; font-size: 12px; color: #999;">
                Fecha: ${new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })}
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Cortinados Website <onboarding@resend.dev>',
      to: 'mandy.cortinados@gmail.com',
      subject: `Nueva cotización: ${curtainType} - ${fullName}`,
      html: htmlContent,
      replyTo: email, // Allow direct reply to customer
    });

    console.log('Email sent successfully:', data);

    res.json({ 
      success: true, 
      message: 'Email enviado correctamente',
      emailId: data.id 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error al enviar el email. Por favor, intenta nuevamente.' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Email server running on http://localhost:${PORT}`);
});
