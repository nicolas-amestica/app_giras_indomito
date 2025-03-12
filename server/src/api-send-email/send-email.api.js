import dotenv from 'dotenv';
import express from 'express';
import sendEmail from '../../helpers/nodemailer.js';

dotenv.config();

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        const result = await sendEmail(
            process.env.SMTP_USER,
            'Formulario de contacto',
            null,
            `<p>Estimado/a,</p>
            <p>Llegó el siguiente mensaje de ${name}:</p>
            <p>Mensaje: "${message}"</p>
            <p>Su email es: "${email}"</p>
            <p>Su nrp. telpefono es: "${phone}"</p>
            `,
        );

        res.json({ message: "Correo enviado", result });
    } catch (err) {
        console.log(err);
        res.status(err?.code || 500).json({ message: "Email no enviado", error: err });
    }
});

export default router;
