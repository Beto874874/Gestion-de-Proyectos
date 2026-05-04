const pool = require('../database/conexion');

const getTiposPago = async () => {
  const [rows] = await pool.query('SELECT * FROM tipos_pago');
  return rows;
};

const createTipoPago = async (tipo) => {
  const { descripcion } = tipo;
  const [result] = await pool.query(
    'INSERT INTO tipos_pago (descripcion) VALUES (?)',
    [descripcion]
  );
  return result;
};

const updateTipoPago = async (id, tipo) => {
  const { descripcion } = tipo;
  await pool.query(
    'UPDATE tipos_pago SET descripcion=? WHERE codigo_tipo=?',
    [descripcion, id]
  );
};

const deleteTipoPago = async (id) => {
  await pool.query('DELETE FROM tipos_pago WHERE codigo_tipo=?', [id]);
};

module.exports = { getTiposPago, createTipoPago, updateTipoPago, deleteTipoPago };