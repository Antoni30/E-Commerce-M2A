import oracledb from "oracledb"

export const dbConfigMaster = {
    user: 'admin',
    password: 'adminadmin123', 
    connectString: 'localhost:1523/XE'
  };

export const dbConfigEsclavo = {
    user: 'esclavo',
    password: 'adminadmin123', 
    connectString: 'localhost:1521/ORCL'
  };

export async function checkConnection() {
    let connection;
  
    try {
      connection = await oracledb.getConnection(dbConfigMaster);
      console.log('Conexión exitosa a la base de datos Oracle Maestra');
      return true;
    } catch (err) {
      console.error('Error al conectar con la base de datos Maestra');
      return false;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error('Error al cerrar la conexión:', err);
        }
      }
    }
  }

  export async function checkConnectionEsclavo() {
    let connection;
  
    try {
      connection = await oracledb.getConnection(dbConfigEsclavo);
      console.log('Conexión exitosa a la base de datos Oracle Esclavo');
      return true;
    } catch (err) {
      console.error('Error al conectar con la base de datos:', err);
      return false;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error('Error al cerrar la conexión:', err);
        }
      }
    }
  }


  export async function getConnectionMaster() {
    try {
      const connection = await oracledb.getConnection(dbConfigMaster);
      console.log('Conexión exitosa a la base de datos Oracle Maestra');
      return connection;
    } catch (err) {
      console.error('Error al conectar con la base de datos Maestra:', err);
      throw err; // Lanza el error para manejarlo donde se llame a la función
    }
  }
  
  // Función para obtener la conexión a la base de datos esclava
  export async function getConnectionEsclavo() {
    try {
      const connection = await oracledb.getConnection(dbConfigEsclavo);
      console.log('Conexión exitosa a la base de datos Oracle Esclavo');
      return connection;
    } catch (err) {
      console.error('Error al conectar con la base de datos Esclava:', err);
      throw err; // Lanza el error para manejarlo donde se llame a la función
    }
  }