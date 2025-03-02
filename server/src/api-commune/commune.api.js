import express from 'express';
import { pool } from '../../helpers/mysql.js';
import { authorizeRoles } from '../../middlewares/authRoles.js';
import { GET_CONDOMINIUMS_BY_COMMUNE_ID } from './commune.sql.js';

const router = express.Router();

router.get('/:communeId/condominios', authorizeRoles(['Administrador', 'Consultor']), async (req, res) => {
  try {
    const { communeId } = req.params;

    const query = GET_CONDOMINIUMS_BY_COMMUNE_ID;

    const [result] = await pool.query(query, [communeId]);

    res.json({ message: "Condominios encontrados", result });
  } catch (err) {
    console.log(err);
    res.status(err?.code || 500).json({ message: "Condominios no obtenidos", error: err });
  }
});

router.get('/', authorizeRoles(['Administrador', 'Consultor']), async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM comunas ORDER BY nombre ASC;');
    res.json({ message: "Comunas encontradas", result });
  } catch (err) {
    console.log(err);    
    res.status(err?.code || 500).json({ message: "Comunas no obtenidas", error: err });
  }
});

router.get('/:provinceId', authorizeRoles(['Administrador', 'Consultor']), async (req, res) => {
  try {
    const { provinceId } = req.params;
    const [result] = await pool.query('SELECT * FROM comunas WHERE provincia_id = ? ORDER BY nombre ASC;', [provinceId]);
    if (result.length > 0) {
      res.json({ message: "Comuna encontrada", result: result[0] });
    } else {
      throw { message: 'Comuna no encontrada', code: 404 };
    }
  } catch (err) {
    console.log(err);    
    res.status(err?.code || 500).json({ message: "Comuna no obtenida", error: err });
  }
});

export default router;
