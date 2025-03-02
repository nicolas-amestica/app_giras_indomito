export const GET_CONDOMINIUMS_BY_COMMUNE_ID = `
SELECT
	c.id,
	c.nombre
FROM
	condominios c
	INNER JOIN comunas c2 ON c.comunas_id = c2.id
WHERE
	c2.id = ?
ORDER BY
	c.nombre ASC;`