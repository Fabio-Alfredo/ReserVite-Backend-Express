const config = require('./src/config/config');
const app = require('./app');
const dbConnection = require('./src/config/dbconfig/dbConnection.config');

dbConnection();

app.listen(config.port, () => {
  console.log('Server running on port ' + config.port);
});
