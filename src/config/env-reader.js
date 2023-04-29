import dotenv from 'dotenv';

dotenv.config();

// Access environment variables
const connectionDetails = {
    connectionType: process.env.CONNECTION_TYPE || 'mysql',
    user:  process.env.MYSQL_USER || 'postgres',
    host:  process.env.MYSQL_HOST || 'localhost',
    database:  process.env.MYSQL_DATABASE || 'postgres',
    password:  process.env.MYSQL_PASSWORD || 'postgres',
    port: process.env.MYSQL_DB_PORT || 5432,
    connectionLimit:  process.env.BACKEND_CONNECTION_LIMIT || 10,
}

export default connectionDetails;