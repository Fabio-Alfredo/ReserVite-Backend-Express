const config = require('./src/config/config');
const app = require('./app');
const dbConnection = require('./src/config/dbconfig/dbConnection.config');

//Conexión a la base de datos
dbConnection();

app.listen(config.port, () => {
  console.log('Server running on port ' + config.port);
});
