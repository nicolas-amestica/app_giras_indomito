import dotenv from 'dotenv';
import express from 'express';
import sendEmail from '../../helpers/nodemailer.js';

dotenv.config();

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        const result = await sendEmail(
            process.env.RECEIVER_EMAIL,
            'Formulario de contacto',
            null,
            `<p>Estimado/a,</p>
            <p>Llegó el siguiente mensaje de ${name}:</p>
            <p>Su nro. teléfono es: "${phone}"</p>
            <p>Su email es: "${email}"</p>
            <p>Su mensaje es: "${message}"</p>
            `,
        );

        res.json({ message: "Correo enviado", result });
    } catch (err) {
        console.log(err);
        res.status(err?.code || 500).json({ message: "Email no enviado", error: err });
    }
});

export default router;
