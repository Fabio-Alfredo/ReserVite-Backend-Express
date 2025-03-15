const { where } = require("sequelize");
const { Payments } = require("../domain/models");

/**
 * Crea un nuevo pago
 *
 * @param {Object} paymet - Datos del pago
 * @returns {Promise<*>} - Pago creado
 */
const create = async (paymet) => {
  const newPayment = await Payments.create(paymet);
  return newPayment;
};

/**
 * Busca todos los pagos de un usuario
 *
 * @param {Number} userId - ID del usuario
 * @returns {Promise<*>} - Lista de pagos
 */
const findAllByUser = async (userId) => {
  const payments = await Payments.findAll({
    where: { user_id: userId },
  });
  return payments;
};

module.exports = {
  create,
  findAllByUser,
};
