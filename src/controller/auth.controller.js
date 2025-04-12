const createHttpError = require("http-errors");
const { ErrorCodes } = require("../utils/errors");
const { auth_service } = require("../services");
const responseHandler = require("../helpers/responsehandler.helper");

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
    const file = req.files;
    await auth_service.register(user, file);
    responseHandler(res, 201, "User created successfully");
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
    const token = await auth_service.authUser(email, password);

    responseHandler(res, 200, "User logged in successfully", token);
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

/**
 * Recupera la contraseña de un usuario
 *
 * @param {Object} req - Datos de la solicitud
 * @param {Object} res - Respuesta de la solicitud
 * @param {Function} next - Pasa el control al siguiente manejador de solicitudes
 * @returns {Object} - Token de recuperación
 */
const recoveryPassword = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const token = await auth_service.recoverPassword(email, name);

    responseHandler(res, 200, "Recovery token sent successfully", token);
  } catch (e) {
    switch (e.code) {
      case ErrorCodes.USER.NOT_FOUND:
        next(createHttpError(404, e.message));
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
 * Resetea la contraseña de un usuario
 *
 * @param {Object} req - Datos de la solicitud
 * @param {Object} res - Respuesta de la solicitud
 * @param {Function} next - Pasa el control al siguiente manejador de solicitudes
 * @returns {Object} - Contraseña reseteada
 */
const resetPassword = async (req, res, next) => {
  try {
    const { password, token } = req.body;
    const data = await auth_service.resetPassword(token, password);

    responseHandler(res, 200, "Password reset successfully", data);
  } catch (e) {
    switch (e.code) {
      case ErrorCodes.USER.NOT_FOUND:
        next(createHttpError(404, e.message));
        break;
      case ErrorCodes.SERVER.INTERNAL_SERVER_ERROR:
        next(createHttpError(500, e.message));
        break;
      case ErrorCodes.USER.INVALID_TOKEN:
        next(createHttpError(400, e.message));
        break;
      default:
        next(e);
    }
  }
};

module.exports = {
  registerUser,
  loginUser,
  recoveryPassword,
  resetPassword,
};
