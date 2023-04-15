// Connector
import mysql from './mysql.js';

const createConnection = async () => {
    return mysql();
}

const connection = await createConnection();


export { connection };