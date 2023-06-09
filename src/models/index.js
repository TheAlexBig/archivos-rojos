import Sequelize from 'sequelize';
import connectionDetails from '../config/env-reader.js';
import redFileModel from './red-file.model.js';
import userModel from './user.model.js';

// Create a new Sequelize instance
const sequelize = new Sequelize(connectionDetails.database, connectionDetails.dbUser, connectionDetails.dbPassword, {
  host: connectionDetails.dbHost,
  port: connectionDetails.dbPort,
  dialect: connectionDetails.dbConnectionType,
});


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.redFile = redFileModel(sequelize, Sequelize);
db.user = userModel(sequelize, Sequelize);

export default db;