const clientController = {};

const { pool } = require('../db');

// Obtener todos los clientes
clientController.getAllClients = async (req, res) => {
    try {
        const allClients = await pool.query("SELECT * FROM datos_cliente");
        res.json(allClients.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un cliente por su ID
clientController.getClientById = async (req, res) => {
    const { id_cliente } = req.params;

    try {
        const client = await pool.query("SELECT * FROM datos_cliente WHERE id_cliente = $1", [id_cliente]);

        if (client.rows.length === 0) {
            return res.status(404).json({ error: "Cliente no encontrado" });
        }

        res.json(client.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Actualizar un cliente existente
clientController.updateClient = async (req, res) => {
    const { id_cliente } = req.params;
    const { cedula, nombre, apellido, correo, direccion, ciudad, provincia } = req.body;   

    try {
        const updatedClient = await pool.query(
            `UPDATE datos_cliente SET cedula = $1, nombre = $2, apellido = $3, correo = $4, 
            direccion = $5, ciudad = $6, provincia = $7 WHERE id_cliente = $8 RETURNING *`,
            [cedula, nombre, apellido, correo, direccion, ciudad, provincia, id_cliente]
        );

        if (updatedClient.rows.length === 0) {
            return res.status(404).json({ error: "Cliente no encontrado" });
        }

        res.json(updatedClient.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un cliente
clientController.deleteClient = async (req, res) => {
    const { id_cliente } = req.params;

    try {
        const deletedClient = await pool.query(
            "DELETE FROM datos_cliente WHERE id_cliente = $1 RETURNING *",
            [id_cliente]
        );

        if (deletedClient.rows.length === 0) {
            return res.status(404).json({ error: "Cliente no encontrado" });
        }

        res.json({ message: "Cliente eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = clientController;