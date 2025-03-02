import express from 'express';
import { pool } from '../../helpers/mysql.js';
import { authorizeRoles } from '../../middlewares/authRoles.js';
import { GET_COMMUNES_BY_PROVINCE_ID } from './provinces.sql.js';

const router = express.Router();

router.get('/:provinceId/comunas', authorizeRoles(['Administrador', 'Consultor']), async (req, res) => {
  try {    
    const { provinceId } = req.params;

    const query = GET_COMMUNES_BY_PROVINCE_ID;

    const [result] = await pool.query(query, [provinceId]);
    
    res.json({ message: "Comunas encontradas", result });
  } catch (err) {
    console.log(err);
    res.status(err?.code || 500).json({ message: "Comunas no obtenidas", error: err });
  }
});

router.get('/', authorizeRoles(['Administrador', 'Consultor']), async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM provincias ORDER BY nombre ASC;');   

    res.json({ message: "Provincia encontrada", result: result });
  } catch (err) {
    console.log(err);
    res.status(err?.code || 500).json({ message: "Provincia no obtenida", error: err });
  }
});

router.get('/:regionId', authorizeRoles(['Administrador', 'Consultor']), async (req, res) => {
  try {
    const { regionId } = req.params;
    const [result] = await pool.query('SELECT * FROM provincias WHERE region_id = ? ORDER BY nombre ASC;', [regionId]);   
    if (result.length > 0) {
      res.json({ message: "Provincia encontrada", result: result[0] });
    } else {
      throw { message: 'Provincia no encontrada', code: 404 };
    }
  } catch (err) {
    console.log(err);
    res.status(err?.code || 500).json({ message: "Provincia no obtenida", error: err });
  }
});

export default router;
