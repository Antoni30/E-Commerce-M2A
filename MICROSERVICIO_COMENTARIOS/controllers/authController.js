const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {pool} = require('../db');

// Controlador para registrar un usuario
exports.register = async (req, res) => {
  const { cedula, nombre, apellido, correo, direccion, ciudad, provincia, usuario, contraseña } = req.body;

  try {
    // Verificar si la ciudad proporcionada existe en la tabla ciudad
    const ciudadResult = await pool.query('SELECT * FROM ciudad WHERE nombre_ciudad = $1', [ciudad]);
    if (ciudadResult.rows.length === 0) {
      return res.status(400).json({ error: 'Ciudad no válida' });
    }

    // Verificar si la provincia proporcionada existe en la tabla provincia
    const provinciaResult = await pool.query('SELECT * FROM provincia WHERE nombre_provincia = $1', [provincia]);
    if (provinciaResult.rows.length === 0) {
      return res.status(400).json({ error: 'Provincia no válida' });
    }

    // Encriptar la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Iniciar una transacción
    await pool.query('BEGIN');

    // Insertar el nuevo cliente en la base de datos
    const result = await pool.query(
      `INSERT INTO datos_cliente (cedula, nombre, apellido, correo, direccion, ciudad, provincia) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id_cliente`,
      [cedula, nombre, apellido, correo, direccion, ciudadResult.rows[0].id_ciudad, provinciaResult.rows[0].id_provincia]
    );

    // Insertar el usuario en la tabla de gestión de usuarios
    await pool.query(
      `INSERT INTO gestion_usuario (usuario, contraseña, id_cliente_fk) 
       VALUES ($1, $2, $3) RETURNING id_usuario`,
      [usuario, hashedPassword, result.rows[0].id_cliente]
    );

    // Confirmar la transacción
    await pool.query('COMMIT');

    // Generar un token JWT
    const token = jwt.sign({ userId: result.rows[0].id_cliente }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Responder con el token generado
    res.status(201).json({ token });
  } catch (error) {
    // Si hay un error, revertir la transacción
    await pool.query('ROLLBACK');
    res.status(500).json({ error: error.message });
  }
};

// Controlador para iniciar sesión
exports.login = async (req, res) => {
  const { usuario, contraseña } = req.body;

  try {
    // Buscar al usuario en la base de datos
    const result = await pool.query(
      `SELECT gu.*, dc.id_cliente 
       FROM gestion_usuario gu 
       JOIN datos_cliente dc ON gu.id_cliente_fk = dc.id_cliente 
       WHERE gu.usuario = $1`, 
      [usuario]
    );
    
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    // Comparar la contraseña proporcionada con la almacenada en la base de datos
    const isMatch = await bcrypt.compare(contraseña, user.contraseña);
    if (!isMatch) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    // Generar un token JWT
    const token = jwt.sign({ userId: user.id_cliente }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Responder con el token generado
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
