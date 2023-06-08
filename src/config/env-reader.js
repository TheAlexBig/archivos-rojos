import dotenv from 'dotenv';

dotenv.config();

// Access environment variables
const connectionDetails = {
    dbConnectionType: process.env.CONNECTION_TYPE || 'mysql',
    dbUser:  process.env.MYSQL_USER || 'postgres',
    dbHost:  process.env.MYSQL_HOST || 'localhost',
    database:  process.env.MYSQL_DATABASE || 'postgres',
    dbPassword:  process.env.MYSQL_PASSWORD || 'postgres',
    dbPort: process.env.MYSQL_DB_PORT || 5432,
    connectionLimit:  process.env.BACKEND_CONNECTION_LIMIT || 10,
    mailHost: process.env.MAIL_HOST || 'localhost',
    mailPort: process.env.MAIL_PORT || 587, // SMTP port
    mailSecure: false, // true for 465, false for other ports
    mailSource: process.env.MAIL_SOURCE || 'no-problem@smtp.com',
    mailAuth: {
        mailUser: process.env.MAIL_USER || 'user',
        mailPass: process.env.MAIL_PASSWORD || 'password'
    }
}

export default connectionDetails;