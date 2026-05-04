const pool = require('../database/conexion');

const getProyectos = async () => {
  const [rows] = await pool.query(`
    SELECT p.*, c.razon_social AS cliente_nombre
    FROM proyectos p
    JOIN clientes c ON p.id_cliente = c.codigo_cliente
    ORDER BY p.codigo_proyecto
  `);
  return rows;
};

const createProyecto = async (proyecto) => {
  const { descripcion, cuantia, fecha_inicio, fecha_fin, id_cliente } = proyecto;
  const [result] = await pool.query(
    'INSERT INTO proyectos (descripcion, cuantia, fecha_inicio, fecha_fin, id_cliente) VALUES (?, ?, ?, ?, ?)',
    [descripcion, cuantia, fecha_inicio, fecha_fin, id_cliente]
  );
  return result;
};

const updateProyecto = async (id, proyecto) => {
  const { descripcion, cuantia, fecha_inicio, fecha_fin, id_cliente } = proyecto;
  await pool.query(
    'UPDATE proyectos SET descripcion=?, cuantia=?, fecha_inicio=?, fecha_fin=?, id_cliente=? WHERE codigo_proyecto=?',
    [descripcion, cuantia, fecha_inicio, fecha_fin, id_cliente, id]
  );
};

const deleteProyecto = async (id) => {
  await pool.query('DELETE FROM proyectos WHERE codigo_proyecto=?', [id]);
};

module.exports = {
  getProyectos,
  createProyecto,
  updateProyecto,
  deleteProyecto
};