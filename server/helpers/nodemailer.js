import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const sendEmail = async (to, subject, text, html) => {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVICE,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: to,
      subject: subject,
      text: text,
      html: html
    };
  
    try {
      return await transporter.sendMail(mailOptions);
    } catch (err) {
      console.error(err);
      return ({ message: 'Error enviando correo: ', error: err });
    }
  };

export default sendEmail;