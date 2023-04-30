// Connector
import logger from '../logger.js';
import mysql from './mysql.js';

const fetchMysqlConnection = function() {
    return mysql();
}

const createConnection = async () => {
    logger.info('Migration manager connecting to database...');
    const result = mysql();
    logger.info('Connection to database established');
    try {
        await result.execute('SELECT 1');
        logger.info('Migration manager connection successful');
    } catch (err) {
        logger.error('Migration manager error connecting to database', err);
        result.end();
    } 
    return result;
}

const connection = {
    use: fetchMysqlConnection
};

export default connection;