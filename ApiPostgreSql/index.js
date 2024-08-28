const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const commentRoutes = require('./routes/commentRoutes'); 
const cors = require('cors');
const listClients = require('./routes/clientRoute');
const { checkConnection } = require('./db.js');
// Configurar la aplicación para que pueda recibir JSON
app.use(express.json());
checkConnection();

// Habilitar CORS para tu frontend
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Configurar las rutas
app.use('/auth', authRoutes);
app.use('/clients', listClients);
app.use('/comments', commentRoutes);

// Ruta protegida de ejemplo
app.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Acceso permitido', user: req.user });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
