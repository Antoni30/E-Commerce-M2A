const commentController ={};
const {pool} = require('../db');

// Controlador para agregar un comentario
commentController.addComment = async (req, res) => {
  const { id_cliente_fk, id_producto_fk, fecha_comentario, comentario, puntuacion } = req.body;

  try {
    // Verificar si el producto existe en la base de datos
    const productoResult = await pool.query('SELECT * FROM DATOS_PRODUCTO_ORACLE WHERE ID_PRODUCTO = $1;', [id_producto_fk]);
    if (productoResult.rows.length === 0) {
      return res.status(400).json({ error: 'Producto no válido' });
    }

    // Insertar el nuevo comentario en la base de datos
    const result = await pool.query(
      `INSERT INTO comentarios (id_cliente_fk, id_producto_fk, fecha_comentario, comentario, puntuacion) 
       VALUES ($1, $2, NOW(), $4, $5) ;`,
      [id_cliente_fk, id_producto_fk, comentario, puntuacion]
    );

    res.status(201).json({ comentario: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Obtener todos los comentarios
commentController.getAllComments = async (req, res) => {
  const { id_producto } = req.params;
  try {
   
      const allComments = await pool.query("SELECT c.* , p.ID_PRODUCTO FROM comentarios c join DATOS_PRODUCTO_ORACLE p on C.id_producto_fk = P.id_producto where p.id_producto=$1;", 
         [id_producto]

      );
      res.json(allComments.rows);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


// Obtener un comentario por su ID
commentController.getCommentById = async (req, res) => {
  const { id_cliente, id_producto } = req.params;

  try {
    const comment = await pool.query(
      `SELECT c.* , p.ID_PRODUCTO, dc.id_cliente  FROM comentarios c 
      join DATOS_PRODUCTO_ORACLE p on C.id_producto_fk = P.id_producto 
      join  datos_cliente dc on dc.id_cliente=c.id_cliente_fk 
      where p.id_producto=$1 and dc.id_cliente=$2;`,
      [id_cliente, id_producto]
      );
      if (comment.rows.length === 0) {
          return res.status(404).json({ error: "No existen comentarios" });
      }

      res.json(comment.rows[0]);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

// Actualizar un comentario existente
commentController.updateComment = async (req, res) => {
  const { id_cliente, id_producto } = req.params;
  const { comentario, puntuacion } = req.body;   

  try {
      const updatedComment = await pool.query(
          `UPDATE comentarios 
           SET fecha_comentario = NOW(), comentario = $1, puntuacion = $2
           WHERE id_cliente_fk = $3 AND id_producto_fk = $4;`,
         [comentario, puntuacion, id_cliente, id_producto]
      );

      if (updatedComment.rows.length === 0) {
          return res.status(404).json({ error: "Comentario no actualizado" });
      }

      res.json(updatedComment.rows[0]);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


// Eliminar un comentario
commentController.deleteComment = async (req, res) => {
  const { id_cliente, id_producto } = req.params;

  try {
      const deletedComments = await pool.query(
          `DELETE FROM comentarios 
           WHERE id_cliente_fk = $1 AND id_producto_fk = $2 ;`,
          [id_cliente, id_producto]
      );

      if (deletedComments.rows.length === 0) {
          return res.status(404).json({ error: "Comentario no encontrado" });
      }

      res.json({ message: "Comentario eliminado con éxito" });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


module.exports = commentController;
