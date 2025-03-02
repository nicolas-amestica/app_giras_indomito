import express from "express";
import jwt from "jsonwebtoken";
import { pool } from "../../helpers/mysql.js";
import { getDateTime } from "../../common/date.js";
import { validateRut } from "../../common/validar-rut.js";
import { authorizeRoles } from '../../middlewares/authRoles.js';

const router = express.Router();

// Obtener todos los arriendos
router.get('', authorizeRoles(['Administrador', 'Consultor']), async (req, res) => {
  try {

    const { page, limit, estado } = req.query;
    const offset = (page - 1) * limit;
    let queryPath = '';

    if (estado) {
      if (!['asignado', 'devuelto'].includes(estado))
        throw { message: "Estado no corresponde", code: 400 };

      queryPath = `AND a.estado = '${estado}'`;
    }

    const query = `
      SELECT 
        a.id,
        DATE_FORMAT(a.fecha_asignacion, '%Y-%m-%d') as fecha_asignacion,
        DATE_FORMAT(a.fecha_devolucion, '%Y-%m-%d') as fecha_devolucion,
        a.fecha_registro,
        a.fecha_actualizacion,
        a.estado,
        a.vivienda_id,
        CONCAT(
              IFNULL(v.calle_pasaje, 'SIN CALLE'), ' ', 
              IFNULL(v.numero, 'SIN NUMERO'), ' ', 
              IFNULL(v.departamento, 'SIN DEPARTAMENTO'), ', ', 
              IFNULL(v.villa, 'SIN VILLA'), ', ', 
              IFNULL(v.bloque, 'SIN BLOQUE')
        ) AS vivienda_direccion,
        a.rut_funcionario AS funcionario_rut,
        (SELECT CONCAT(
              IFNULL(f.primer_nombre, ''), ' ', 
              IFNULL(f.segundo_nombre, ''), ' ', 
              IFNULL(f.apellido_paterno, ''), ' ', 
              IFNULL(f.apellido_materno, '')
        ) FROM funcionarios f WHERE f.rut = a.rut_funcionario ) AS funcionario_nombre,
        f.rut 	  AS creado_por_rut,
        CONCAT(f.primer_nombre, ' ', f.apellido_paterno, ' ', f.apellido_materno) AS creado_por_nombre,  
        a.fecha_creacion AS fecha_creacion,
        a.asignado_por,
        (SELECT CONCAT(
              IFNULL(f.primer_nombre, ''), ' ', 
              IFNULL(f.segundo_nombre, ''), ' ', 
              IFNULL(f.apellido_paterno, ''), ' ', 
              IFNULL(f.apellido_materno, '')
        ) FROM funcionarios f WHERE f.rut = a.asignado_por ) AS asignado_por_nombre,
        a.aprobado_por,
        (SELECT CONCAT(
              IFNULL(f.primer_nombre, ''), ' ', 
              IFNULL(f.segundo_nombre, ''), ' ', 
              IFNULL(f.apellido_paterno, ''), ' ', 
              IFNULL(f.apellido_materno, '')
        ) FROM funcionarios f WHERE f.rut = a.aprobado_por ) AS aprobado_por_nombre,
        a.fecha_aprobacion,
        a.devuelto_por,
        (SELECT CONCAT(
              IFNULL(f.primer_nombre, ''), ' ', 
              IFNULL(f.segundo_nombre, ''), ' ', 
              IFNULL(f.apellido_paterno, ''), ' ', 
              IFNULL(f.apellido_materno, '')
        ) FROM funcionarios f WHERE f.rut = a.devuelto_por ) AS devuelto_por_nombre
      FROM
        arriendos a
        INNER JOIN viviendas v ON a.vivienda_id = v.id
        INNER JOIN funcionarios f ON a.creado_por = f.rut
      WHERE
        1 = 1
        ${queryPath ? queryPath : ''}
      LIMIT ? OFFSET ?;`;
    const [results] = await pool.query(query, [parseInt(limit), parseInt(offset)]);

    const countQuery = `SELECT COUNT(*) as total FROM arriendos a WHERE 1 = 1 ${queryPath ? queryPath : ''};`;
    const [[{ total }]] = await pool.query(countQuery);

    res.json({ message: "Arriendos obtenidos", result: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
      data: results }
    });
  } catch (err) {
    console.log(err);    
    res.status(err?.code || 500).json({ message: "Arriendos no listados", error: err });
  }
});

