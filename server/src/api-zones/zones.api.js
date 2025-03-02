import express from 'express';
import { pool } from '../../helpers/mysql.js';
import { authorizeRoles } from '../../middlewares/authRoles.js';

const router = express.Router();

router.get('/', authorizeRoles(['Administrador', 'Consultor']), async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM zonas');
    res.json({ message: "Zonas encontradas", result });
  } catch (err) {
    console.log(err);
    res.status(err?.code || 500).json({ message: "Zonas no obtenidas", error: err });
  }
});

router.get('/:zoneId/prefecturas', authorizeRoles(['Administrador', 'Consultor']), async (req, res) => {
  try {
    const { zoneId } = req.params;
    const [result] = await pool.query('SELECT * FROM zonas WHERE id = ?', [zoneId]);
    if (result.length > 0) {
      res.json({ message: "Zona encontrada", result: result });
    } else {
      throw { message: 'Zona no encontrada', code: 404 };
    }
  } catch (err) {
    console.log(err);
    res.status(err?.code || 500).json({ message: "Zona no obtenida", error: err });
  }
});

export default router;
