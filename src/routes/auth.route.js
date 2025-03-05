const Route = require("express").Router;
const authController = require("../controller/auth.controller");

const authRouter = Route();

authRouter.post("/register", authController.registerUser);
authRouter.post("/login", authController.loginUser);

module.exports = authRouter;

