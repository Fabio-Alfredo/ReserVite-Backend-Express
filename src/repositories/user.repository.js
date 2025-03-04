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
 */
const update = async (id, data, t) => {
  const user = await Users.update(data, {
    where: { id },
    fields: ["name", "email", "password"],
    transaction: t,
  });
};

module.exports = {
  create,
  findById,
  findByEmail,
  save,
  update,
};
