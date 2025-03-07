const Route = require("express").Router;
const user_controller = require("../controller/user.controller");
const validatorHandler = require("../middlewares/validator.middleware");
const { assingRole } = require("../validators/user.validator");

const userRouter = Route();

/**
 * @route PUT /user/assign-role
 * @description Asigna un rol a un usuario
 * @access Privado (admin)
 * @middleware
 * - assingRole => valida los campos del body
 * - validatorHandler => maneja los errores de validacion
 * @controller
 * - user_controller.assingRole => asigna un rol a un usuario
 */
userRouter.put(
  "/assign-role",
  assingRole,
  validatorHandler,
  user_controller.assingRole
);

module.exports = userRouter;
