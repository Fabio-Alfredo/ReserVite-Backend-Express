const user_repository = require("../repositories/user.repository");
const role_service = require("../services/role.service");
const ErrorCodes = require("../utils/errors/error.codes");
const ServiceError = require("../utils/errors/service.error");
const Transactions = require("../repositories/transaction.repository");
const {
  ASSING_ROLE,
  DELETE_ROLE,
} = require("../utils/constants/operationRoles.util");

/**
 * Actualiza los roles de un usuario
 *
 * @param {string} userId - Id del usuario
 * @param {string} roleId - Id del rol
 * @param {string} operation - Operación a realizar
 * @returns {Promise<*>} - Usuario actualizado
 * @throws {ServiceError} - Error al asignar el rol
 */
const updatingRoles = async (userId, roleId, operation) => {
  const t = await Transactions.starTransaction();
  try {
    const user = await user_repository.findById(userId);
    if (!user) {
      throw new ServiceError("User not exist", ErrorCodes.USER.NOT_FOUND);
    }
    const role = await role_service.findById(roleId);

    if (operation === ASSING_ROLE) {
      await user.addRole(role, t);
    } else if (operation === DELETE_ROLE) {
      await user.removeRole(role, t);
    } else {
      throw new ServiceError(
        "Operation not valid",
        ErrorCodes.OPERATION.NOT_VALID
      );
    }

    const updateUser = await user.reload({
      include: ["roles"],
      through: { attributes: [] },
    });
    await Transactions.commitTransaction(t);

    return updateUser;
  } catch (e) {
    await Transactions.rollbackTransaction(t);
    throw new ServiceError(
      e.message || "Error assing role",
      e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
    );
  }
};

/**
 * Busca un usuario por su id
 *
 * @param {string} id - Id del usuario
 * @returns {Promise<*>} - Usuario encontrado
 * @throws {ServiceError} - Error al buscar el usuario
 */
const findById = async (id) => {
  try {
    const user = await user_repository.findById(id);
    if (!user) {
      throw new ServiceError("User not exist", ErrorCodes.USER.NOT_FOUND);
    }

    return user;
  } catch (e) {
    throw new ServiceError(
      e.message || "Error finding user",
      e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
    );
  }
};

/**
 * Busca un usuario por su email
 *
 * @param {string} email - Email del usuario
 * @returns {Promise<*>} - Usuario encontrado
 * @throws {ServiceError} - Error al buscar el usuario
 */
const findByEmail = async (email) => {
  try {
    const user = await user_repository.findByEmail(email);
    if (!user) {
      throw new ServiceError("User not exist", ErrorCodes.USER.NOT_FOUND);
    }

    return user;
  } catch (e) {
    throw new ServiceError(
      e.message || "Error finding user",
      e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
    );
  }
};

/**
 * Busca todos los usuarios si se proporciona un rol busca los usuarios con ese rol
 *
 * @param {string} role - Rol del usuario (opcional)
 * @returns {Promise<*>} - Usuarios encontrados
 * @throws {ServiceError} - Error al buscar los usuarios
 */
const findAllByRole = async (role = null) => {
  try {
    let users;
    await role_service.findById(role);

    if (role) {
      users = await user_repository.findAllByRole(role);
    }

    users = await user_repository.findAll();
    return users;
  } catch (e) {
    throw new ServiceError(
      e.message || "Error finding user",
      e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  updatingRoles,
  findById,
  findByEmail,
  findAllByRole,
};
