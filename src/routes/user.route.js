const Route = require("express").Router;
const user_controller = require("../controller/user.controller");
const validatorHandler = require("../middlewares/validator.middleware");
const auth_middleware = require("../middlewares/auth.middleware");
const {
  assingRoleValidator,
  findAllByRoleValidator,
  findByEmailValidator,
  findByIdValidator,
} = require("../validators/user.validator");

const userRouter = Route();

/**
 * @route PUT /user/assign-role
 * @description Asigna un rol a un usuario
 * @access Privado (ADMIN)
 * @middleware
 * - assingRoleValidator => valida los campos del body
 * - validatorHandler => maneja los errores de validacion
 * - auth_middleware.authValidator => valida el token
 * - auth_middleware.roleValidator => valida el rol
 * @controller
 * - user_controller.assingRole => asigna un rol a un usuario
 */
userRouter.put(
  "/assign-role",
  auth_middleware.authValidator,
  auth_middleware.roleValidator(["ADMIN"]),
  assingRoleValidator,
  validatorHandler,
  user_controller.assingRole
);

/**
 * @route GET /user/all-by-role
 * @description Busca todos los usuarios por roles
 * @access Privado (ADMIN)
 * @middleware
 * - findAllByRoleValidator => valida los campos del query
 * - validatorHandler => maneja los errores
 * - auth_middleware.authValidator => valida el token
 * - auth_middleware.roleValidator => valida el rol
 * @controller
 * - user_controller.findAllByRoles => busca todos los usuarios por roles
 */
userRouter.get(
  "/all-by-role/",
  auth_middleware.authValidator,
  auth_middleware.roleValidator(["ADMIN"]),
  findAllByRoleValidator,
  validatorHandler,
  user_controller.findAllByRoles
);
/**
 * @route GET /user/find-by-id/:id
 * @description Busca un usuario por su id
 * @access Privado (ADMIN)
 * @middleware
 * - findByIdValidator => valida los campos del param
 * - validatorHandler => maneja los
 * - auth_middleware.authValidator => valida el token
 * - auth_middleware.roleValidator => valida el rol
 * @controller
 * - user_controller.findById => busca un usuario por su id
 */
userRouter.get(
  "/find-by-id/:id",
  auth_middleware.authValidator,
  auth_middleware.roleValidator(["ADMIN"]),
  findByIdValidator,
  validatorHandler,
  user_controller.findById
);
/**
 * @route GET /user/find-by-email/:email
 * @description Busca un usuario por su email
 * @access Privado (ADMIN)
 * @middleware
 * - findByEmailValidator => valida los campos del param
 * - validatorHandler => maneja los errores
 * - auth_middleware.authValidator => valida el token
 * - auth_middleware.roleValidator => valida el rol
 * @controller
 * - user_controller.findByEmail => busca un usuario por su email
 */
userRouter.get(
  "/find-by-email/:email",
  auth_middleware.authValidator,
  auth_middleware.roleValidator(["ADMIN"]),
  findByEmailValidator,
  validatorHandler,
  user_controller.findByEmail
);

module.exports = userRouter;
