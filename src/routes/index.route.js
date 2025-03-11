const Route = require("express").Router;
const authRouter = require("./auth.route");
const roleRouter = require("./role.route");
const userRouter = require("./user.route");
const eventRouter = require("./event.route");
const reservationRouter = require("./reservation.route");

const routes = Route();

routes.use("/auth", authRouter);
routes.use("/role", roleRouter);
routes.use("/user", userRouter);
routes.use("/event", eventRouter);
routes.use("/reservation", reservationRouter);

module.exports = routes;
