import argon2 from 'argon2';
import express from 'express';
import { pool } from "../../helpers/mysql.js";
import { getDateTime } from '../../common/date.js';
import { validateRut } from "../../common/validar-rut.js";
import { authorizeRoles } from '../../middlewares/authRoles.js';
import { GET_ALL_RENTALS_BY_OFFICIAL, GET_ALL_OFFCIAL_BY_RUT, GET_ALL_OFFICIALS } from './officilas.sql.js';

const router = express.Router();

// Obtener todos los funcionarios
router.get('', authorizeRoles(['Administrador', 'Consultor']), async (req, res) => {
  try {

    const { page, limit } = req.query;
    const offset = (page - 1) * limit;

    const query = GET_ALL_OFFICIALS;
    const [results] = await pool.query(query, [parseInt(limit), parseInt(offset)]);

    const funcionariesWithoutPassword = results.map(funcionary => {
      const { clave, ...funcionaryWithoutPassword } = funcionary;
      return funcionaryWithoutPassword;
    });

    const countQuery = `SELECT COUNT(*) as total FROM funcionarios WHERE activo = 1;`;
    const [[{ total }]] = await pool.query(countQuery);

    res.json({ message: "Funcionarios obtenidos", result: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
      data: funcionariesWithoutPassword }
    });
  } catch (err) {
    console.log(err);    
    res.status(err?.code || 500).json({ message: "Funcionarios no listados", error: err });
  }
});

// Obtener un funcionario por RUT
router.get('/:rut', authorizeRoles(['Administrador', 'Consultor']), async (req, res) => {
  try {
    const { rut } = req.params;

    const validatedRut = await validateRut(rut);
    if (validatedRut.error) throw { message: "Rut inválido", code: 400 };

    const [result] = await pool.query(GET_ALL_OFFCIAL_BY_RUT, [validatedRut]);
    if (result.length > 0) {
      delete result[0].clave;
      return res.json({message: "Funcionario encontrado", result: result[0]});
    } else {
      throw { message: 'Funcionario no encontrado', code: 404 };
    }
  } catch (err) {
    console.log(err);    
    res.status(err?.code || 500).json({ message: "Funcionario no listado", error: err });
  }
});

// Crear un nuevo funcionario
router.post('', authorizeRoles(['Administrador', 'Consultor']), async (req, res) => {
  try {
    const { rut, codigo, clave } = req.body;
    const funcionary = req.body;

    if (!rut || !codigo) throw { message: "Faltan parámetros obligatorios", code: 400 };

    const validatedRut = await validateRut(rut);
    if (validatedRut.error) throw { message: "Rut inválido", code: 400 };

    const userExistedQuery = `SELECT
        f.rut
      FROM
        funcionarios f
        INNER JOIN grados g ON f.grado_id = g.id 
      WHERE
        1 = 1
        AND rut = ?`;
    const [[userExisted]] = await pool.query(userExistedQuery, [validatedRut]);
   
    // VALIDA SI SE DEBE CREAR O ACTUALIZAR EL FUNCIONARIO
    if (!userExisted) {
      // CREAR FUNCIONARIO
      funcionary.rut = validatedRut;

      if (clave) {
        const hashedPassword = await argon2.hash(clave);
        funcionary.clave = hashedPassword;
      }

      const columns = [];
      const values = [];
      const placeholders = [];

      Object.keys(funcionary).forEach(key => {
        if (funcionary[key] !== undefined && funcionary[key] !== null) {
            columns.push(key);
            values.push(funcionary[key]);
            placeholders.push('?');
        }
      });

      if (columns.length === 0) throw { message: 'No hay campos para insertar', code: 400 };
      
      const query = `INSERT INTO funcionarios (${columns.join(', ')}) VALUES (${placeholders.join(', ')})`;

      const [result] = await pool.query(query, values);

      if (result.affectedRows !== 1)
        throw { message: "Funcionario no insertado", code: 403 };

    } else {
      // ACTUALIZAR FUNCIONARIO
      funcionary.rut = validatedRut;

      if (clave) {
        const hashedPassword = await argon2.hash(clave);
        funcionary.clave = hashedPassword;
      }

      const updates = [];
      const params = [];

      Object.keys(funcionary).forEach(key => {
        if (funcionary[key] !== undefined) {
            updates.push(`${key} = ?`);
            params.push(funcionary[key]);
        }
      });

      if (updates.length === 0) throw { message: 'No hay campos para actualizar', code: 400 };

      params.push(await validateRut(rut));

      const query = `UPDATE funcionarios SET ${updates.join(', ')} WHERE rut = ?`;

      const [result] = await pool.query(query, params);

      if (result.affectedRows !== 1)
        throw { message: 'Funcionario no actualizado', code: 403 };
    }

    const querySelect = `SELECT
        f.rut,
        f.codigo,
        f.primer_nombre,
        f.segundo_nombre,
        f.apellido_paterno,
        f.apellido_materno,
        DATE_FORMAT(f.fecha_nacimiento, '%Y-%m-%d') as fecha_nacimiento,
        DATE_FORMAT(f.fecha_ingreso, '%Y-%m-%d') as fecha_ingreso,
        f.estado_civil,
        f.sexo,
        f.clave,
        f.rol,
        f.correo,
        f.activo,
        f.fecha_registro,
        f.fecha_actualizacion,
        f.fecha_eliminacion,
        f.grado_id,
        g.nombre as grado_nombre
      FROM
        funcionarios f
        INNER JOIN grados g ON f.grado_id = g.id 
      WHERE
        1 = 1
        AND rut = ?`;
    const [[insertedFuncionary]] = await pool.query(querySelect, [funcionary.rut]);

    delete insertedFuncionary.clave;

    res.json({ message: (userExisted ? "Funcionario actualizado" : "Funcionario creado"), result: insertedFuncionary });
  } catch (err) {
    console.log(err);
    res.status(err?.code || 500).json({ message: "Funcionario no insertado o actualizado", error: err });
  }
});

