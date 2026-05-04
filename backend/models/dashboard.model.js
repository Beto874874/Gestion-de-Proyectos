const pool = require('../database/conexion');

const getEstadisticas = async () => {
  const [[{ total_clientes }]]      = await pool.query('SELECT COUNT(*) AS total_clientes FROM clientes');
  const [[{ total_colaboradores }]] = await pool.query('SELECT COUNT(*) AS total_colaboradores FROM colaboradores');
  const [[{ total_proyectos }]]     = await pool.query('SELECT COUNT(*) AS total_proyectos FROM proyectos');
  const [[{ total_pagos }]]         = await pool.query('SELECT COALESCE(SUM(cantidad), 0) AS total_pagos FROM pagos');

  const [ultimos_proyectos] = await pool.query(`
    SELECT p.descripcion, p.cuantia, p.fecha_fin, c.razon_social
    FROM proyectos p
    JOIN clientes c ON p.id_cliente = c.codigo_cliente
    ORDER BY p.codigo_proyecto DESC
    LIMIT 5
  `);

  return { total_clientes, total_colaboradores, total_proyectos, total_pagos, ultimos_proyectos };
};

module.exports = { getEstadisticas };