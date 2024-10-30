const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendVerificationEmail = async (to, token) => {
  const verificationUrl = `http://localhost:3000/api/users/verify-email?token=${token}`;

  const mailOptions = {
    from: `"Tu API" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Verificación de correo electrónico',
    html: `<p>Gracias por registrarte. Por favor, verifica tu correo haciendo clic en el siguiente enlace:</p>
           <a href="${verificationUrl}">${verificationUrl}</a>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo de verificación enviado', info);
  } catch (error) {
    console.error('Error al enviar el correo de verificación:', error);
  }
};

