const { Users } = require("../domain/models");

/**
 * Añade un nuevo usuario a la base de datos
 *
 * @param {Object} user - Datos del usuario
 * @param {Object} t - Transacción de la base de datos
 * @returns {Promise<*>} - Usuario creado
 */
const create = async (user, t) => {
  const newUser = await Users.create(user, { transaction: t });
  return newUser;
};

/**
 * Busca un usuario por su id
 *
 * @param {string} id - Id del usuario
 * @returns {Promise<*>} - Usuario encontrado
 */
const findById = async (id) => {
  const user = await Users.findByPk(id);
  return user;
};

/**
 * Busca un usuario por su email
 *
 * @param {string} email - Email del usuario
 * @returns {Promise<*>} - Usuario encontrado
 */
const findByEmail = async (email) => {
  const user = await Users.findOne({ where: { email } });
  return user;
};

/**
 * Guarda los cambios realizados en un usuario
 *
 * @param {Object} user - Datos del usuario
 * @param {Object} t - Transacción de la base de datos
 * @returns {Promise<*>} - Usuario actualizado
 */
const save = async (user, t) => {
  await user.save({ transaction: t });
  return user;
};

/**
 * Actualiza los datos de un usuario
 *
 * @param {string} id - Id del usuario
 * @param {Object} data - Datos del usuario
 * @param {Object} t - Transacción de la base de datos
 * @returns {Promise<*>} - Usuario actual
 */
const update = async (id, data, t) => {
  const user = await Users.update(data, {
    where: { id },
    fields: ["name", "email", "password"],
    transaction: t,
  });
  return user;
};

/**
 * Actualiza el token de sesión de un usuario
 *
 * @param {string} id - Id del usuario
 * @param {string} sessionToken - Token de sesión
 * @param {Object} t - Transacción de la base de datos
 * @returns {Promise<*>} - Usuario actualizado
 */
const updateSessionToken = async (id, sessionToken, t) => {
  const user = await Users.update(
    { session_token: sessionToken },
    {
      where: { id },
      fields: ["session_token"],
      transaction: t,
    }
  );
  return user;
};

/**
 * Actualiza el token de recuperación de un usuario
 *
 * @param {string} id - Id del usuario
 * @param {string} recoveryToken - Token de recuperación
 * @param {Object} t - Transacción de la base de datos
 * @returns {Promise<*>} - Usuario actualizado
 */
const updateRecoveryToken = async (id, recoveryToken, t) => {
  const user = await Users.update(
    { recovery_token: recoveryToken },
    {
      where: { id },
      fields: ["recovery_token"],
      transaction: t,
    }
  );
  return user;
};

/**
 * Busca un usuario por su email y nombre
 *
 * @param {string} email - Email del usuario
 * @param {string} name - Nombre del usuario
 * @returns {Promise<*>} - Usuario encontrado
 */
const findByEmailAndUsername = async (email, name) => {
  const user = await Users.findOne({ where: { email, name } });
  return user;
};

module.exports = {
  create,
  findById,
  findByEmail,
  save,
  update,
  updateSessionToken,
  findByEmailAndUsername,
  updateRecoveryToken,
};
