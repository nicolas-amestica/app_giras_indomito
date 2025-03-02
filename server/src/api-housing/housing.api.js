import express from 'express';
import jwt from 'jsonwebtoken';
import {pool} from "../../helpers/mysql.js";
import {authorizeRoles} from '../../middlewares/authRoles.js';
import {SELECT_ALL_HOUSING_WITH_STATUS, SELECT_HOUSING_BY_ID} from './housing.sql.js';

const router = express.Router();

// Obtener todas las viviendas
router.get('', authorizeRoles(['Administrador', 'Consultor']), async (req, res) => {
    try {

        const {page, limit} = req.query;
        const offset = (page - 1) * limit;

        const [results] = await pool.query(SELECT_ALL_HOUSING_WITH_STATUS, [parseInt(limit), parseInt(offset)]);

        const funcionariesWithoutPassword = results.map(funcionary => {
            const {clave, ...funcionaryWithoutPassword} = funcionary;
            return funcionaryWithoutPassword;
        });

        const countQuery = `SELECT COUNT(*) as total
                            FROM viviendas;`;
        const [[{total}]] = await pool.query(countQuery);

        res.json({
            message: "Viviendas obtenidas", result: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / limit),
                data: funcionariesWithoutPassword
            }
        });
    } catch (err) {
        console.log(err);
        res.status(err?.code || 500).json({ message: "Viviendas no listadas", error: err });
    }
});

// Obtener una vivienda por id
router.get('/:id', authorizeRoles(['Administrador', 'Consultor']), async (req, res) => {
    try {
        const {id} = req.params;

        const [result] = await pool.query(SELECT_HOUSING_BY_ID, [id]);
        if (result.length > 0) {
            delete result[0].clave;
            return res.json({ message: "Vivienda encontrada", result: result[0] });
        } else {
            throw { message: 'Vivienda no encontrada', code: 404 };
        }
    } catch (err) {
        console.log(err);
        res.status(err?.code || 500).json({ message: "Vivienda no listada", error: err });
    }
});

// Crear vivienda
router.post('', authorizeRoles(['Administrador', 'Consultor']), async (req, res) => {
    try {
        const {
            estacionamiento,
            bodegas,
            propietario_id,
            tipo_inmueble_id,
            prefectura_id,
            condominio_id,
        } = req.body;

        if (estacionamiento === null || bodegas === null || propietario_id === null || tipo_inmueble_id === null || prefectura_id === null || condominio_id === null) throw "Faltan parámetros obligatorios";

        // VALIDAR Y EXTRAER DATO DEL TOKEN
        const token = req.headers['authorization'];
        const { codigo } = jwt.decode(token.split(' ')[1]);
        const sql = `select * from funcionarios where codigo = '${codigo}'`;
        const [[getFuncionary]] = await pool.query(sql);

        const housing = req.body;

        housing.creado_por = getFuncionary.rut;

        const columns = [];
        const values = [];
        const placeholders = [];

        Object.keys(housing).forEach(key => {
            if (housing[key] !== undefined && housing[key] !== null) {
                columns.push(key);
                values.push(housing[key]);
                placeholders.push('?');
            }
        });

        if (columns.length === 0) throw { message: 'No hay campos para insertar', code: 400 };

        const query = `INSERT INTO viviendas (${columns.join(', ')}) VALUES (${placeholders.join(', ')})`;

        const [result] = await pool.query(query, values);

        if (result.affectedRows !== 1) throw { message: "Vivienda no creada", code: 400 };

        const insertedId = result.insertId;

        const [[insertedPropietary]] = await pool.query(SELECT_HOUSING_BY_ID, [insertedId]);

        insertedPropietary.insertedId = insertedId;

        res.json({ message: "Vivienda creada", result: insertedPropietary });
    } catch (err) {
        console.log(err);
        res.status(err?.code || 500).json({ message: "Vivienda no insertada", error: err });
    }
});

// Actualizar vivienda
router.put('/:id', authorizeRoles(['Administrador', 'Consultor']), async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw { message: "Falta parámetro obligatorio", code: 400 };

    const housing = req.body;

    housing.id = id;

    const updates = [];
    const params = [];

    Object.keys(housing).forEach(key => {
      if (housing[key] !== undefined) {
          updates.push(`${key} = ?`);
          params.push(housing[key]);
      }
    });

    if (updates.length === 0) throw { message: 'No hay campos para actualizar', code: 400 };

    params.push(id);

    const query = `UPDATE viviendas SET ${updates.join(', ')} WHERE id = ?`;

    const [result] = await pool.query(query, params);

    if (result.affectedRows !== 1) throw { message: 'Vivienda no actualizada', code: 403 };

    const querySelect = SELECT_HOUSING_BY_ID;
    const [[updatedHousing]] = await pool.query(querySelect, id);

    res.json({ message: "Vivienda actualizada", result: updatedHousing });
  } catch (err) {
    console.log(err);
    res.status(err?.code || 500).json({ message: "Vivienda no actualizada", error: err });
  }
});

// Eliminar vivienda
router.delete('/:id', authorizeRoles(['Administrador']), async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query('DELETE FROM viviendas WHERE id = ?', [id]);

        if (result.affectedRows === 1) {
            res.json({ message: "Vivienda eliminada" });
        } else {
            throw { message: 'Vivienda no encontrada', code: 404 };
        }
    } catch (err) {
        console.log(err);
        res.status(err?.code || 500).json({message: "Vivienda no eliminada", error: err});
    }
});

export default router;
