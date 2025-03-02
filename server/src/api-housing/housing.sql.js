export const SELECT_ALL_HOUSING_WITH_STATUS = `SELECT 
        v.id,
        IFNULL(
          (SELECT a.estado FROM arriendos a INNER JOIN funcionarios f ON a.rut_funcionario = f.rut WHERE a.vivienda_id = v.id AND a.fecha_asignacion = (SELECT MAX(a2.fecha_asignacion) FROM arriendos a2 WHERE a2.vivienda_id = v.id limit 1) LIMIT 1), 'desocupado') AS estado,
        (SELECT a.id FROM arriendos a INNER JOIN funcionarios f ON a.rut_funcionario = f.rut WHERE a.vivienda_id = v.id AND a.fecha_asignacion = (SELECT MAX(a2.fecha_asignacion) FROM arriendos a2 WHERE a2.vivienda_id = v.id limit 1) LIMIT 1) AS arriendo_id,
        (SELECT CONCAT(f.primer_nombre, ' ', f.apellido_paterno) FROM arriendos a INNER JOIN funcionarios f ON a.rut_funcionario = f.rut WHERE a.vivienda_id = v.id AND a.fecha_asignacion = (SELECT MAX(a2.fecha_asignacion) FROM arriendos a2 WHERE a2.vivienda_id = v.id limit 1) LIMIT 1) AS funcionario_nombre,
        (SELECT f.codigo FROM arriendos a INNER JOIN funcionarios f ON a.rut_funcionario = f.rut WHERE a.vivienda_id = v.id AND a.fecha_asignacion = (SELECT MAX(a2.fecha_asignacion) FROM arriendos a2 WHERE a2.vivienda_id = v.id limit 1) LIMIT 1) AS funcionario_codigo,
        (SELECT f.rut FROM arriendos a INNER JOIN funcionarios f ON a.rut_funcionario = f.rut WHERE a.vivienda_id = v.id AND a.fecha_asignacion = (SELECT MAX(a2.fecha_asignacion) FROM arriendos a2 WHERE a2.vivienda_id = v.id limit 1) LIMIT 1) AS funcionario_rut,
        (SELECT g2.id FROM arriendos a INNER JOIN funcionarios f ON a.rut_funcionario = f.rut INNER JOIN grados g2 ON f.grado_id=g2.id WHERE a.vivienda_id = v.id AND a.fecha_asignacion = (SELECT MAX(a2.fecha_asignacion) FROM arriendos a2 WHERE a2.vivienda_id = v.id limit 1) LIMIT 1) AS funcionario_grado_id,
        (SELECT g2.nombre FROM arriendos a INNER JOIN funcionarios f ON a.rut_funcionario = f.rut INNER JOIN grados g2 ON f.grado_id=g2.id WHERE a.vivienda_id = v.id AND a.fecha_asignacion = (SELECT MAX(a2.fecha_asignacion) FROM arriendos a2 WHERE a2.vivienda_id = v.id limit 1) LIMIT 1) AS funcionario_grado_nombre,
        v.calle_pasaje,
        v.numero,
        v.villa,
        v.bloque,
        v.departamento,
        v.observaciones,
        v.estacionamiento,
        v.bodegas,
        v.otros,
        v.propietario_id,
        p.nombre AS propietario_nombre,
        v.tipo_inmueble_id,
        ti.nombre AS tipo_inmueble_nombre,
        v.prefectura_id,
        pre.zona_id AS zona_id,
        pre.nombre AS prefectura_nombre,
        v.condominio_id,
        c.nombre AS condominios_nombre,
        co.id AS comuna_id,
        co.nombre As comuna_nombre,
        pr.nombre AS provincia_nombre,
        pr.id AS provincia_id,
        r.nombre AS region_nombre,
        r.id AS region_id,
        (SELECT z.id FROM zonas z WHERE z.region_id = r.id LIMIT 1) AS zona_id,
        (SELECT z.nombre FROM zonas z WHERE z.region_id = r.id LIMIT 1) AS zona_nombre,
        f.rut AS creado_por_rut,
        CONCAT(f.primer_nombre, ' ', f.apellido_paterno, ' ', f.apellido_materno) AS creado_por_nombre,
        v.fecha_creacion AS fecha_creacion
    FROM
        viviendas v
        INNER JOIN propietarios p ON v.propietario_id = p.id
        INNER JOIN tipos_inmueble ti ON v.tipo_inmueble_id = ti.id
        INNER JOIN prefecturas pre ON v.prefectura_id = pre.id 
        INNER JOIN condominios c ON v.condominio_id = c.id 
        INNER JOIN comunas co On co.id = c.comunas_id
        INNER JOIN provincias pr ON pr.id = co.provincia_id
        INNER JOIN regiones r ON r.id = pr.region_id
        INNER JOIN funcionarios f ON v.creado_por = f.rut
      LIMIT ? OFFSET ?;`;

