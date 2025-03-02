import express from 'express';

const router = express.Router();

// Validar estado del servidor
router.get('', async (req, res) => {
  try {
    res.json({ message: "Servidor ok" });
  } catch (err) {
    console.log(err);    
    res.status(err?.code || 500).json({ meesage: 'Servidor con problemas', error: err });
  }
});

export default router;
