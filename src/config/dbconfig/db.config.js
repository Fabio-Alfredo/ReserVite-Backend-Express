const Sequelize = require("sequelize");
const config = require("../config").development;

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize({
    database: config.database,
    username: config.db_user,
    password: config.db_pass,
    dialect: config.db_dialect,

    // Configuración de conexión con socket (si aplica)
    dialectOptions: {
      socketPath: config.db_host, // ruta de socket
    },
  });
}

module.exports = sequelize;
