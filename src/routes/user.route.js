const Route = require("express").Router;
const user_controller = require("../controller/user.controller");
const validatorHandler = require("../middlewares/validator.middleware");
const { assingRole } = require("../validators/user.validator");

const userRouter = Route();

userRouter.put(
  "/assign-role",
  assingRole,
  validatorHandler,
  user_controller.assingRole
);

module.exports = userRouter;
