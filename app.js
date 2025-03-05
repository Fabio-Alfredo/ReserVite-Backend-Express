const express = require('express');
const cors = require('cors');
const errorHandler = require('./src/middlewares/errorHandler.middleware');
const Routes = require('./src/routes/index.route');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(Routes);
app.use(errorHandler);

module.exports = app;
