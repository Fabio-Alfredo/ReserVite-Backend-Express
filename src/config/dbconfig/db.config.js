const Sequelize = require('sequelize');
const config = require('../config');

let sequelize;

// Configuración de conexión con base de datos
/**
 * Configuración de conexión con base de datos
 * @param {Object} config - Configuración de conexión con base de datos
 * @param {String} config.db.database - Nombre de la base de datos
 * @param {String} config.db.username - Usuario de la base de datos
 * @param {String} config.db.password - Contraseña de la base de datos
 * @param {String} config.db.dialect - Dialecto de la base de datos
 * @param {String} config.db.host - Host de la base de datos (ruta de socket)
 * @param {String} config.use_env_variable - Variable de entorno de la base de datos 
 */
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize({
    database: config.db.database,
    username: config.db.username,
    password: config.db.password,
    dialect: config.db.dialect,

    // Configuración de conexión con socket (si aplica)
    dialectOptions: {
      socketPath: config.db.host, // ruta de socket
    },
  });
}

module.exports = sequelize;
