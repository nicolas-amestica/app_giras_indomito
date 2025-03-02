import argon2 from 'argon2';
import express from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../../helpers/mysql.js';
import sendEmail from '../../helpers/nodemailer.js';
import { validateRut } from "../../common/validar-rut.js";

const router = express.Router();

// Autenticar usuario
router.post('', async (req, res) => {
  try {
    const { rut, password } = req.body;

    if (!rut || !password) throw { message: 'Faltan parámetros de entrada', code: 400 };

    const credentials = {
      rut,
      password,
    };

    const query = `
      SELECT
        f.rut,
        f.codigo,
        f.primer_nombre,
        f.segundo_nombre,
        f.apellido_paterno,
        f.apellido_materno,
        f.fecha_nacimiento,
        f.fecha_ingreso,
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
        g.nombre as grado_nombre,
        f.rol
      FROM
        funcionarios f
        INNER JOIN grados g ON f.grado_id = g.id 
      WHERE
        1 = 1
        AND f.activo = 1
        AND f.rut = ?
    `;

    const [[result]] = await pool.query(query, [credentials.rut]);
    if (!result) throw { message: 'Credenciales inválidas', code: 400 };

    const comparePassword = await argon2.verify(result.clave, credentials.password);
    if (!comparePassword) throw { message: 'Credenciales inválidas', code: 400 };

    delete result.clave;
    const { rol, codigo } = result;

    const token = jwt.sign({ rol, codigo }, process.env.SECRET_TOKEN);

    const results = {...result, token}

    res.status(200).json({ message: 'Usuario autenticado', result: results });
  } catch (err) {
    console.log(err);    
    res.status(err?.code || 500).json({ message: 'No se ha autenticado el usuario', error: err });
  }
});

// Recuperar clave
router.post('/recuperar-clave', async (req, res) => {
  try {
    const { rut } = req.body;
    if (!rut) throw { message: 'Faltan parámetros de entrada', code: 400 };

    const validatedRut = await validateRut(rut);
    if (validatedRut.error) throw { message: 'Rut inválido', code: 400 };

    const query = "SELECT * FROM funcionarios WHERE 1 = 1 AND activo = 1 AND rut = ?";

    const [[result]] = await pool.query(query, [validatedRut]);

    if (!result) return res.status(404).json({ error: 'Usuario no encontrado' });

    const password = generate(10, true, true);

    const email = await sendEmail(
        result.correo,
        'Recuperación de constraseña',
        null,
        `<p>Estimado/a ${result.primer_nombre},</p><p>Su nueva clave temporal es la siguiente: ${password}</p>`,
    );

    if (email.error) throw { message: 'No se ha podido enviar nueva clave al su correo', code: 400 };

    const updateQuery = "UPDATE funcionarios SET clave = ? WHERE activo = 1 AND rut = ?";
    const [updatedResult] = await pool.query(updateQuery, [await argon2.hash(password.toString()), validatedRut]);

    res.status(200).json({ message: 'Se ha enviado correo con su nueva clave', result: updatedResult });
  } catch (err) {
    console.log(err);
    res.status(err?.code || 500).json({ message: 'No se ha podido recuperar la clave', error: err });
  }
});

const generate = (large, number, symbol) => {
  const length = Number.parseInt(large);

  let base = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "@,_-";

  if (number) base += numbers;

  if (symbol) base += symbols;

  return generatePassword(base, length);
};

const generatePassword = (base, length) => {
  let password = "";
  for (let x = 0; x < length; x++) {
      const random = Math.floor(Math.random() * base.length);
      password += base.charAt(random);
  }
  return password;
};

export default router;
