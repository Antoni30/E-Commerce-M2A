const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Ruta para agregar un comentario
router.post('/add', commentController.addComment);
router.get('/getAllComments/:id_producto', commentController.getAllComments);
router.get('/getCommentById/:id_cliente/:id_producto', commentController.getCommentById);
router.put('/updateComment/:id_cliente/:id_producto', commentController.updateComment);
router.delete('/deleteComment/:id_cliente/:id_producto', commentController.deleteComment);
module.exports = router;
