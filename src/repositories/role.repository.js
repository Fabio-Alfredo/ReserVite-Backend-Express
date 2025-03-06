const { Roles } = require("../domain/models");

/**
 * Añade un nuevo rol a la base de datos
 *
 * @param {Object} role - Datos del rol
 * @param {Object} t - Transacción de la base de datos
 * @returns {Promise<*>} - Rol creado
 */
const create = async (role, t) => {
  const newRole = await Roles.create(role, { transaction: t });
  return newRole;
};

/**
 * Busca un rol por su id
 *
 * @param {string} id - Id del rol
 * @returns {Promise<*>} - Rol encontrado
 */
const findById = async (id) => {
  const role = await Roles.findByPk(id);
  return role;
};

/**
 * Busca todos los roles
 *
 * @returns {Promise<*>} - Roles encontrados
 */
const findAll = async () => {
  const roles = await Roles.findAll();
  return roles;
};

/**
 * Elimina un rol por su id
 *
 * @param {string} id - Id del rol
 * @param {Object} t - Transacción de la base de datos
 */
const deleteById = async (id, t) => {
  await Roles.destroy({ where: { id }, transaction: t });
  return true;
};

module.exports = {
  create,
  findById,
  deleteById,
  findAll,
};
