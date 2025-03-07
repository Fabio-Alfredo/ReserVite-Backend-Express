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

/**
 * @route GET /user/all-by-role
 * @description Busca todos los usuarios por roles
 * @access Privado (admin)
 * @controller
 * - user_controller.findAllByRoles => busca todos los usuarios por roles
 */
userRouter.get("/all-by-role/", user_controller.findAllByRoles);
/**
 * @route GET /user/find-by-id/:id
 * @description Busca un usuario por su id
 * @access Privado (admin)
 * @controller
 * - user_controller.findById => busca un usuario por su id
 */
userRouter.get("/find-by-id/:id", user_controller.findById);
/**
 * @route GET /user/find-by-email/:email
 * @description Busca un usuario por su email
 * @access Privado (admin)
 * @controller
 * - user_controller.findByEmail => busca un usuario por su email
 */
userRouter.get("/find-by-email/:email", user_controller.findByEmail);

module.exports = userRouter;
