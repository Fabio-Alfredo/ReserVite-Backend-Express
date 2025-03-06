const Route = require("express").Router;
const authRouter = require("./auth.route");
const roleRouter = require("./role.route");

const routes = Route();

routes.use("/auth", authRouter);
routes.use("/role", roleRouter);

module.exports = routes;
