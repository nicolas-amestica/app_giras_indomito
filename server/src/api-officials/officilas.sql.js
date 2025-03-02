export const GET_ALL_RENTALS_BY_OFFICIAL = `
SELECT
	a.id,
	a.fecha_asignacion,
	a.fecha_devolucion ,
	a.fecha_registro,
	a.fecha_actualizacion,
	a.estado,
	a.rut_funcionario,
	a.vivienda_id 
FROM
	funcionarios f
	INNER JOIN arriendos a ON f.rut  = a.rut_funcionario 
WHERE
	f.rut = ?
ORDER BY
	a.estado ASC;
`;

export const GET_ALL_OFFCIAL_BY_RUT = `
	SELECT
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
        f.rol,
        f.correo,
        f.activo,
        f.fecha_registro,
        f.fecha_actualizacion,
        f.fecha_eliminacion,
        f.grado_id,
        g.nombre AS grado_nombre,
        g.grado,
        g.escalafon_id,
        e.nombre AS escalafon_nombre
      FROM
        funcionarios f
        INNER JOIN grados g ON f.grado_id = g.id
        INNER JOIN escalafones e ON g.escalafon_id = e.id
      WHERE
        1 = 1
        AND f.activo = 1
        AND f.rut = ?
`;

export const GET_ALL_OFFICIALS = `
SELECT
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
  AND f.activo = 1
ORDER BY
    f.primer_nombre ASC,
    f.segundo_nombre ASC,
    f.apellido_paterno ASC,
    f.apellido_materno ASC
LIMIT ? OFFSET ?;
`;