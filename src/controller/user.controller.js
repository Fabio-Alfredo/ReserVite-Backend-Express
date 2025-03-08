const { user_service } = require("../services");
const responseHandler = require("../helpers/responsehandler.helper");
const createHttpError = require("http-errors");
const { ErrorCodes } = require("../utils/errors");
const userDTO = require("../domain/dtos/user.dto");

/**
 * Asigna un rol a un usuario
 *
 * @param {Object} req - Datos de la solicitud
 * @param {Object} res - Respuesta de la solicitud
 * @param {Function} next - Pasa el control al siguiente manejador de solicitudes
 * @returns {Object} - Usuario actualizado
 */
const assingRole = async (req, res, next) => {
  try {
    const { userId, roleId, operation } = req.body;
    const admin = req.user;
    const user = await user_service.updatingRoles(userId, roleId, operation, admin);
    responseHandler(res, 200, "Role assigned successfully", userDTO(user));
  } catch (e) {
    switch (e.code) {
      case ErrorCodes.ROLE.ROLE_NOT_FOUND:
        next(createHttpError(404, e.message));
        break;
      case ErrorCodes.USER.NOT_FOUND:
        next(createHttpError(404, e.message));
        break;
      case ErrorCodes.SERVER.INTERNAL_SERVER_ERROR:
        next(createHttpError(500, e.message));
        break;
      case ErrorCodes.OPERATION.NOT_VALID:
        next(createHttpError(400, e.message));
        break;
      default:
        next(e);
    }
  }
};

/**
 * Busca todos los usuarios por roles
 *
 * @param {Object} req - Datos de la solicitud
 * @param {Object} res - Respuesta de la solicitud
 * @param {Function} next - Pasa el control al siguiente manejador de solicitudes
 * @returns {Object} - Usuarios encontrados
 */
const findAllByRoles = async (req, res, next) => {
  try {

    const { roleId } = req.query ;
    const users = await user_service.findAllByRole(roleId);
    responseHandler(res, 200, "Users found", users.map(userDTO));
  } catch (e) {
    switch (e.code) {
      case ErrorCodes.ROLE.ROLE_NOT_FOUND:
        next(createHttpError(404, e.message));
        break;
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
 * Busca un usuario por su id
 *
 * @param {Object} req - Datos de la solicitud
 * @param {Object} res - Respuesta de la solicitud
 * @param {Function} next - Pasa el control al siguiente manejador de solicitudes
 * @returns {Object} - Usuario encontrado
 */
const findById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await user_service.findById(id);
    responseHandler(res, 200, "User found", userDTO(user));
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
 * Busca un usuario por su email
 *
 * @param {Object} req - Datos de la solicitud
 * @param {Object} res - Respuesta de la solicitud
 * @param {Function} next - Pasa el control al siguiente manejador de solicitudes
 * @returns {Object} - Usuario encontrado
 */
const findByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await user_service.findByEmail(email);
    responseHandler(res, 200, "User found", userDTO(user));
  } catch (e) {
    switch (e.code) {
      case ErrorCodes.USER.NOT_FOUND:
        next(createHttpError(404, e.message));
        break;
      case ErrorCodes.SERVER.INTERNAL_SERVER_ERROR:
        next(createHttpError(500, e.message));
        break;
      default:
        next;
    }
  }
};

module.exports = {
  assingRole,
  findAllByRoles,
  findById,
  findByEmail,
};
