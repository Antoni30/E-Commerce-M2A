const { Pool } = require('pg');

// Configuración de la conexión
const pool = new Pool({
  user: 'postgres',         // El nombre de usuario de tu base de datos
  host: 'localhost',          // El host donde se encuentra tu base de datos
  database: 'CLIENTE',  // El nombre de tu base de datos
  password: 'rootroot',  // La contraseña de tu base de datos
  port: 5433,                 // El puerto de PostgreSQL, por defecto es 5432
});

async function checkConnection() {
  try {
    await pool.query('SELECT NOW()'); // Realiza una consulta simple para verificar la conexión
    console.log('La conexión a la base de datos fue exitosa');
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err.message);
  }
}

module.exports = {pool,checkConnection};