import express from 'express';
import { pool } from '../../helpers/mysql.js';
import { authorizeRoles } from '../../middlewares/authRoles.js';

const router = express.Router();

router.get('/', authorizeRoles(['Administrador', 'Consultor']), async (req, res) => {
  try {
    const [result] = await pool.query(`SELECT
        g.id AS grado_id,
        g.nombre AS grado_nombre,
        g.grado,
        g.escalafon_id, 
        e.nombre AS escalafon_nombre
      FROM
        grados g
        INNER JOIN escalafones e ON g.escalafon_id = e.id`);
    res.json({ message: "Conservaciones encontradas", result });
  } catch (err) {
    res.status(err?.code || 500).json({ message: "Conservaciones no obtenidas", error: err });
  }
});

router.get('/:id', authorizeRoles(['Administrador', 'Consultor']), async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(`SELECT
        g.id AS grado_id,
        g.nombre AS grado_nombre,
        g.grado,
        g.escalafon_id, 
        e.nombre AS escalafon_nombre
      FROM
        grados g
        INNER JOIN escalafones e ON g.escalafon_id = e.id
      WHERE
        g.id = ?`, [id]);
    if (result.length > 0) {
      res.json({ message: "Conservación encontrada", result: result[0] });
    } else {
      throw { message: 'Conservación no encontrada', code: 404 };
    }
  } catch (err) {
    console.log(err);    
    res.status(err?.code || 500).json({ message: "Conservación no obtenida", error: err });
  }
});

export default router;
