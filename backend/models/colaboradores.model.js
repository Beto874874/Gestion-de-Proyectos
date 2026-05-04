const pool = require('../database/conexion');

const getColaboradores = async () => {
  const [rows] = await pool.query('SELECT * FROM colaboradores');
  return rows;
};

const createColaborador = async (colaborador) => {
  const { nif, nombre, domicilio, telefono, banco, numero_cuenta } = colaborador;
  const [result] = await pool.query(
    'INSERT INTO colaboradores (nif, nombre, domicilio, telefono, banco, numero_cuenta) VALUES (?, ?, ?, ?, ?, ?)',
    [nif, nombre, domicilio, telefono, banco, numero_cuenta]
  );
  return result;
};

const updateColaborador = async (nif, colaborador) => {
  const { nombre, domicilio, telefono, banco, numero_cuenta } = colaborador;
  await pool.query(
    'UPDATE colaboradores SET nombre=?, domicilio=?, telefono=?, banco=?, numero_cuenta=? WHERE nif=?',
    [nombre, domicilio, telefono, banco, numero_cuenta, nif]
  );
};

const deleteColaborador = async (nif) => {
  await pool.query('DELETE FROM colaboradores WHERE nif=?', [nif]);
};

module.exports = {
  getColaboradores,
  createColaborador,
  updateColaborador,
  deleteColaborador
};