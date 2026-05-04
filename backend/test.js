const pool = require('./database/conexion'); // Ajusta la ruta a tu archivo de conexión

async function testConnection() {
  try {
    // Intentamos obtener la hora del servidor MySQL
    const [rows] = await pool.query('SELECT NOW() AS hora_actual');
    console.log('¡Conexión exitosa!');
    console.log('Hora del servidor MySQL:', rows[0].hora_actual);
    
    // Intentamos ver si la tabla proyectos existe
    const [tablas] = await pool.query('SHOW TABLES');
    console.log('Tablas encontradas:', tablas);
    
    process.exit(0); // Cerramos el proceso si todo sale bien
  } catch (error) {
    console.error('Error en la conexión:');
    console.error(error.message);
    process.exit(1);
  }
}

testConnection();