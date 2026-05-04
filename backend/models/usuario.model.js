const pool = require('../database/conexion');

// Crear usuario
const crearUsuario = async (usuario, password, rol) => {
    const [rows] = await pool.query(
        'INSERT INTO usuarios (usuario, password, rol) VALUES (?, ?, ?)',
        [usuario, password, rol]
    );
    return rows;
};

// Buscar por usuario
const buscarPorUsuario = async (usuario) => {
    const [rows] = await pool.query(
        'SELECT * FROM usuarios WHERE usuario = ?',
        [usuario]
    );
    return rows[0];
};

module.exports = {
    crearUsuario,
    buscarPorUsuario
};
