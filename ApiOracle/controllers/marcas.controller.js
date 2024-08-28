import {getConnectionMaster } from "../libs/db.js";

export const createMarca = async (req, res) => {
    let connection;
    const {nombre } = req.body;
  
    try {
      connection = await getConnectionMaster();
      const result = await connection.execute(
        `INSERT INTO MARCA (NOMBRE_MARCA) VALUES (:nombre)`,
        [nombre],
        { autoCommit: true }
      );
  
      res.status(201).json({
        status: 'success',
        message: 'Marca creada correctamente',
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error al crear la marca' });
    } finally {
      if (connection) {
        await connection.close();
        console.log('Conexión cerrada');
      }
    }
  };

  export const getMarcas = async (req, res) => {
    let connection;
  
    try {
      connection = await getConnectionMaster();
      const result = await connection.execute(`SELECT * FROM MARCA`);
      const formattedData = result.rows.map((row) => ({
        ID_MARCA: row[0],
        NOMBRE_MARCA: row[1],
      }));
      res.status(200).json({
        status: 'success',
        data: formattedData,
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error al obtener las marcas' });
    } finally {
      if (connection) {
        await connection.close();
        console.log('Conexión cerrada');
      }
    }
  };
  
  export const getMarcaById = async (req, res) => {
    let connection;
    const { id } = req.params;
  
    try {
      connection = await getConnectionMaster();
      const result = await connection.execute(`SELECT * FROM MARCA WHERE ID_MARCA = :id`, [id]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({
          status: 'error',
          message: 'Marca no encontrada',
        });
      }
      const formattedData = result.rows.map((row) => ({
        ID_MARCA: row[0],
        NOMBRE_MARCA: row[1],
      }));
      res.status(200).json({
        status: 'success',
        data: formattedData[0],
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error al obtener la marca' });
    } finally {
      if (connection) {
        await connection.close();
        console.log('Conexión cerrada');
      }
    }
  };

  export const updateMarca = async (req, res) => {
    let connection;
    const { id } = req.params;
    const { nombre } = req.body;
  
    try {
      connection = await getConnectionMaster();
      const result = await connection.execute(
        `UPDATE MARCA SET NOMBRE_MARCA = :nombre WHERE ID_MARCA = :id`,
        [nombre, id],
        { autoCommit: true }
      );
  
      if (result.rowsAffected === 0) {
        return res.status(404).json({
          status: 'error',
          message: 'Marca no encontrada',
        });
      }
  
      res.status(200).json({
        status: 'success',
        message: 'Marca actualizada correctamente',
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error al actualizar la marca' });
    } finally {
      if (connection) {
        await connection.close();
        console.log('Conexión cerrada');
      }
    }
  };


  export const deleteMarca = async (req, res) => {
    let connection;
    const { id } = req.params;
  
    try {
      connection = await getConnectionMaster();
      const result = await connection.execute(
        `DELETE FROM MARCA WHERE ID_MARCA = :id`,
        [id],
        { autoCommit: true }
      );
  
      if (result.rowsAffected === 0) {
        return res.status(404).json({
          status: 'error',
          message: 'Marca no encontrada',
        });
      }
  
      res.status(200).json({
        status: 'success',
        message: 'Marca eliminada correctamente',
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error al eliminar la marca' });
    } finally {
      if (connection) {
        await connection.close();
        console.log('Conexión cerrada');
      }
    }
  };