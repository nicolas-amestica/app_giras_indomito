import express from 'express';
import { pool } from '../../helpers/mysql.js';
import { GET_PROVINCES_BY_REGION_ID } from './regions.sql.js';
import { authorizeRoles } from '../../middlewares/authRoles.js';

const router = express.Router();

router.get('/:regionId/provincias', authorizeRoles(['Administrador', 'Consultor']), async (req, res) => {
  try {    
    const { regionId } = req.params;

    const query = GET_PROVINCES_BY_REGION_ID;

    const [result] = await pool.query(query, [regionId]);
    
    res.json({ message: "Provincias encontradas", result });
  } catch (err) {
    console.log(err);    
    res.status(err?.code || 500).json({ message: "Provincias no obtenidas", error: err });
  }
});

router.get('', authorizeRoles(['Administrador', 'Consultor']), async (req, res) => {
  try {
    const query = 'SELECT * FROM regiones ORDER BY nombre ASC;';

    const [result] = await pool.query(query);

    res.json({ message: "Regiones encontradas", result });
  } catch (err) {
    console.log(err);    
    res.status(err?.code || 500).json({ message: "Regiones no obtenidas", error: err });
  }
});

export default router;
