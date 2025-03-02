export const GET_COMMUNES_BY_PROVINCE_ID = `SELECT
        c.id,
        c.nombre
      FROM
        comunas c
        INNER JOIN provincias p ON c.provincia_id = p.id 
      WHERE
        c.provincia_id = ?
        ORDER BY
            c.nombre ASC;`;