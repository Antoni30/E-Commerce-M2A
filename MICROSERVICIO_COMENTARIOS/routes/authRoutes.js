const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta para registrar un usuario
router.post('/register', authController.register);

// Ruta para iniciar sesión (login)
router.post('/login', authController.login);

module.exports = router;
