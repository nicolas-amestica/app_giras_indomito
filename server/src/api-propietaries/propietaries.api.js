import express from 'express';
import { pool } from '../../helpers/mysql.js';
import { authorizeRoles } from '../../middlewares/authRoles.js';

const router = express.Router();

router.get('/viviendas/', authorizeRoles(['Administrador', 'Consultor']), async (req, res) => { 
  try {
    const [result] = await pool.query(`
      SELECT
        p.id,
        p.nombre
      FROM
        propietarios p
        INNER JOIN viviendas v ON p.id=v.propietario_id
      GROUP BY
        p.id,
        p.nombre`);

    res.json({ message: "Propietarios de viviendas encontrados", result });
  } catch (err) {
    console.log(err);
    res.status(err?.code || 500).json({ message: "Propietarios de viviendas no obtenidos", error: err });
  }
});

router.get('/', authorizeRoles(['Administrador', 'Consultor']), async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM propietarios');
    res.json({ message: "Propietarios encontrados", result });
  } catch (err) {
    console.log(err);
    res.status(err?.code || 500).json({ message: "Propietarios no obtenidos", error: err });
  }
});

router.get('/:id', authorizeRoles(['Administrador', 'Consultor']), async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('SELECT * FROM propietarios WHERE id = ?', [id]);   
    if (result.length > 0) {
      res.json({ message: "Propietario encontrado", result: result[0] });
    } else {
      throw { message: 'Propietario no encontrado', code: 404 };
    }
  } catch (err) {
    console.log(err);
    res.status(err?.code || 500).json({ message: "Propietario no obtenido", error: err });
  }
});

export default router;
