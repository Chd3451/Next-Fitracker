import mysql from 'mysql2';

interface ConnectionConfig {
  host: string;
  user: string;
  password: string;
  database: string;
}

const connectionConfig: ConnectionConfig = {
  host: 'localhost',
  user: 'root',
  password: 'a123',
  database: 'dbfittracker',
};

const connection = mysql.createConnection(connectionConfig);

export default connection;