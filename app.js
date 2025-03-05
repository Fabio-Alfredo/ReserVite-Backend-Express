const express = require("express");
const cors = require("cors");
const errorHandler = require("./src/middlewares/errorHandler.middleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

module.exports = app;
