import { getConnectionEsclavo, getConnectionMaster } from "../libs/db.js";

export const categorias = async (req, res) => {
  let connection;
  try {
    connection = await getConnectionEsclavo();
    const result = await connection.execute("SELECT * FROM CATEGORIA_REPLCIA");
    const formattedData = result.rows.map((row) => ({
      ID_CATEGORIA: row[0],
      NOMBRE_CATEGORIA: row[1],
    }));

    const response = {
      status: "success",
      data: formattedData,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error :", error);
    res.status(500).send("Error al consutar");
  } finally {
    if (connection) {
      await connection.close();
      console.log("Conexion cerrada de Esclavo");
    }
  }
};

export const categoria = async (req, res) => {
  const { id } = req.params;
  let connection;
  try {
    connection = await getConnectionEsclavo();
    const result = await connection.execute(
      "SELECT * FROM CATEGORIA_REPLCIA WHERE ID_CATEGORIA=:id",
      [id]
    );
    const formattedData = result.rows.map((row) => ({
      NOMBRE_CATEGORIA: row[1],
    }));

    const response = {
      status: "success",
      data: formattedData,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error :", error);
    res.status(500).send("Error al consutar");
  } finally {
    if (connection) {
      await connection.close();
      console.log("Conexion cerrada de Esclavo");
    }
  }
};

export const createCategoria = async (req, res) => {
  let connection;
  const { NOMBRE_CATEGORIA } = req.body;

  try {
    connection = await getConnectionMaster();
    const result = await connection.execute(
      `INSERT INTO CATEGORIA (NOMBRE_CATEGORIA) VALUES (:nombre)`,
      [NOMBRE_CATEGORIA],
      { autoCommit: true }
    );
    res.status(201).json({
      status: "success",
      message: "Categoría creada correctamente",
    });
  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({ error: "Error al crear la categoría" });
  } finally {
    if (connection) {
      await connection.close();
      console.log("Conexión cerrada de Esclavo");
    }
  }
};

export const updateCategoria = async (req, res) => {
  let connection;
  const { id } = req.params;
  const { NOMBRE_CATEGORIA } = req.body;

  try {
    connection = await getConnectionMaster();
    const result = await connection.execute(
      `UPDATE CATEGORIA SET NOMBRE_CATEGORIA = :nombre WHERE ID_CATEGORIA = :id`,
      [NOMBRE_CATEGORIA, id],
      { autoCommit: true }
    );

    if (result.rowsAffected === 0) {
      return res.status(404).json({
        status: "error",
        message: "Categoría no encontrada",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Categoría actualizada correctamente",
    });
  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({ error: "Error al actualizar la categoría" });
  } finally {
    if (connection) {
      await connection.close();
      console.log("Conexión cerrada de Esclavo");
    }
  }
};

export const deleteCategoria = async (req, res) => {
  let connection;
  const { id } = req.params;

  try {
    connection = await getConnectionMaster();
    const result = await connection.execute(
      `DELETE FROM CATEGORIA WHERE ID_CATEGORIA = :id`,
      [id],
      { autoCommit: true }
    );

    if (result.rowsAffected === 0) {
      return res.status(404).json({
        status: "error",
        message: "Categoría no encontrada",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Categoría eliminada correctamente",
    });
  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({ error: "Error al eliminar la categoría" });
  } finally {
    if (connection) {
      await connection.close();
      console.log("Conexión cerrada de Master");
    }
  }
};
