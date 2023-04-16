import dotenv from 'dotenv';

dotenv.config();

// Access environment variables
const connectionDetails = {
    connectionType: process.env.CONNECTION_TYPE || 'postgres',
    user:  process.env.USER || 'postgres',
    host:  process.env.HOST || 'localhost',
    database:  process.env.DATABASE || 'postgres',
    password:  process.env.PASSWORD || 'postgres',
    port: process.env.PORT || 5432,
    connectionLimit:  process.env.CONNECTION_LIMIT || 10,
}

export default connectionDetails;