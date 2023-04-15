// Connector
import mysql from './mysql.js';

const createConnection = async () => {
    const result = mysql();
    try {
        await result.execute('SELECT 1');
        console.log('Connection successful');
    } catch (err) {
        console.error('Error connecting to database', err);
        result.end();
    } 
    return result;
}

const connection = await createConnection();
export { connection };