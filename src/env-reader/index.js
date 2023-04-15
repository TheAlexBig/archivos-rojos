import dotenv from 'dotenv';

dotenv.config();

// Access environment variables
const connectionType = process.env.CONNECTION_TYPE || 'postgres';
const user = process.env.USER || 'postgres';
const host = process.env.HOST || 'localhost';
const database = process.env.DATABASE || 'postgres';
const password = process.env.PASSWORD || 'postgres';
const port = process.env.PORT || 5432;

const connectionDetails = {
    connectionType,
    user,
    host,
    database,
    password,
    port
}

export default connectionDetails;