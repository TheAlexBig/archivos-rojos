import mysql from 'mysql2/promise';
import connectionDetails from '../env-reader.js';

export default () => {
    return mysql.createPool({
        host: connectionDetails.dbHost,
        user: connectionDetails.dbUser,
        password: connectionDetails.dbPassword,
        database: connectionDetails.database,
        connectionLimit: connectionDetails.connectionLimit,
        namedPlaceholders: true,
    });
}