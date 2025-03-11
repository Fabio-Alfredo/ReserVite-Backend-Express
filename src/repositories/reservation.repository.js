const { Reservations } = require("../domain/models");

/**
 * Crea una nueva reserva
 *
 * @param {Object} reservation - Datos de la reserva
 * @param {Object} t - Transacción de la base de datos
 * @returns {Promise<*>} - Reserva creada
 */
const create = async (reservation, t) => {
  const newReservation = await Reservations.create(reservation, {
    transaction: t,
  });
  return newReservation;
};

/**
 * Busca una reserva por su id
 *
 * @param {string} id - Id de la reserva
 * @returns {Promise<*>} - Reserva encontrada
 */
const findById = async (id) => {
  const reservation = await Reservations.findByPk(id);
  return reservation;
};

/**
 * Busca todas las reservas
 *
 * @returns {Promise<*>} - Reservas encontradas
 */
const findAll = async () => {
  const reservations = await Reservations.findAll();
  return reservations;
};

/**
 * Busca todas las reservas de un usuario
 *
 * @param {string} userId - Id del usuario
 * @returns {Promise<*>} - Reservas encontradas
 */
const findAllByUser = async (userId) => {
  const reservations = await Reservations.findAll({
    where: {
      userId,
    },
  });
  return reservations;
};

module.exports = {
  create,
  findById,
  findAll,
  findAllByUser,
};
