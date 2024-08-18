import { client } from "../libs/cassandra.js";

export const getUserRoles = async (req,res)=>{
    try{
        const result = await client.execute("SELECT * FROM user_roles;");
        res.json(result.rows);
    }catch(error){
        console.error("Error fetching user_roles:", error);
        res.status(500).send("Error fetching  user_roles");
    }
}

export const getUserRolesNames = async (req,res)=>{
    const {id}= req.params
    try{
        const result = await client.execute(
            "SELECT role_name FROM roles WHERE role_id= ?;",
            [id],
            { prepare: true }
          );
          if (result.rowLength === 0) {
            return res.status(404).send("Rol not found");
          }
          res.json(result.rows[0]);
    }catch(error){
        console.error("Error fetching user_roles:", error);
        res.status(500).send("Error fetching  user_roles");
    }
}

export const getUserRole = async (req,res)=>{
    const {id}= req.params
    try{
        const result = await client.execute(
            "SELECT * FROM user_roles WHERE user_id= ?;",
            [id],
            { prepare: true }
          );
          if (result.rowLength === 0) {
            return res.status(404).send("User not found");
          }
          res.json(result.rows[0]);
    }catch(error){
        console.error("Error fetching user_roles:", error);
        res.status(500).send("Error fetching  user_roles");
    }
}

export const putUserRole = async (req,res)=>{
    const {id}= req.params
    const {id_rol} = req.body
    try{
        const result = await client.execute(
            "UPDATE user_roles SET role_id = ? WHERE user_id = ?",
            [id_rol,id],
            { prepare: true }
          );
          if (result.rowLength === 0) {
            return res.status(404).send("User_roles not found");
          }
          res.json(result.rows[0]);
    }catch(error){
        console.error("Error fetching user_roles:", error);
        res.status(500).send("Error fetching  user_roles");
    }
}

export const deleteUserRoles = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await client.execute(
        "DELETE FROM  user_roles WHERE user_id = ?",
        [id],
        { prepare: true }
      );
      if (result.rowLength === 0) {
        return res.status(404).send("User_roles not found");
      }
      res.send("User deleted");
    } catch (error) {
      console.error("Error deleting user_roles:", error);
      res.status(500).send("Error deleting user_roles");
    }
}

export const postUserRoles = async (req,res)=>{

    const {user_id,role_id}= req.body
    res.status(201).send("Assigned Role");
    try{
        const result = await client.execute("INSERT INTO user_roles(user_id,role_id)VALUES(?,?)",[user_id,role_id],{ prepare: true });
    }catch(error){
        console.error("Error Assigned Role user_roles:", error);
        res.status(500).send("Error Assigned Role  user_roles");
    }
}
