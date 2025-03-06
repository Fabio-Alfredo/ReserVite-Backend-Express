const Route = require("express").Router;
const role_controller = require("../controller/role.controller");
const validatorHandler = require("../middlewares/errorHandler.middleware");
const {
  createValidator,
  idValidator,
} = require("../validators/role.validator");

const roleRouter = Route();

roleRouter.post(
  "/create",
  createValidator,
  validatorHandler,
  role_controller.createRole
);

roleRouter.delete(
  "/delete/:id",
  idValidator,
  validatorHandler,
  role_controller.deleteRole
);

roleRouter.get(
  "/findId/:id",
  idValidator,
  validatorHandler,
  role_controller.findRoleById
);

roleRouter.get("/findAll", role_controller.findAllRoles);

module.exports = roleRouter;
