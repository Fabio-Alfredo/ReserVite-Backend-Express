const Route = require('express').Router;
const authController = require('../controller/auth.controller');
const validatorHandler = require('../middlewares/validator.middleware');
const {
  registerValidator,
  loginValidator,
} = require('../validators/auth.validator');

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
  '/register',
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
  '/login',
  loginValidator,
  validatorHandler,
  authController.loginUser
);

module.exports = authRouter;
