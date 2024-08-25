const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    // Obtener el token del encabezado de autorización
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Asumiendo el formato "Bearer TOKEN"

    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    // Verificar y decodificar el token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'Token inválido o expirado' });
      }

      // Agregar la información del usuario decodificado al objeto de solicitud
      req.user = decoded;

      // Pasar al siguiente middleware o controlador
      next();
    });
  } catch (error) {
    return res.status(500).json({ error: 'Error de servidor' });
  }
};

module.exports = authMiddleware;
