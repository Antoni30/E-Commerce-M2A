import { Client } from "cassandra-driver";

export const client = new Client({
    contactPoints: ['localhost:9042','localhost:9043','localhost:9044'],
    localDataCenter:'datacenter1',
    keyspace:'login'
})

export const checkConnection = async () => {
    try {
      await client.execute('SELECT now() FROM system.local');
      return true; // Conexión exitosa
    } catch (error) {
      console.error('Error connecting to Cassandra:', error);
      return false; // Error en la conexión
    }
  };
