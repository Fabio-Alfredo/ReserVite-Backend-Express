const createHttpError = require('http-errors');
const ErrorCodes = require('../utils/errors/error.codes');
const authService = require('../services/auth.service');
const responseHandler = require('../helpers/responsehandler.helper');

/**
 * Registra un nuevo usuario
 *
 * @param {Object} req - Datos de la solicitud
 * @param {Object} res - Respuesta de la solicitud
 * @param {Function} next - Pasa el control al siguiente manejador de solicitudes
 * @returns {Object} - Usuario registrado
 */
const registerUser = async (req, res, next) => {
  try {
    const user = req.body;
    const newUser = await authService.register(user);

    responseHandler(res, 201, 'User created successfully', newUser);
  } catch (e) {
    switch (e.code) {
      case ErrorCodes.USER.EMAIL_ALREADY_EXISTS:
        next(createHttpError(409, e.message));
        break;
      case ErrorCodes.SERVER.INTERNAL_SERVER_ERROR:
        next(createHttpError(500, e.message));
        break;
      default:
        next(e);
    }
  }
};

/**
 * Autentica un usuario
 *
 * @param {Object} req - Datos de la solicitud
 * @param {Object} res - Respuesta de la solicitud
 * @param {Function} next - Pasa el control al siguiente manejador de solicitudes
 * @returns {Object} - Token de sesión
 */
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await authService.authUser(email, password);

    responseHandler(res, 200, 'User logged in successfully', token);
  } catch (e) {
    switch (e.code) {
      case ErrorCodes.USER.INVALID_CREDENTIALS:
        next(createHttpError(400, e.message));
        break;
      case ErrorCodes.SERVER.INTERNAL_SERVER_ERROR:
        next(createHttpError(500, e.message));
        break;
      default:
        next(e);
    }
  }
};

module.exports = {
  registerUser,
  loginUser,
};
