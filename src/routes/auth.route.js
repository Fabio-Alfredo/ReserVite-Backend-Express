const Route = require("express").Router;
const authController = require("../controller/auth.controller");
const validatorHandler = require("../middlewares/validator.middleware");
const {
  registerValidator,
  loginValidator,
  recoverPasswordValidator,
  resetPasswordValidator,
} = require("../validators/auth.validator");

const authRouter = Route();

/**
 * @route POST /auth/register
 * @description Registar un nuevo usuario
 * @access Publico
 * @middleware
 * - registerValidator => valida los campos del body
 * - validatorHandler => maneja los errores de validacion
 * @cotroller a
 * - uthController.registerUser => registra un nuevo usuario
 */
authRouter.post(
  "/register",
  registerValidator,
  validatorHandler,
  authController.registerUser
);

/**
 * @route POST /auth/login
 * @description Autentica un usuario
 * @access Publico
 * @middleware
 * - loginValidator => valida los campos del body
 * - validatorHandler => maneja los errores de validacion
 * @cotroller
 * - authController.loginUser => autentica un usuario
 */
authRouter.post(
  "/login",
  loginValidator,
  validatorHandler,
  authController.loginUser
);

/**
 * @route GET /auth/recovery-password
 * @description Recuperar contraseña
 * @access Publico
 * @middleware
 * - recoverPasswordValidator => valida los campos del body
 * - validatorHandler => maneja los errores de validacion
 * @cotroller
 * - authController.recoveryPassword => envia un correo para recuperar la contraseña
 */
authRouter.get(
  "/recovery-password",
  recoverPasswordValidator,
  validatorHandler,
  authController.recoveryPassword
);

/**
 * @route PUT /auth/reset-password
 * @description Restablecer contraseña
 * @access Publico
 * @middleware
 * - resetPasswordValidator => valida los campos del body
 * - validatorHandler => maneja los errores de validacion
 * @cotroller
 * - authController.resetPassword => restablece la contraseña de un usuario
 */
authRouter.put(
  "/reset-password",
  resetPasswordValidator,
  validatorHandler,
  authController.resetPassword
);

module.exports = authRouter;
