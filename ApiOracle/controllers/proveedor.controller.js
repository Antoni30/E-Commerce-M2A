import { getConnectionMaster } from "../libs/db.js";

// CREATE: Crear un nuevo proveedor
export const createProveedor = async (req, res) => {
  let connection;
  const { nombre, apellido, email, telefono } = req.body;

  try {
    connection = await getConnectionMaster();
    const result = await connection.execute(
      `INSERT INTO PROVEEDOR (NOMBRE_PROVEEDOR, APELLIDO_PROVEEDOR, EMAIL, TELEFONO) 
         VALUES (:nombre, :apellido, :email, :telefono)`,
      [nombre, apellido, email, telefono],
      { autoCommit: true }
    );

    res.status(201).json({
      status: "success",
      message: "Proveedor creado correctamente",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al crear el proveedor" });
  } finally {
    if (connection) {
      await connection.close();
      console.log("Conexión cerrada");
    }
  }
};

// READ: Obtener todos los proveedores
export const getProveedores = async (req, res) => {
  let connection;

  try {
    connection = await getConnectionMaster();
    const result = await connection.execute(`SELECT * FROM PROVEEDOR`);
    const formattedData = result.rows.map((row) => ({
      ID_PROVEEDOR: row[0],
      NOMBRE_PROVEEDOR: row[1],
      APELLIDO_PROVEEDOR: row[2],
      EMAIL: row[3],
      TELEFONO: row[4],
    }));

    res.status(200).json({
      status: "success",
      data: formattedData,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al obtener los proveedores" });
  } finally {
    if (connection) {
      await connection.close();
      console.log("Conexión cerrada");
    }
  }
};

// READ: Obtener un proveedor por ID
export const getProveedorById = async (req, res) => {
  let connection;
  const { id } = req.params;

  try {
    connection = await getConnectionMaster();
    const result = await connection.execute(
      `SELECT * FROM PROVEEDOR WHERE ID_PROVEEDOR = :id`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Proveedor no encontrado",
      });
    }
    const formattedData = result.rows.map((row) => ({
      ID_PROVEEDOR: row[0],
      NOMBRE_PROVEEDOR: row[1],
      APELLIDO_PROVEEDOR: row[2],
      EMAIL: row[3],
      TELEFONO: row[4],
    }));
    res.status(200).json({
      status: "success",
      data: formattedData[0],
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al obtener el proveedor" });
  } finally {
    if (connection) {
      await connection.close();
      console.log("Conexión cerrada");
    }
  }
};

// UPDATE: Actualizar un proveedor
export const updateProveedor = async (req, res) => {
  let connection;
  const { id } = req.params;
  const { nombre, apellido, email, telefono } = req.body;

  try {
    connection = await getConnectionMaster();
    const result = await connection.execute(
      `UPDATE PROVEEDOR 
         SET NOMBRE_PROVEEDOR = :nombre, APELLIDO_PROVEEDOR = :apellido, EMAIL = :email, TELEFONO = :telefono 
         WHERE ID_PROVEEDOR = :id`,
      [nombre, apellido, email, telefono, id],
      { autoCommit: true }
    );

    if (result.rowsAffected === 0) {
      return res.status(404).json({
        status: "error",
        message: "Proveedor no encontrado",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Proveedor actualizado correctamente",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al actualizar el proveedor" });
  } finally {
    if (connection) {
      await connection.close();
      console.log("Conexión cerrada");
    }
  }
};

// DELETE: Eliminar un proveedor
export const deleteProveedor = async (req, res) => {
  let connection;
  const { id } = req.params;

  try {
    connection = await getConnectionMaster();
    const result = await connection.execute(
      `DELETE FROM PROVEEDOR WHERE ID_PROVEEDOR = :id`,
      [id],
      { autoCommit: true }
    );

    if (result.rowsAffected === 0) {
      return res.status(404).json({
        status: "error",
        message: "Proveedor no encontrado",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Proveedor eliminado correctamente",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al eliminar el proveedor" });
  } finally {
    if (connection) {
      await connection.close();
      console.log("Conexión cerrada");
    }
  }
};
