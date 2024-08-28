import { getConnectionMaster } from "../libs/db.js";

// CREATE: Crear una nueva relación entre proveedor y marca
export const createProveedorMarca = async (req, res) => {
  let connection;
  const { id_proveedor, id_marca } = req.body;

  try {
    connection = await getConnectionMaster();
    const result = await connection.execute(
      `INSERT INTO PROVEEDOR_MARCA (ID_PROVEEDOR, ID_MARCA) 
         VALUES (:id_proveedor, :id_marca)`,
      [id_proveedor, id_marca],
      { autoCommit: true }
    );

    res.status(201).json({
      status: "success",
      message: "Relación proveedor-marca creada correctamente",
    });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Error al crear la relación proveedor-marca" });
  } finally {
    if (connection) {
      await connection.close();
      console.log("Conexión cerrada");
    }
  }
};

// READ: Obtener todas las relaciones proveedor-marca
export const getProveedorMarcas = async (req, res) => {
  let connection;

  try {
    connection = await getConnectionMaster();
    const result = await connection.execute(`SELECT * FROM PROVEEDOR_MARCA`);
    const formattedData = result.rows.map((row) => ({
      ID_PROVEEDOR: row[0],
      ID_MARCA: row[1],
    }));

    res.status(200).json({
      status: "success",
      data: formattedData,
    });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Error al obtener las relaciones proveedor-marca" });
  } finally {
    if (connection) {
      await connection.close();
      console.log("Conexión cerrada");
    }
  }
};

// UPDATE: Actualizar una relación proveedor-marca
export const updateProveedorMarca = async (req, res) => {
  let connection;
  const { id_proveedor, id_marca } = req.params;
  const { new_id_proveedor, new_id_marca } = req.body;

  try {
    connection = await getConnectionMaster();
    const result = await connection.execute(
      `UPDATE PROVEEDOR_MARCA 
         SET ID_PROVEEDOR = :new_id_proveedor, ID_MARCA = :new_id_marca 
         WHERE ID_PROVEEDOR = :id_proveedor AND ID_MARCA = :id_marca`,
      [new_id_proveedor, new_id_marca, id_proveedor, id_marca],
      { autoCommit: true }
    );

    if (result.rowsAffected === 0) {
      return res.status(404).json({
        status: "error",
        message: "Relación proveedor-marca no encontrada",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Relación proveedor-marca actualizada correctamente",
    });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Error al actualizar la relación proveedor-marca" });
  } finally {
    if (connection) {
      await connection.close();
      console.log("Conexión cerrada");
    }
  }
};

// DELETE: Eliminar una relación proveedor-marca
export const deleteProveedorMarca = async (req, res) => {
  let connection;
  const { id_proveedor, id_marca } = req.params;

  try {
    connection = await getConnectionMaster();
    const result = await connection.execute(
      `DELETE FROM PROVEEDOR_MARCA WHERE ID_PROVEEDOR = :id_proveedor AND ID_MARCA = :id_marca`,
      [id_proveedor, id_marca],
      { autoCommit: true }
    );

    if (result.rowsAffected === 0) {
      return res.status(404).json({
        status: "error",
        message: "Relación proveedor-marca no encontrada",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Relación proveedor-marca eliminada correctamente",
    });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Error al eliminar la relación proveedor-marca" });
  } finally {
    if (connection) {
      await connection.close();
      console.log("Conexión cerrada");
    }
  }
};

export const getMarcas_de_Proveedor = async (req, res) => {
  const { id_proveedor } = req.params;
  let connection;
  try {
    connection = await getConnectionMaster();
    const result = await connection.execute(
      `SELECT p.NOMBRE_PROVEEDOR, m.NOMBRE_MARCA 
         FROM PROVEEDOR p 
         JOIN PROVEEDOR_MARCA pm ON p.ID_PROVEEDOR = pm.ID_PROVEEDOR
         JOIN MARCA m ON pm.ID_MARCA = m.ID_MARCA 
         WHERE p.ID_PROVEEDOR = :id_proveedor`,
      [id_proveedor]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No se encontraron marcas para el proveedor especificado",
      });
    }

    const formattedData = result.rows.map((row) => ({
      NOMBRE_MARCA: row[1],
    }));

    res.status(200).json({
      status: "success",
      proveedor: result.rows[0][0], // El nombre del proveedor está en la primera columna de la primera fila
      data: formattedData,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al obtener marcas del proveedor" });
  } finally {
    if (connection) {
      await connection.close();
      console.log("Conexión cerrada");
    }
  }
};

export const getProveedores_de_Marca = async (req, res) => {
  const { id_marca } = req.params;
  let connection;
  try {
    connection = await getConnectionMaster();
    const result = await connection.execute(
      `SELECT m.NOMBRE_MARCA ,p.NOMBRE_PROVEEDOR 
        FROM MARCA m 
        JOIN PROVEEDOR_MARCA pm ON pm.ID_MARCA = m.ID_MARCA 
        JOIN PROVEEDOR p ON pm.ID_PROVEEDOR = p.ID_PROVEEDOR 
        WHERE m.ID_MARCA = :id_marca`,
      [id_marca]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No se encontraron proveedores para la marca especifica",
      });
    }

    const formattedData = result.rows.map((row) => ({
      NOMBRE_PROVEEDOR: row[1],
    }));

    res.status(200).json({
      status: "success",
      marca: result.rows[0][0], // El nombre del proveedor está en la primera columna de la primera fila
      data: formattedData,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al obtener marcas del proveedor" });
  } finally {
    if (connection) {
      await connection.close();
      console.log("Conexión cerrada");
    }
  }
};
