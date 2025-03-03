const config = require("./src/config/config").development;
const app = require("./app");

app.listen(config.port, () => {
  console.log("Server running on port " + config.port);
});
