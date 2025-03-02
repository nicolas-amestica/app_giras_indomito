import fs from 'fs';
import path from 'path';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import upload from '../../helpers/multer.js';
import { pool } from "../../helpers/mysql.js";
import { getDate } from '../../common/date.js';
import { isAuth } from '../../middlewares/auth.js';
import { authorizeRoles } from '../../middlewares/authRoles.js';

const router = express.Router();

router.post('/arriendo', upload.fields([{ name: 'files', maxCount: 10 }]), async (req, res) => {
  const connection = await pool.getConnection();
  try {

    const { categoria, arriendos_id } = req.body;
    const { files } = req.files;

    if (!categoria || !arriendos_id || !files) throw { message: "Faltan parámetros obligatorios", code: 400 };

    const uploadfiles = Object.values(req.files).flat();
    const savedFiles = [];
    const assetsDir = path.join(`repository/arriendo/${getDate()}`);

    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }

    const rentalFiles = [];

    uploadfiles.forEach(async (file) => {
      const { buffer, originalname } = file;
      const extension = path.extname(originalname);
      const fileName = `${uuidv4()}${extension}`;
      const filePath = path.join(assetsDir, fileName);

      fs.writeFileSync(filePath, buffer);

      await connection.beginTransaction();

      savedFiles.push({
        filePath,
        fileName,
        extension,
        originalName: originalname,
      });

      rentalFiles.push({ fileName, assetsDir, extension, categoria, arriendos_id })

      let query = `INSERT INTO documentos_arriendo (nombre, categoria, ruta, extension, arriendos_id) VALUES ("${fileName}", "${categoria}", "${assetsDir}", "${extension}", ${arriendos_id});`

      await connection.query(query);
    });

    await connection.commit();

    res.json({ mmesage: "Documentos cargados correctamente", result: rentalFiles});
  } catch (err) {
    await connection.rollback();
    console.log(err);
    res.status(err?.code || 500).json({ message: "No se pudieron cargar los documentos", error: err });
  } finally {
    await connection.end();
  }
});

router.post('/vivienda', upload.fields([{ name: 'files', maxCount: 10 }]), async (req, res) => {
  const connection = await pool.getConnection();
  try {

    const { categoria, vivienda_id } = req.body;
    const { files } = req.files;

    if (!categoria || !vivienda_id || !files) throw "Faltan parámetros obligatorios";    

    const uploadfiles = Object.values(req.files).flat();
    const savedFiles = [];
    const assetsDir = path.join(`repository/vivienda/${getDate()}`);

    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }

    const rentalFiles = [];

    uploadfiles.forEach(async (file) => {
      const { buffer, originalname } = file;
      const extension = path.extname(originalname);
      const fileName = `${uuidv4()}${extension}`;
      const filePath = path.join(assetsDir, fileName);

      fs.writeFileSync(filePath, buffer);

      await connection.beginTransaction();

      savedFiles.push({
        filePath,
        fileName,
        extension,
        originalName: originalname,
      });

      rentalFiles.push({ fileName, assetsDir, extension, categoria, vivienda_id })

      let query = `INSERT INTO documentos_vivienda (nombre, categoria, ruta, extension, vivienda_id) VALUES ("${fileName}", "${categoria}", "${assetsDir}", "${extension}", ${vivienda_id});`

      await connection.query(query);
    });

    await connection.commit();

    res.json({ message: "Documentos cargados correctamente", result: rentalFiles });
  } catch (err) {
    await connection.rollback();
    console.log(err);
    res.status(err?.code || 500).json({ mmesage: "No se pudieron cargar los documentos", error: err});
  } finally {
    await connection.end();
  }
});

router.post('/arriendo/descarga/:uuid', isAuth, authorizeRoles(['Administrador', 'Consultor']), (req, res) => {
  try {
    const { uuid } = req.params;
    const { assetsDir } = req.body;

    const filePath = fs.readdirSync(assetsDir).find((file) => file.startsWith(uuid));
    const file = path.join(assetsDir, filePath);

    if (!file.startsWith(assetsDir) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
      throw { message: 'Documento no encontrado', code: 404 };
    }

    res.download(file);
  } catch (err) {
    console.log(err);
    res.status(err?.code || 500).json({ message: "No se pudo descargar el documento", error: err });
  }
});

router.get('/viviendas', (req, res) => {
  try {
    const { dir, name } = req.query;

    const filePath = fs.readdirSync(dir).find((file) => file.startsWith(name));

    if (!filePath) throw { message: 'Documento no encontrado', code: 404 };

    const file = path.join(dir, filePath);

    if (!file.startsWith(dir) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
      throw { message: 'Documento no encontrado', code: 404 };
    }

    res.download(file);
  } catch (err) {
    console.log(err);
    res.status(err?.code || 500).json({ message: "No se pudo descargar el documento", error: err });
  }
});

router.get('/arriendo/:id', isAuth, authorizeRoles(['Administrador', 'Consultor']), async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('SELECT * FROM documentos_arriendo WHERE arriendos_id = ?', [id]);
    if (result.length > 0) {
      res.json({message: "Documentos encontrados", result });
    } else {
      throw { message: 'Documentos no encontrados', code: 404 };
    }
  } catch (err) {
    console.log(err);    
    res.status(err?.code || 500).json({ message: "Documentos no obtenidos", error: err });
  }
});

router.get('/viviendas/:id', isAuth, authorizeRoles(['Administrador', 'Consultor']), async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('SELECT * FROM documentos_vivienda WHERE vivienda_id = ?', [id]);
    if (result.length > 0) {
      res.json({message: "Documentos encontrados", result});
    } else {
      throw { message: 'Documentos no encontrados', code: 404 };
    }
  } catch (err) {
    console.log(err);
    res.status(err?.code || 500).json({ message: "Documentos no obtenidos", error: err });
  }
});

router.delete('/viviendas/:id', isAuth, authorizeRoles(['Administrador', 'Consultor']), async (req, res) => {
  try {
    const { id } = req.params;

    const query = `DELETE FROM documentos_vivienda WHERE id = ${id};`;

    const [result] = await pool.query(query);

    if (result.affectedRows === 1) {
      res.json({message: "Documento encontrado", result});
    } else {
      throw { message: 'Documento no eliminado', code: 404 };
    }
  } catch (err) {
    console.log(err);
    res.status(err?.code || 500).json({ message: "Documento no eliminado", error: err });
  }
});

router.delete('/arriendos/:id', isAuth, authorizeRoles(['Administrador', 'Consultor']), async (req, res) => {
  try {
    const { id } = req.params;

    const query = `DELETE FROM documentos_arriendo WHERE id = ${id};`;

    const [result] = await pool.query(query);

    if (result.affectedRows === 1) {
      res.json({message: "Documento encontrado", result});
    } else {
      throw { message: 'Documento no eliminado', code: 404 };
    }
  } catch (err) {
    console.log(err);
    res.status(err?.code || 500).json({ message: "Documento no eliminado", error: err });
  }
});

export default router;
