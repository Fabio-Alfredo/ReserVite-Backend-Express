const Route = require("express").Router;
const authController = require("../controller/auth.controller");
const validatorHandler = require("../middlewares/validator.middleware");
const {
  registerValidator,
  loginValidator,
} = require("../validators/auth.validator");

const authRouter = Route();

authRouter.post(
  "/register",
  registerValidator,
  validatorHandler,
  authController.registerUser
);
authRouter.post(
  "/login",
  loginValidator,
  validatorHandler,
  authController.loginUser
);

module.exports = authRouter;
