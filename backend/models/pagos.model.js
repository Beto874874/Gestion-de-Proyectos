const pool = require('../database/conexion');

const getPagos = async () => {
  const [rows] = await pool.query(`
    SELECT p.*, 
           c.nombre AS colaborador_nombre,
           t.descripcion AS tipo_pago_nombre
    FROM pagos p
    JOIN colaboradores c ON p.nif_colaborador = c.nif
    JOIN tipos_pago t ON p.id_tipo_pago = t.codigo_tipo
    ORDER BY p.numero_pago
  `);
  return rows;
};

const createPago = async (pago) => {
  const { concepto, cantidad, fecha_pago, nif_colaborador, id_tipo_pago } = pago;
  const [result] = await pool.query(
    'INSERT INTO pagos (concepto, cantidad, fecha_pago, nif_colaborador, id_tipo_pago) VALUES (?, ?, ?, ?, ?)',
    [concepto, cantidad, fecha_pago, nif_colaborador, id_tipo_pago]
  );
  return result;
};

const updatePago = async (id, pago) => {
  const { concepto, cantidad, fecha_pago, nif_colaborador, id_tipo_pago } = pago;
  await pool.query(
    'UPDATE pagos SET concepto=?, cantidad=?, fecha_pago=?, nif_colaborador=?, id_tipo_pago=? WHERE numero_pago=?',
    [concepto, cantidad, fecha_pago, nif_colaborador, id_tipo_pago, id]
  );
};

const deletePago = async (id) => {
  await pool.query('DELETE FROM pagos WHERE numero_pago=?', [id]);
};

module.exports = {
  getPagos,
  createPago,
  updatePago,
  deletePago
};