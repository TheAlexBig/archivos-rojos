import Sequelize from 'sequelize';
import connectionDetails from '../config/env-reader.js';
import redFileModel from './red-file.model.js';

// Create a new Sequelize instance
const sequelize = new Sequelize(connectionDetails.database, connectionDetails.user, connectionDetails.password, {
  host: connectionDetails.host,
  dialect: connectionDetails.connectionType,
});


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.redFile = redFileModel(sequelize, Sequelize);

export default db;