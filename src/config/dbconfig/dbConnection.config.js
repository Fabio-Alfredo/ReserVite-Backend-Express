const db = require('../../domain/models/index');
const config = require('../config');

/**
 * Conexión con la base de datos
 * @module src/config/dbconfig/dbConnection.config
 */
const dbConnection = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');

    if (config.node_env === 'development') {
      await db.sequelize.sync({ force: false });
      console.log('All models were synchronized successfully.');
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};


module.exports = dbConnection;