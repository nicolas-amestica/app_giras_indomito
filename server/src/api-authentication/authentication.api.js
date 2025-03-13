import argon2 from 'argon2';
import express from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../../helpers/mysql.js';
import sendEmail from '../../helpers/nodemailer.js';

const router = express.Router();

// Autenticar usuario
router.post('/login', async (req, res) => {
  try {
    const { correo, clave } = req.body;

    if (!correo || !clave) throw { message: 'Faltan parámetros de entrada', code: 400 };

    const credentials = {
      correo,
      clave,
    };

    const query = `
      SELECT
        u.correo,
        u.clave,
        u.nombre,
        u.apellido_paterno,
        u.apellido_materno,
        u.sexo,
        u.created_at,
        u.activo
      FROM
        usuario u
      WHERE
        1 = 1
        AND u.activo = 1
        AND u.correo = ?
    `;

    const [[result]] = await pool.query(query, [credentials.correo]);
    if (!result) throw { message: 'Credenciales inválidas', code: 400 };

    const comparePassword = await argon2.verify(result.clave, credentials.clave);
    // if (!comparePassword) throw { message: 'Credenciales inválidas', code: 400 };

    // delete result.clave;
    // const { rol, codigo } = result;

    // const token = jwt.sign({ rol, codigo }, process.env.SECRET_TOKEN);

    // const results = {...result, token}

    res.status(200).json({ message: 'Usuario autenticado', result: result });
  } catch (err) {
    console.log(err);    
    res.status(err?.code || 500).json({ message: 'No se ha autenticado el usuario', error: err });
  }
});

// Recuperar clave
router.post('/recuperar-clave', async (req, res) => {
  try {
    const { correo } = req.body;
    if (!correo) throw { message: 'Faltan parámetros de entrada', code: 400 };

    const query = "SELECT * FROM usuario WHERE 1 = 1 AND activo = 1 AND correo = ?";

    const [[result]] = await pool.query(query, [correo]);

    if (!result) return res.status(404).json({ error: 'Usuario no encontrado' });

    const password = generate(10, true, true);

    const email = await sendEmail(
        result.correo,
        'Recuperación de constraseña',
        null,
        `<p>Estimado/a ${result.nombre},</p><p>Su nueva clave temporal es la siguiente: ${password}</p>`,
    );

    if (email.error) throw { message: 'No se ha podido enviar nueva clave al su correo', code: 400 };

    const updateQuery = "UPDATE usuario SET clave = ? WHERE activo = 1 AND correo = ?";
    const [updatedResult] = await pool.query(updateQuery, [await argon2.hash(password.toString()), result.correo]);

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
