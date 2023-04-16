// Connector
import logger from '../logger.js';
import mysql from './mysql.js';

const createConnection = async () => {
    const result = mysql();
    try {
        await result.execute('SELECT 1');
        logger.info('Migration manager connection successful');
    } catch (err) {
        logger.error('Migration manager error connecting to database', err);
        result.end();
    } 
    return result;
}

const connection = await createConnection();
export { connection };