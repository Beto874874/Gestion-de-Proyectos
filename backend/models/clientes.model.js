const pool = require('../database/conexion');

// Obtener todos
const getClientes = async () => {
  const [rows] = await pool.query('SELECT * FROM clientes');
  return rows;
};

// Crear cliente
const createCliente = async (cliente) => {
  const { razon_social, domicilio, telefono } = cliente;

  const [result] = await pool.query(
    'INSERT INTO clientes (razon_social, domicilio, telefono) VALUES (?, ?, ?)',
    [razon_social, domicilio, telefono]
  );

  return result;
};


// actualizar cliente
const updateCliente = async (id, cliente) => {
  const { razon_social, domicilio, telefono } = cliente;

  await pool.query(
    'UPDATE clientes SET razon_social=?, domicilio=?, telefono=? WHERE codigo_cliente=?',
    [razon_social, domicilio, telefono, id]
  );
};

// eliminar cliente
const deleteCliente = async (id) => {
  await pool.query(
    'DELETE FROM clientes WHERE codigo_cliente=?',
    [id]
  );
};

module.exports = {
  getClientes,
  createCliente,
  updateCliente,
  deleteCliente
};
