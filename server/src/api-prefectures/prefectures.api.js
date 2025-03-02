import express from 'express';
import { pool } from '../../helpers/mysql.js';
import { authorizeRoles } from '../../middlewares/authRoles.js';

const router = express.Router();

router.get('/', authorizeRoles(['Administrador', 'Consultor']), async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM prefecturas');
    res.json({ message: "Prefecturas encontradas", result });
  } catch (err) {
    console.log(err);
    res.status(err?.code || 500).json({ message: "Prefecturas no obtenidas", error: err });
  }
});

router.get('/:zoneId', authorizeRoles(['Administrador', 'Consultor']), async (req, res) => {
  try {
    const { zoneId } = req.params;
    const [result] = await pool.query('SELECT * FROM prefecturas WHERE zona_id = ?', [zoneId]);
    if (result.length > 0) {
      res.json({ message: "Prefecturas encontradas", result });
    } else {
      throw { message: 'Prefecturas no encontradas', code: 404 };
    }
  } catch (err) {
    console.log(err);
    res.status(err?.code || 500).json({ message: "Prefecturas no obtenidas", error: err });
  }
});

export default router;
