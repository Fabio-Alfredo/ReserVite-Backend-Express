const role_repository = require("../repositories/role.repository");
const ServiceError = require("../errors/service.error");
const ErrorCodes = require("../utils/errors/error.codes");
const Transactions = require("../repositories/transaction.repository");
const ERROR_CODES = require("../utils/errors/error.codes");

/**
 * Crea un nuevo rol
 *
 * @param {Object} role - Datos del rol
 * @returns {Promise<*>} - Rol creado
 * @throws {ServiceError} - Error al crear el rol
 */
const create = async (role) => {
  const t = await Transactions.starTransaction();
  try {
    const exists = await role_repository.findById(role.id);
    if (exists) {
      throw new ServiceError(
        "Role already exists",
        ErrorCodes.ROLE.ROLE_ALREADY_EXISTS
      );
    }

    const newRole = await role_repository.create(role, t);

    await Transactions.commitTransaction(t);
    return newRole;
  } catch (e) {
    await Transactions.rollbackTransaction(t);
    throw new ServiceError(
      e.message || "Error creating role",
      e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
    );
  }
};

/**
 * Busca un rol por su id
 *
 * @param {string} id - Id del rol
 * @returns {Promise<*>} - Rol encontrado
 * @throws {ServiceError} - Error al buscar el rol
 */
const findById = async (id) => {
  try {
    const role = await role_repository.findById(id);
    if (!role) {
      throw new ServiceError("Role not found", ErrorCodes.ROLE.ROLE_NOT_FOUND);
    }

    return role;
  } catch (e) {
    throw new ServiceError(
      e.message || "Error finding role",
      e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
    );
  }
};

/**
 * Elimina un rol por su id
 *
 * @param {string} id - Id del rol
 * @returns {Promise<*>} - confirmación de eliminación
 * @throws {ServiceError} - Error al eliminar el rol
 */
const deleteById = async (id) => {
  const t = await Transactions.starTransaction();
  try {
    const deleted = await role_repository.deleteById(id, t);
    if (!deleted) {
      throw new ServiceError("Role not found", ErrorCodes.ROLE.ROLE_NOT_FOUND);
    }

    await Transactions.commitTransaction(t);
    return true;
  } catch (e) {
    await Transactions.rollbackTransaction(t);
    throw new ServiceError(
      e.message || "Error deleting role",
      e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
    );
  }
};

/**
 * Busca todos los roles
 * 
 * @returns {Promise<*>} - Roles encontrados
 * @throws {ServiceError} - Error al buscar los roles
 */
const findAll = async () => {
  try {
    const roles = await role_repository.findAll() || [];
    return roles;
  } catch (e) {
    throw new ServiceError(
      e.message || "Error find all roles",
      e.code || ERROR_CODES.SERVER.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  create,
  findById,
  deleteById,
  findAll
};