// Obtener un arriendo por RUT
router.get('/:rut', authorizeRoles(['Administrador', 'Consultor']), async (req, res) => {
  try {
    const { rut } = req.params;

    const validatedRut = await validateRut(rut);
    if (validatedRut.error) throw { message: "Rut inválido", code: 400 };

    const [result] = await pool.query(`
      SELECT 
        a.id,
        DATE_FORMAT(a.fecha_asignacion, '%Y-%m-%d') as fecha_asignacion,
        DATE_FORMAT(a.fecha_devolucion, '%Y-%m-%d') as fecha_devolucion,
        a.fecha_registro,
        a.fecha_actualizacion,
        a.estado,
        a.vivienda_id,
        CONCAT(
              IFNULL(v.calle_pasaje, 'SIN CALLE'), ' ', 
              IFNULL(v.numero, 'SIN NUMERO'), ' ', 
              IFNULL(v.departamento, 'SIN DEPARTAMENTO'), ', ', 
              IFNULL(v.villa, 'SIN VILLA'), ', ', 
              IFNULL(v.bloque, 'SIN BLOQUE')
        ) AS vivienda_direccion,
        a.rut_funcionario AS funcionario_rut,
        (SELECT CONCAT(
              IFNULL(f.primer_nombre, ''), ' ', 
              IFNULL(f.segundo_nombre, ''), ' ', 
              IFNULL(f.apellido_paterno, ''), ' ', 
              IFNULL(f.apellido_materno, '')
        ) FROM funcionarios f WHERE f.rut = a.rut_funcionario ) AS funcionario_nombre,
        f.rut AS creado_por_rut,
        CONCAT(f.primer_nombre, ' ', f.apellido_paterno, ' ', f.apellido_materno) AS creado_por_nombre,
        a.fecha_creacion AS fecha_creacion,
        a.asignado_por,
        (SELECT CONCAT(
              IFNULL(f.primer_nombre, ''), ' ', 
              IFNULL(f.segundo_nombre, ''), ' ', 
              IFNULL(f.apellido_paterno, ''), ' ', 
              IFNULL(f.apellido_materno, '')
        ) FROM funcionarios f WHERE f.rut = a.asignado_por ) AS asignado_por_nombre,
        a.aprobado_por,
        (SELECT CONCAT(
              IFNULL(f.primer_nombre, ''), ' ', 
              IFNULL(f.segundo_nombre, ''), ' ', 
              IFNULL(f.apellido_paterno, ''), ' ', 
              IFNULL(f.apellido_materno, '')
        ) FROM funcionarios f WHERE f.rut = a.aprobado_por ) AS aprobado_por_nombre,
        a.fecha_aprobacion,
        a.devuelto_por,
        (SELECT CONCAT(
              IFNULL(f.primer_nombre, ''), ' ', 
              IFNULL(f.segundo_nombre, ''), ' ', 
              IFNULL(f.apellido_paterno, ''), ' ', 
              IFNULL(f.apellido_materno, '')
        ) FROM funcionarios f WHERE f.rut = a.devuelto_por ) AS devuelto_por_nombre
      FROM
        arriendos a
        INNER JOIN viviendas v ON a.vivienda_id = v.id
        INNER JOIN funcionarios f ON a.creado_por = f.rut
      WHERE
        1 = 1
        AND a.rut_funcionario = ?
      `, [validatedRut]);
    
    if (result.length > 0) {
      return res.json({ message: "Arriendo encontrado", result });
    } else {
      throw { message: "Arriendo no encontrado", code: 404 };
    }
  } catch (err) {
    console.log(err);    
    res.status(err?.code || 500).json({ message: "Arriendo no listado", error: err });
  }
});