export const SELECT_HOUSING_BY_ID = `
    SELECT
      v.id,
      IFNULL(
        (SELECT a.estado FROM arriendos a INNER JOIN funcionarios f ON a.rut_funcionario = f.rut WHERE a.vivienda_id = v.id AND a.fecha_asignacion = (SELECT MAX(a2.fecha_asignacion) FROM arriendos a2 WHERE a2.vivienda_id = v.id limit 1) LIMIT 1), 'desocupado') AS estado,
      (SELECT a.id FROM arriendos a INNER JOIN funcionarios f ON a.rut_funcionario = f.rut WHERE a.vivienda_id = v.id AND a.fecha_asignacion = (SELECT MAX(a2.fecha_asignacion) FROM arriendos a2 WHERE a2.vivienda_id = v.id limit 1) LIMIT 1) AS arriendo_id,
      (SELECT CONCAT(f.primer_nombre, ' ', f.apellido_paterno) FROM arriendos a INNER JOIN funcionarios f ON a.rut_funcionario = f.rut WHERE a.vivienda_id = v.id AND a.fecha_asignacion = (SELECT MAX(a2.fecha_asignacion) FROM arriendos a2 WHERE a2.vivienda_id = v.id limit 1) LIMIT 1) AS funcionario_nombre,
      (SELECT f.codigo FROM arriendos a INNER JOIN funcionarios f ON a.rut_funcionario = f.rut WHERE a.vivienda_id = v.id AND a.fecha_asignacion = (SELECT MAX(a2.fecha_asignacion) FROM arriendos a2 WHERE a2.vivienda_id = v.id limit 1) LIMIT 1) AS funcionario_codigo,
      (SELECT f.rut FROM arriendos a INNER JOIN funcionarios f ON a.rut_funcionario = f.rut WHERE a.vivienda_id = v.id AND a.fecha_asignacion = (SELECT MAX(a2.fecha_asignacion) FROM arriendos a2 WHERE a2.vivienda_id = v.id limit 1) LIMIT 1) AS funcionario_rut,
      (SELECT g2.id FROM arriendos a INNER JOIN funcionarios f ON a.rut_funcionario = f.rut INNER JOIN grados g2 ON f.grado_id=g2.id WHERE a.vivienda_id = v.id AND a.fecha_asignacion = (SELECT MAX(a2.fecha_asignacion) FROM arriendos a2 WHERE a2.vivienda_id = v.id limit 1) LIMIT 1) AS funcionario_grado_id,
      (SELECT g2.nombre FROM arriendos a INNER JOIN funcionarios f ON a.rut_funcionario = f.rut INNER JOIN grados g2 ON f.grado_id=g2.id WHERE a.vivienda_id = v.id AND a.fecha_asignacion = (SELECT MAX(a2.fecha_asignacion) FROM arriendos a2 WHERE a2.vivienda_id = v.id limit 1) LIMIT 1) AS funcionario_grado_nombre,
      v.calle_pasaje,
      v.numero,
      v.villa,
      v.bloque,
      v.departamento,
      v.observaciones,
      v.estacionamiento,
      v.bodegas,
      v.otros,
      v.propietario_id,
      p.nombre AS propietario_nombre,
      v.tipo_inmueble_id,
      ti.nombre AS tipo_inmueble_nombre,
      v.prefectura_id,
      pre.zona_id AS zona_id,
      pre.nombre AS prefectura_nombre,
      v.condominio_id,
      c.nombre AS condominios_nombre,
      co.id AS comuna_id,
      co.nombre As comuna_nombre,
      pr.nombre AS provincia_nombre,
      pr.id AS provincia_id,
      r.nombre AS region_nombre,
      r.id AS region_id,
      z.id AS zona_id,
      z.nombre AS zona_nombre,
      f.rut AS creado_por_rut,
      CONCAT(f.primer_nombre, ' ', f.apellido_paterno, ' ', f.apellido_materno) AS creado_por_nombre,
      v.fecha_creacion AS fecha_creacion
    FROM viviendas v
      INNER JOIN propietarios p ON v.propietario_id = p.id
      INNER JOIN tipos_inmueble ti ON v.tipo_inmueble_id = ti.id
      INNER JOIN prefecturas pre ON v.prefectura_id = pre.id
      INNER JOIN condominios c ON v.condominio_id = c.id
      INNER JOIN comunas co On co.id = c.comunas_id
      INNER JOIN provincias pr ON pr.id = co.provincia_id
      INNER JOIN regiones r ON r.id = pr.region_id
      INNER JOIN zonas z ON r.id = z.region_id
      INNER JOIN funcionarios f ON v.creado_por = f.rut 
    WHERE v.id = ?
    ;
`;
