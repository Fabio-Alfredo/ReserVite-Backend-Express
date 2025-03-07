const Route = require("express").Router;
const authRouter = require("./auth.route");
const roleRouter = require("./role.route");
const userRouter = require("./user.route");

const routes = Route();

routes.use("/auth", authRouter);
routes.use("/role", roleRouter);
routes.use("/user", userRouter);

module.exports = routes;