// Obtener historial de Asignaciones de una vivienda
router.get('/viviendas/:viviendaId', authorizeRoles(['Administrador', 'Consultor']), async (req, res) => {
  try {
    const { viviendaId } = req.params;

    if (!viviendaId) throw { message: "Es necesario el identificador de la vivienda", code: 400 };

    const [result] = await pool.query(`
      SELECT 
        a.id,
        DATE_FORMAT(a.fecha_asignacion, '%Y-%m-%d') as fecha_asignacion,
        DATE_FORMAT(a.fecha_devolucion, '%Y-%m-%d') as fecha_devolucion,
        a.fecha_registro,
        a.fecha_actualizacion,
        a.estado,
        a.vivienda_id,
        CONCAT(
              IFNULL(v.calle_pasaje, 'SIN CALLE'), ' ', 
              IFNULL(v.numero, 'SIN NUMERO'), ' ', 
              IFNULL(v.departamento, 'SIN DEPARTAMENTO'), ', ', 
              IFNULL(v.villa, 'SIN VILLA'), ', ', 
              IFNULL(v.bloque, 'SIN BLOQUE')
        ) AS vivienda_direccion,
        a.rut_funcionario AS rut_funcionario,
        (SELECT CONCAT(
              IFNULL(f.primer_nombre, ''), ' ', 
              IFNULL(f.segundo_nombre, ''), ' ', 
              IFNULL(f.apellido_paterno, ''), ' ', 
              IFNULL(f.apellido_materno, '')
        ) FROM funcionarios f WHERE f.rut = a.rut_funcionario ) AS funcionario_nombre,
        f.rut 	  AS creado_por_rut,
        CONCAT(f.primer_nombre, ' ', f.apellido_paterno, ' ', f.apellido_materno) AS creado_por_nombre,
        a.fecha_creacion AS fecha_creacion,
        a.asignado_por,
        (SELECT CONCAT(
              IFNULL(f.primer_nombre, ''), ' ', 
              IFNULL(f.segundo_nombre, ''), ' ', 
              IFNULL(f.apellido_paterno, ''), ' ', 
              IFNULL(f.apellido_materno, '')
        ) FROM funcionarios f WHERE f.rut = a.asignado_por ) AS asignado_por_nombre,
        a.aprobado_por,
        (SELECT CONCAT(
              IFNULL(f.primer_nombre, ''), ' ', 
              IFNULL(f.segundo_nombre, ''), ' ', 
              IFNULL(f.apellido_paterno, ''), ' ', 
              IFNULL(f.apellido_materno, '')
        ) FROM funcionarios f WHERE f.rut = a.aprobado_por ) AS aprobado_por_nombre,
        a.fecha_aprobacion,
        a.devuelto_por,
        (SELECT CONCAT(
              IFNULL(f.primer_nombre, ''), ' ', 
              IFNULL(f.segundo_nombre, ''), ' ', 
              IFNULL(f.apellido_paterno, ''), ' ', 
              IFNULL(f.apellido_materno, '')
        ) FROM funcionarios f WHERE f.rut = a.devuelto_por ) AS devuelto_por_nombre
      FROM
        arriendos a
        INNER JOIN viviendas v ON a.vivienda_id = v.id
        INNER JOIN funcionarios f ON a.creado_por = f.rut
      WHERE
        1 = 1
        AND a.vivienda_id = ?
      `, [viviendaId]);

    if (result.length > 0) {
      return res.json({ message: "Historial de asignación de viviendas", result });
    } else {
      throw { message: "Arriendo no encontrado", code: 404 };
    }
  } catch (err) {
    console.log(err);
    res.status(err?.code || 500).json({ message: "Arriendo no listado", error: err });
  }
});

// Crear un nuevo arriendo
router.post('', authorizeRoles(['Administrador', 'Consultor']), async (req, res) => {
  try {
    const {
      fecha_asignacion,
      rut_funcionario,
      vivienda_id
    } = req.body;

    if (!fecha_asignacion || !rut_funcionario || !vivienda_id) throw { message: "Faltan parámetros obligatorios", code: 400};

    // VALIDAR Y EXTRAER DATO DEL TOKEN 
    const token = req.headers['authorization'];
    const { codigo } = jwt.decode(token.split(' ')[1]);
    const sql = `select * from funcionarios where codigo = '${codigo}'`;
    const [[getFuncionary]] = await pool.query(sql);
    
    const rental = req.body;

    rental.creado_por = getFuncionary.rut;
    rental.asignado_por = getFuncionary.rut;

    const validatedRut = await validateRut(rut_funcionario);
    if (validatedRut.error) throw { message: "Rut inválido", code: 400 };

    const querySelectValid = `SELECT a.* FROM arriendos a WHERE 1 = 1 AND estado = 'pendiente' AND vivienda_id = ?`;
    const [[housingAvailable]] = await pool.query(querySelectValid, [vivienda_id]);

    console.log(housingAvailable)
    if (housingAvailable)
      throw { message: "Vivienda no disponible", code: 400 };

    rental.rut_funcionario = validatedRut;

    const columns = [];
    const values = [];
    const placeholders = [];

    Object.keys(rental).forEach(key => {
      if (rental[key] !== undefined && rental[key] !== null) {
          columns.push(key);
          values.push(rental[key]);
          placeholders.push('?');
      }
    });

    if (columns.length === 0) throw { message: 'No hay campos para insertar', code: 400 };
    
    const query = `INSERT INTO arriendos (${columns.join(', ')}) VALUES (${placeholders.join(', ')})`;

    const [result] = await pool.query(query, values);

    if (result.affectedRows !== 1)
      throw { message: "Arriendo no creado", code: 400 };

    const insertedId = result.insertId;

    const querySelect = `SELECT a.* FROM arriendos a WHERE 1 = 1 AND id = ?`;
    const [[insertedRental]] = await pool.query(querySelect, [insertedId]);

    insertedRental.insertId = insertedId;

    res.json({ message: "Arriendo creado", result: { insertedRental } });
  } catch (err) {
    console.log(err);
    res.status(err?.code || 500).json({ message: "Arriendo no insertado", error: err });
  }
});

