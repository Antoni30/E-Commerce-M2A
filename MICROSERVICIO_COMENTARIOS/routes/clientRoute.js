const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const authMiddleware = require('../middlewares/authMiddleware');

// Ruta para obtener todos los clientes
router.get('/clients', clientController.getAllClients);

// Ruta para obtener un cliente por su ID
router.get('/clients/:id_cliente', clientController.getClientById);

// Ruta para actualizar un cliente existente
router.put('/clients/:id_cliente', clientController.updateClient);

// Ruta para eliminar un cliente
router.delete('/clients/:id_cliente', clientController.deleteClient);

module.exports = router;
