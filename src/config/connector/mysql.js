import mysql from 'mysql2/promise';
import connectionDetails from '../env-reader.js';

export default () => {
    return mysql.createPool({
        host: connectionDetails.host,
        user: connectionDetails.user,
        password: connectionDetails.password,
        database: connectionDetails.database,
        connectionLimit: connectionDetails.connectionLimit,
        namedPlaceholders: true,
    });
}