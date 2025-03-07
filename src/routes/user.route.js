const Route = require("express").Router;
const user_controller = require("../controller/user.controller");

const userRouter = Route();

userRouter.put("/assign-role", user_controller.assingRole);


module.exports = userRouter;