import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import logger, { stream } from './config/logger.js';
import { upgradeDatabase } from './config/changelog';
import db from './models/index.js';
import connection from './config/connector/index.js';
import redFileRoutes from './routes/red-file.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();

// Use morgan with the custom stream
app.use(morgan('combined', { stream }));

const FRONT_PORT = process.env.FRONTEND_PORT || 80;
const FRONTEND_HOST = process.env.FRONTEND_HOST || 'localhost';
const DEV_PORT = process.env.DEV_PORT || '3000';

const corsOptions = {
    origin: `http://${FRONTEND_HOST}:${FRONT_PORT}`
};

if (process.env.PROFILE === 'dev') {
    corsOptions.origin = [
        `http://${FRONTEND_HOST}:${FRONT_PORT}`,
        `http://localhost:${DEV_PORT}`,
    ];
}

app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(express.json());

// Connect to the database and perform migrations
connection.use()
    .then(async (pool) => {
        await upgradeDatabase(pool);
    })
    .catch((err) => {
        logger.error('Migrations: Unable to connect to the database:', err);
    });

// Define routes
const prefix = '/api';
app.use(prefix+'/red-file', redFileRoutes);
app.use(prefix, userRoutes);

// Authenticate Sequelize connection
db.sequelize
    .authenticate()
    .then(() => {
        logger.info('Sequelize: Connection has been established successfully.');
    })
    .catch((err) => {
        logger.error('Sequelize: Unable to connect to the database:', err);
    });

// Set port, listen for requests
const PORT = process.env.BACKEND_PORT || 8080;
app.listen(PORT, () => {
    logger.info(`Server is running on port.`, { port: PORT });
});