import mysql from 'mysql';
import connectionDetails from '../env-reader/index.js';

export default () => {
    return mysql.createConnection({
        host: connectionDetails.host,
        user: connectionDetails.user,
        password: connectionDetails.password,
        database: connectionDetails.database,
    });
}