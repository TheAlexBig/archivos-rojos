import logger, {stream} from './config/logger.js'
import express from 'express';
import morgan from 'morgan';

const app = express();
// Use morgan with the custom stream
app.use(morgan('combined', { stream }));

import { upgradeDatabase } from './config/changelog/index.js';
import redFileRoutes from './routes/red-file.routes.js';
import cors  from 'cors';
import db from './models/index.js';

const FRONT_PORT = process.env.FRONTEND_PORT || 80;
const FRONTEND_HOST = process.env.FRONTEND_HOST || localhost;

app.use(cors({
  origin: `http://${FRONTEND_HOST}:${FRONT_PORT}` 
}));

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());

import connection  from './config/connector/index.js';

connection.use()
.then((pool) => {
    upgradeDatabase(pool);
}).catch((err) => {
    logger.error('Migrations: Unable to connect to the database:', err);
})

const preffix = '/api';
app.use(preffix, redFileRoutes);

db.sequelize
  .authenticate()
  .then(() => {
    logger.info('Sequelize: Connection has been established successfully.');
  })
  .catch((err) => {
    logger.error('Sequelize: Unable to connect to the database:', err);
  });

// set port, listen for requests
const PORT = process.env.BACKEND_PORT || 8080;
app.listen(PORT, () => {
    logger.info(`Server is running on port.`, { port:  PORT});
});
