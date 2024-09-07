import { client } from "../libs/cassandra.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = "proyectoBasesAV";

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

export const getUserByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const result = await client.execute(
      "SELECT * FROM users WHERE username = ?",
      [username],
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

    // Encriptar la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    await client.execute(
      "INSERT INTO users (user_id, username, password) VALUES (?, ?, ?)",
      [user_id, username, hashedPassword],
      { prepare: true }
    );

    const token = jwt.sign(
      { user_id: user.user_id, username: user.username },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.cookie("token", token);
    res.json({ success: true ,username:username});
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).send("Error inserting user");
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  try {
    const query = "SELECT * FROM users WHERE username = ?";
    const result = await client.execute(query, [username], { prepare: true });

    if (result.rowLength === 0) {
      return res.status(401).send("Invalid username");
    }

    const user = result.rows[0];

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).send("Invalid password");
    }

    const token = jwt.sign(
      { user_id: user.user_id, username: user.username },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.cookie("token", token);
    res.json({ success: true ,username:username});
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Error logging in");
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logout" });
};

export const auth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return res.status(401).json({ message: "No Token,authorization" });
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });
    req.user=decoded
    next();
  });
};


export const verifyToken = async (req, res) => {
  // Obtener el token del encabezado Authorization
  const {token } = req.cookies;

  if (!token) return req.status(401).json({ message: "Unauthorized No TOKEN" });

  jwt.verify(token, SECRET_KEY, async (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized NO JWT" });
    try {
      const result = await client.execute(
        "SELECT * FROM users WHERE username = ?",
        [decoded.username],
        { prepare: true }
      );
      if (result.rowLength === 0) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      return res.json({
        username: result.rows[0]['username'],
      });

    } catch (error) {
      console.error("Error verifying token:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
};