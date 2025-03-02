export const GET_REPORT_DATA = `
SELECT 
	zona_id,
	zona_nombre, 
	prefectura_id,
	prefectura_nombre,
	COUNT(*) AS total,
	SUM(CASE WHEN estado = 'asignado' THEN 1 ELSE 0 END) AS ocupados,
    SUM(CASE WHEN estado = 'desocupado' THEN 1 ELSE 0 END) AS desocupados,
	SUM(CASE WHEN estado = 'pendiente' THEN 1 ELSE 0 END) AS pendientes,
	SUM(CASE WHEN estado = 'devuelto' THEN 1 ELSE 0 END) AS devueltos
FROM
	(SELECT
		pre.zona_id AS zona_id,
		(select nombre from zonas z2 where id = zona_id) as zona_nombre,
		v.prefectura_id,
		pre.nombre AS prefectura_nombre,
		IFNULL(
			(SELECT a.estado FROM arriendos a INNER JOIN funcionarios f ON a.rut_funcionario = f.rut WHERE a.vivienda_id = v.id AND a.fecha_asignacion = (SELECT MAX(a2.fecha_asignacion) FROM arriendos a2 WHERE a2.vivienda_id = v.id limit 1) LIMIT 1), 'desocupado') AS estado
	FROM 
		viviendas v
		INNER JOIN propietarios p ON v.propietario_id = p.id
		INNER JOIN tipos_inmueble ti ON v.tipo_inmueble_id = ti.id
		INNER JOIN prefecturas pre ON v.prefectura_id = pre.id
	) as tabla_1
GROUP BY
	zona_id,
	zona_nombre, 
	prefectura_id,
	prefectura_nombre
ORDER BY
	zona_nombre ASC,
	prefectura_nombre ASC
;`;

export const GET_REPORT_STRUCTURE = `
SELECT z.id AS zona_id, z.nombre AS zona_nombre, p.id AS prefectura_id, p.nombre AS prefectura_nombre FROM prefecturas p INNER JOIN zonas z ON p.zona_id = z.id ORDER BY z.id ASC, p.nombre ASC;
`;