// Actualizar un arriendo por id
router.put('/:id', authorizeRoles(['Administrador', 'Consultor']), async (req, res) => {
  try {
    let { id } = req.params;
    if (!id) throw { message: "Faltan parámetros obligatorios", code: 400 };

    const { estado } = req.body;

    // if (!['asignado'].includes(estado)) {
    //   throw { message: "El estado no corresponde", code: 400 };
    // }

    // VALIDAR Y EXTRAER DATO DEL TOKEN 
    const token = req.headers['authorization'];
    const { codigo } = jwt.decode(token.split(' ')[1]);
    const sql = `select * from funcionarios where codigo = '${codigo}'`;
    const [[getFuncionary]] = await pool.query(sql);
    
    const rentals = req.body;

    rentals.aprobado_por = getFuncionary.rut;
    rentals.fecha_aprobacion = getDateTime();

    const updates = [];
    const params = [];

    Object.keys(rentals).forEach(key => {
      if (rentals[key] !== undefined) {
          updates.push(`${key} = ?`);
          params.push(rentals[key]);
      }
    });

    if (updates.length === 0) throw { message: 'No hay campos para actualizar', code: 400 };

    params.push(id);

    const query = `UPDATE arriendos SET ${updates.join(', ')} WHERE id = ?`;

    const [result] = await pool.query(query, params);

    if (result.affectedRows !== 1)
      throw { message: "Arriendo no actualizado", code: 400 };

    const querySelect = `SELECT a.* FROM arriendos a WHERE 1 = 1 AND a.id = ?`;
    const [updatedRental] = await pool.query(querySelect, [id]);

    res.json({ message: "Arriendo actualizado", result: updatedRental });
  } catch (err) {
    console.log(err);
    res.status(err?.code || 500).json({ message: "Arriendo no actualizado", error: err });
  }
});

// Eliminar un arriendo por id
router.delete('/:id', authorizeRoles(['Administrador', 'Consultor']), async (req, res) => {
  try {
    const { id } = req.params;

    const [[result]] = await pool.query(`SELECT a.id, a.estado, a.vivienda_id FROM arriendos a WHERE 1 = 1 AND a.id = ${id};`);

    if (result === undefined)
      throw { message: "Arriendo no encontrado", code: 400 };
    
    if (result.estado === 'devuelto')
      throw { message: "Arriendo ya se encuentra devuelto", code: 400 };

    // VALIDAR Y EXTRAER DATO DEL TOKEN 
    const token = req.headers['authorization'];
    const { codigo } = jwt.decode(token.split(' ')[1]);
    const sql = `select * from funcionarios where codigo = '${codigo}'`;
    const [[getFuncionary]] = await pool.query(sql);

    const fechaActual = getDateTime();
    const query = `UPDATE arriendos SET estado = 'devuelto', fecha_devolucion = '${fechaActual}', devuelto_por = '${getFuncionary.rut}'  WHERE id = ${result.id}`;
    const [deletedRental] = await pool.query(query);

    if (deletedRental.affectedRows !== 1)
      throw { message: "Arriendo no eliminado", code: 400 };

    res.status(200).json({ message: "Arriendo eliminado", result });
  } catch (err) {
    console.log(err);    
    res.status(err?.code || 500).json({ message: "Arriendo no eliminado", error: err });
  }
});

export default router;
