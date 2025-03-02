import express from 'express';
import { pool } from '../../helpers/mysql.js';
import { authorizeRoles } from '../../middlewares/authRoles.js';
import { GET_REPORT_DATA, GET_REPORT_STRUCTURE } from './reports.sql.js';

const router = express.Router();

router.get('/', authorizeRoles(['Administrador', 'Consultor']), async (req, res) => {
  try {

    const [getData] = await pool.query(GET_REPORT_DATA);
    const sql = GET_REPORT_STRUCTURE;
    const [getStructure] = await pool.query(sql);

    const mapedData = getStructure.map((structure) => {
      const filteredData = getData.filter((data) => data.prefectura_id === structure.prefectura_id);

      const defaultData = {
        total: 0,
        ocupados: 0,
        desocupados: 0,
        pendientes: 0,
        devueltos: 0
      };

      return {
        zona_id: structure.zona_id,
        zona_nombre: structure.zona_nombre,
        prefectura_id: structure.prefectura_id,
        prefectura_nombre: structure.prefectura_nombre,
        ...filteredData[0]
          ? {
            total: parseInt(filteredData[0].total),
            ocupados: parseInt(filteredData[0].ocupados),
            desocupados: parseInt(filteredData[0].desocupados),
            pendientes: parseInt(filteredData[0].pendientes),
            devueltos: parseInt(filteredData[0].devueltos)
          }
          : defaultData
      };
    });

    res.json({ message: "Reporte generado", result: mapedData });
  } catch (err) {
    console.log(err);    
    res.status(err?.code || 500).json({ message: "Reporte no generado", error: err });
  }
});

export default router;
