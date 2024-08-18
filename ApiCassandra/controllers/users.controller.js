import { client } from "../libs/cassandra.js";

export const getUsers = async (req, res) => {
  try {
    const result = await client.execute("SELECT * FROM users;");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Error fetching users");
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.execute(
      "SELECT * FROM users WHERE user_id = ?",
      [id],
      { prepare: true }
    );
    if (result.rowLength === 0) {
      return res.status(404).send("User not found");
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Error fetching user");
  }
};

export const putUser = async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
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
    console.error("Error updating user:", error);
    res.status(500).send("Error updating user");
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await client.execute(
      "DELETE FROM users WHERE user_id = ?",
      [id],
      { prepare: true }
    );
    if (result.rowLength === 0) {
      return res.status(404).send("User not found");
    }
    res.send("User deleted");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Error deleting user");
  }
};

export const postUser = async (req, res) => {
  const { user_id, username, password } = req.body;

  try {

     const result = await client.execute(
      "SELECT user_id FROM users WHERE user_id = ?",
      [user_id],
      { prepare: true }
    );

    if (result.rowLength > 0) {
      return res.status(400).send("Error: El user_id ya existe.");
    }

    await client.execute(
      "INSERT INTO users (user_id, username, password) VALUES (?, ?, ?)",
      [user_id, username, password],
      { prepare: true }
    );
    res.status(201).send("User created");
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).send("Error inserting user");
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  try {
    const query = 'SELECT * FROM users WHERE username = ?';
    const result = await client.execute(query, [username], { prepare: true });

    if (result.rowLength === 0) {
      return res.status(401).send('Invalid username');
    }
    const queryContra = 'SELECT * FROM users WHERE password = ?';
    const resultCont = await client.execute(queryContra, [password], { prepare: true });

    if (resultCont.rowLength === 0) {
      return res.status(401).send('Invalid password');
    }

    console.log(resultCont,result)

    if (resultCont.rowLength!=0 &&  result.rowLength!=0) {
      res.json({ success: true });
    } else {
      res.status(401).send('Invalid username or password');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Error logging in');
  }
}
