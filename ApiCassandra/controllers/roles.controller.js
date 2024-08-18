import { client } from "../libs/cassandra.js";

export const getRoles = async (req, res) => {
  try {
    const result = await client.execute("SELECT * FROM roles;");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Error fetching roles");
  }
};
export const postRol = async (req, res) => {
  const { rol } = req.body;
  try {
    await client.execute(
      "INSERT INTO roles (role_id, role_name,) VALUES (uuid(), ?)",
      [rol],
      { prepare: true }
    );
    res.status(201).send("Rol created");
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).send("Error inserting user");
  }
};

export const putRol = async (req, res) => {
  const { id } = req.params;
  const { rol } = req.body;
  try {
    const result = await client.execute(
      "UPDATE users SET username = ?, email = ? WHERE user_id = ?",
      [username, password, id],
      { prepare: true }
    );
    if (result.rowLength === 0) {
      return res.status(404).send("User not found");
    }
    res.send("User updated");
  } catch (error) {
    console.error("Error update rol:", error);
    res.status(500).send("Error update rol");
  }
};
export const deleteRol = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.execute(
      "DELETE FROM roles WHERE user_id = ?",
      [id],
      { prepare: true }
    );
  } catch (error) {
    console.error("Error deltete rol");
  }
};
