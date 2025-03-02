export const GET_PROVINCES_BY_REGION_ID = `
SELECT
	p.id,
	p.nombre
FROM
	provincias p
	INNER JOIN regiones r ON p.region_id = r.id
WHERE
	p.region_id = ?
ORDER BY
	p.nombre ASC;
`