// Actualizar un funcionario por RUT
router.put('/:rut', authorizeRoles(['Administrador', 'Consultor']), async (req, res) => {
  try {
    let { rut } = req.params;
    if (!rut) throw { message: "Faltan parámetros obligatorios", code: 400 };

    const funcionary = req.body;

    const validatedRut = await validateRut(rut);
    if (validatedRut.error) throw { message: "Rut inválido", code: 400 };

    funcionary.rut = validatedRut;

    const updates = [];
    const params = [];

    Object.keys(funcionary).forEach(key => {
      if (funcionary[key] !== undefined) {
          updates.push(`${key} = ?`);
          params.push(funcionary[key]);
      }
    });

    if (updates.length === 0) throw { message: 'No hay campos para actualizar', code: 400 };

    params.push(await validateRut(rut));

    const query = `UPDATE funcionarios SET ${updates.join(', ')} WHERE rut = ?`;

    const [result] = await pool.query(query, params);

    if (result.affectedRows !== 1)
      throw { message: 'Funcionario no actualizado', code: 403 };

    const querySelect = `SELECT
        f.rut,
        f.codigo,
        f.primer_nombre,
        f.segundo_nombre,
        f.apellido_paterno,
        f.apellido_materno,
        DATE_FORMAT(f.fecha_nacimiento, '%Y-%m-%d') as fecha_nacimiento,
        DATE_FORMAT(f.fecha_ingreso, '%Y-%m-%d') as fecha_ingreso,
        f.estado_civil,
        f.sexo,
        f.clave,
        f.rol,
        f.correo,
        f.activo,
        f.fecha_registro,
        f.fecha_actualizacion,
        f.fecha_eliminacion,
        f.grado_id,
        g.nombre as grado_nombre
      FROM
        funcionarios f
        INNER JOIN grados g ON f.grado_id = g.id 
      WHERE
        1 = 1
        AND rut = ?`;
    const [[updatedFuncionary]] = await pool.query(querySelect, [funcionary.rut]);

    delete updatedFuncionary.clave;

    res.json({ message: "Funcionario actualizado", result: updatedFuncionary });
  } catch (err) {
    console.log(err);
    res.status(err?.code || 500).json({ message: "Funcionario no actualizado", error: err });
  }
});

// Eliminar un funcionario por RUT
router.delete('/:rut', authorizeRoles(['Administrador']), async (req, res) => {
  try {
    let { rut } = req.params;

    if (!rut) throw { message: "Faltan parámetros obligatorios", code: 400 };

    const validatedRut = await validateRut(rut);
    if (validatedRut.error)
      throw { message: "Rut inválido", code: 400 };

    const userExistedQuery = `SELECT
        f.activo,
        f.fecha_eliminacion
      FROM
        funcionarios f
        INNER JOIN grados g ON f.grado_id = g.id 
      WHERE
        1 = 1
        AND rut = ?`;
    const [[userExisted]] = await pool.query(userExistedQuery, [validatedRut]);   

    if (userExisted?.activo === 0)
      throw { message: "Funcionario ya se encuentra eliminado", code: 403 };

    const dateTime = getDateTime();
    let [result] = await pool.query('UPDATE funcionarios SET activo = 0, fecha_eliminacion = ? WHERE rut = ?', [dateTime, validatedRut]);
    if (result.affectedRows === 0) {
      throw { message: 'Funcionario no eliminado', code: 403, result };
    }
    res.json({ message: 'Funcionario eliminado', result });
  } catch (err) {
    console.log(err);    
    res.status(err?.code || 500).json({ message: "Funcionario no eliminado", error: err });
  }
});

router.get('/:rut/arriendos', authorizeRoles(['Administrador', 'Consultor']), async (req, res) => {
  try {
    let { rut } = req.params;
    if (!rut) throw { message: "Faltan parámetros obligatorios", code: 400 };
  
    const validatedRut = await validateRut(rut);
    if (validatedRut.error) throw { message: "Rut inválido", code: 400 };

    rut = validatedRut;

    const [results] = await pool.query(GET_ALL_RENTALS_BY_OFFICIAL, [rut]);
    res.json({ message: "Arriendos obtenidos", result: results });
  } catch (err) {
    console.log(err);    
    res.status(err?.code || 500).json({ message: "Arriendos no listados", error: err });
  }
});

export default router;
