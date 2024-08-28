import { getConnectionMaster, getConnectionEsclavo } from "../libs/db.js";

export const createProducto = async (req, res) => {
  let connection;
  const {
    ID_MARCA_FK,
    CODIGO_PRODUCTO,
    NOMBRE_PRODUCTO,
    PRECIO_COMPRA,
    PRECIO_VENTA,
    DESCRIPCION_PRODUCTO,
    STOCK,
    CATEGORIA_FK,
  } = req.body;

  try {
    connection = await getConnectionMaster();
    const result = await connection.execute(
      `INSERT INTO Datos_Producto_Part (
          ID_MARCA_FK,
          CODIGO_PRODUCTO,
          NOMBRE_PRODUCTO,
          PRECIO_COMPRA,
          PRECIO_VENTA,
          DESCRIPCION_PRODUCTO,
          STOCK,
          CATEGORIA_FK
        ) VALUES (
          :ID_MARCA_FK,
          :CODIGO_PRODUCTO,
          :NOMBRE_PRODUCTO,
          :PRECIO_COMPRA,
          :PRECIO_VENTA,
          :DESCRIPCION_PRODUCTO,
          :STOCK,
          :CATEGORIA_FK
        )`,
      [
        ID_MARCA_FK,
        CODIGO_PRODUCTO,
        NOMBRE_PRODUCTO,
        PRECIO_COMPRA,
        PRECIO_VENTA,
        DESCRIPCION_PRODUCTO,
        STOCK,
        CATEGORIA_FK,
      ],
      { autoCommit: true }
    );

    res.status(201).json({
      status: "success",
      message: "Producto creado correctamente",
      data: result,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al crear el producto" });
  } finally {
    if (connection) {
      await connection.close();
      console.log("Conexión cerrada");
    }
  }
};

export const getProductoById = async (req, res) => {
  let connection;
  const { id } = req.params;

  try {
    connection = await getConnectionEsclavo();
    const result = await connection.execute(
      `SELECT * FROM DATOS_PRODUCTO_REPLICA WHERE ID_PRODUCTO = :id`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Producto no encontrado",
      });
    }
    const formattedData = result.rows.map((row) => ({
      ID_PRODUCTO: row[0],
      ID_MARCA: row[1],
      CODIGO_PRODUCTO: row[2],
      NOMBRE_PRODUCTO: row[3],
      PRECIO_COMPRA: row[4],
      PRECIO_VENTA: row[5],
      DESCRIPCION_PRODUCTO: row[6],
      STOCK: row[7],
      CATEGORIA_FK: row[8],
      IMG: row[9],
    }));
    res.status(200).json({
      status: "success",
      data: formattedData[0],
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al obtener el producto" });
  } finally {
    if (connection) {
      await connection.close();
      console.log("Conexión cerrada");
    }
  }
};

// export const getProductos = async (req, res) => {
//   let connection;
//   try {
//     connection = await getConnectionEsclavo();
//     const result = await connection.execute(
//       `SELECT * FROM DATOS_PRODUCTO_REPLICA`
//     );
//     const formattedData = result.rows.map((row) => ({
//       ID_PRODUCTO: row[0],
//       ID_MARCA: row[1],
//       CODIGO_PRODUCTO: row[2],
//       NOMBRE_PRODUCTO: row[3],
//       PRECIO_COMPRA: row[4],
//       PRECIO_VENTA: row[5],
//       DESCRIPCION_PRODUCTO: row[6],
//       STOCK: row[7],
//       CATEGORIA_FK: row[8],
//       IMG: row[9],
//     }));
//     res.status(200).json({
//       status: "success",
//       data: formattedData,
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Error al obtener el productos" });
//   } finally {
//     if (connection) {
//       await connection.close();
//       console.log("Conexión cerrada");
//     }
//   }
// };

export const getProductos = async (req, res) => {
  let connection;
  const { categoria } = req.query;  // Obtener la categoría desde los query params

  try {
    connection = await getConnectionEsclavo();
    const sql = categoria 
      ? `SELECT * FROM DATOS_PRODUCTO_REPLICA WHERE CATEGORIA_FK = :categoria` 
      : `SELECT * FROM DATOS_PRODUCTO_REPLICA`;
    const result = await connection.execute(sql, categoria ? [categoria] : []);

    const formattedData = result.rows.map(row => ({
      ID_PRODUCTO: row[0],
      ID_MARCA: row[1],
      CODIGO_PRODUCTO: row[2],
      NOMBRE_PRODUCTO: row[3],
      PRECIO_COMPRA: row[4],
      PRECIO_VENTA: row[5],
      DESCRIPCION_PRODUCTO: row[6],
      STOCK: row[7],
      CATEGORIA_FK: row[8],
      IMG: row[9]  // Asegúrate de que el índice coincida con el orden de las columnas en la tabla
    }));

    res.status(200).json({
      status: 'success',
      data: formattedData,
    });
  } catch (error) {
    console.error('Error :', error);
    res.status(500).json({ error: 'Error al consultar los productos' });
  } finally {
    if (connection) {
      await connection.close();
      console.log('Conexión cerrada de Esclavo');
    }
  }
};


export const updateProducto = async (req, res) => {
  let connection;
  const { id } = req.params;
  const {
    ID_MARCA_FK,
    CODIGO_PRODUCTO,
    NOMBRE_PRODUCTO,
    PRECIO_COMPRA,
    PRECIO_VENTA,
    DESCRIPCION_PRODUCTO,
    STOCK,
    CATEGORIA_FK,
  } = req.body;

  try {
    connection = await getConnectionMaster();
    const result = await connection.execute(
      `UPDATE Datos_Producto_Part 
         SET ID_MARCA_FK = :ID_MARCA_FK,
             CODIGO_PRODUCTO = :CODIGO_PRODUCTO,
             NOMBRE_PRODUCTO = :NOMBRE_PRODUCTO,
             PRECIO_COMPRA = :PRECIO_COMPRA,
             PRECIO_VENTA = :PRECIO_VENTA,
             DESCRIPCION_PRODUCTO = :DESCRIPCION_PRODUCTO,
             STOCK = :STOCK,
             CATEGORIA_FK = :CATEGORIA_FK
         WHERE ID_PRODUCTO = :id`,
      [
        ID_MARCA_FK,
        CODIGO_PRODUCTO,
        NOMBRE_PRODUCTO,
        PRECIO_COMPRA,
        PRECIO_VENTA,
        DESCRIPCION_PRODUCTO,
        STOCK,
        CATEGORIA_FK,
        id,
      ],
      { autoCommit: true }
    );

    if (result.rowsAffected === 0) {
      return res.status(404).json({
        status: "error",
        message: "Producto no encontrado",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Producto actualizado correctamente",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al actualizar el producto" });
  } finally {
    if (connection) {
      await connection.close();
      console.log("Conexión cerrada");
    }
  }
};

export const deleteProducto = async (req, res) => {
  let connection;
  const { id } = req.params;

  try {
    connection = await getConnectionMaster();
    const result = await connection.execute(
      `DELETE FROM Datos_Producto_Part WHERE ID_PRODUCTO = :id`,
      [id],
      { autoCommit: true }
    );

    if (result.rowsAffected === 0) {
      return res.status(404).json({
        status: "error",
        message: "Producto no encontrado",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Producto eliminado correctamente",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al eliminar el producto" });
  } finally {
    if (connection) {
      await connection.close();
      console.log("Conexión cerrada");
    }
  }
};
