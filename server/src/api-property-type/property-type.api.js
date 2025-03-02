import express from 'express';
import { pool } from '../../helpers/mysql.js';
import { authorizeRoles } from '../../middlewares/authRoles.js';

const router = express.Router();

router.get('/', authorizeRoles(['Administrador', 'Consultor']), async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM tipos_inmueble');
    res.json({ message: "Propietarios encontrados", result });
  } catch (err) {
    console.log(err);    
    res.status(err?.code || 500).json({ message: "Propietarios no obtenidos", error: err });
  }
});

router.get('/:id', authorizeRoles(['Administrador', 'Consultor']), async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('SELECT * FROM tipos_inmueble WHERE id = ?', [id]);   
    if (result.length > 0) {
      res.json({ message: "Inmueble encontrado", result: result[0] });
    } else {
      throw { message: 'Inmueble no encontrado', code: 404 };
    }
  } catch (err) {
    console.log(err);    
    res.status(err?.code || 500).json({ message: "Inmueble no obtenido", error: err });
  }
});

export default router;
