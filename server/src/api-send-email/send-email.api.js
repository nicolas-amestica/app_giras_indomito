import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
    try {

        const message = 'Hola mundo bonito, acabo de enviar un email'


        res.json({ message: "Correo enviado", result: message });
    } catch (err) {
        console.log(err);
        res.status(err?.code || 500).json({ message: "Reporte no generado", error: err });
    }
});

export default router;
