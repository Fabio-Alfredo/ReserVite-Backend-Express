const role_service = require("../services/role.service");
const createHttpError = require("http-errors");
const responseHandler = require("../helpers/responsehandler.helper");
const {ErrorCodes}= require("../utils/errors");
const roleDTO = require("../domain/dtos/role.dto");

/**
 * Controlador para crear un nuevo rol
 *
 * @param {Object} req - Datos de la solicitud
 * @param {Object} res - Respuesta de la solicitud
 * @param {Function} next - Pasa el control al siguiente manejador de solicitudes
 * @returns {Object} - Role creado
 */
const createRole = async (req, res, next) => {
  try {
    const data = req.body;
    const role = await role_service.create(data);

    responseHandler(res, 201, "Role create succes", roleDTO(role));
  } catch (e) {
    switch (e.code) {
      case ErrorCodes.ROLE.ROLE_ALREADY_EXISTS:
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
 * Controlador para buscar un role por id
 *
 * @param {object} req - id del role a buscar
 * @param {object} res - respuesta de la solicitud
 * @param {Function} next - Pasa el control al siguiente manejador de solicitudes
 * @returns {object} - Role encontrado
 */
const findRoleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const role = await role_service.findById(id);

    responseHandler(res, 200, "succes", roleDTO(role));
  } catch (e) {
    switch (e.code) {
      case ErrorCodes.ROLE.ROLE_NOT_FOUND:
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
 * Controlador para eliminar un role
 *
 * @param {object} req - id del role a eliminar
 * @param {object} res - respuesta de la solicitud
 * @param {Function} next - Pasa el control al siguiente manejador de solicitudes
 * @returns {object} respuesta de exito
 */
const deleteRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    await role_service.deleteById(id);

    responseHandler(res, 200, "Success elimination");
  } catch (e) {
    switch (e.code) {
      case ErrorCodes.ROLE.ROLE_NOT_FOUND:
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
 * Controlador para buscar todos los roles
 *
 * @param {object} req
 * @param {object} res - respuesta de la solicitud
 * @param {Function} next - Pasa el control al siguiente manejador de solicitudes
 * @returns {object} - Roles encontrado
 */
const findAllRoles = async (req, res, next) => {
  try {
    const roles = await role_service.findAll();

    responseHandler(
      res,
      200,
      "Succes",
      roles.map((role) => roleDTO(role))
    );
  } catch (e) {
    switch (e.code) {
      case ErrorCodes.SERVER.INTERNAL_SERVER_ERROR:
        next(createHttpError(500, e.message));
        break;
      default:
        next(e);
    }
  }
};

module.exports = {
  createRole,
  findRoleById,
  deleteRole,
  findAllRoles,
};
