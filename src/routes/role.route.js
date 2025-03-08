const Route = require("express").Router;
const role_controller = require("../controller/role.controller");
const validatorHandler = require("../middlewares/errorHandler.middleware");
const auth_middleware = require("../middlewares/auth.middleware");
const {
  createValidator,
  idValidator,
} = require("../validators/role.validator");

const roleRouter = Route();

/**
 * @route POST /role/create
 * @description Crea un nuevo rol
 * @access Privado (admin)
 * @middleware
 * - createValidator => valida los campos del body
 * - validatorHandler => maneja los errores de validacion
 * @controller
 * - role_controller.createRole => crea un nuevo rol
 */
roleRouter.post(
  "/create",
  auth_middleware.authValidator,
  auth_middleware.roleValidator(["admin"]),
  createValidator,
  validatorHandler,
  role_controller.createRole
);

/**
 * @route PUT /role/update
 * @description Actualiza un rol
 * @access Privado (admin)
 * @middleware
 * - createValidator => valida los campos del body
 * - validatorHandler => maneja los errores de validacion
 * @controller
 * - role_controller.updateRole => actualiza un rol
 */
roleRouter.delete(
  "/delete/:id",
  auth_middleware.authValidator,
  auth_middleware.roleValidator(["admin"]),
  idValidator,
  validatorHandler,
  role_controller.deleteRole
);

/**
 * @route GET /role/findId/:id
 * @description Busca un rol por su id
 * @access Privado (admin)
 * @middleware
 * - idValidator => valida el id
 * - validatorHandler => maneja los errores de validacion
 * @controller
 * - role_controller.findRoleById => busca un rol por su id
 */
roleRouter.get(
  "/findId/:id",
  auth_middleware.authValidator,
  auth_middleware.roleValidator(["admin"]),
  idValidator,
  validatorHandler,
  role_controller.findRoleById
);

roleRouter.get("/findAll", role_controller.findAllRoles);

module.exports = roleRouter;
