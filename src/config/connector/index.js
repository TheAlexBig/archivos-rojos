// Connector
import logger from '../logger.js';
import mysql from './mysql.js';

const createConnection = async () => {
    
    try {
        logger.info('Migration manager connecting to database...');
        const result = mysql();
        logger.info('Migration manager connected to database');
        await result.execute('SELECT 1');
        logger.info('Migration manager connection successful');
    } catch (err) {
        logger.error('Migration manager error connecting to database', err);
        result.end();
    } 
    return result;
}

async function  connection() {
    return await createConnection();
}
export { connection };