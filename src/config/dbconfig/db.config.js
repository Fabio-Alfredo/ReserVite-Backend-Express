const Sequelize = require('sequelize');
const config = require('../config');

let sequelize;

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
