const reservation_repository = require("../repositories/reservation.repository");
const event_service = require("../services/event.service");
const user_service = require("../services/user.service");
const Transacción = require("../repositories/transaction.repository");
const status_reservation = require("../utils/constants/statusReservation.util");
const { ErrorCodes, ServiceError } = require("../utils/errors");

/**
 * Crea una nueva reserva
 *
 * @param {Object} reservation - Datos de la reserva
 * @param {Object} user - Usuario que realiza la reserva
 * @returns {Promise<*>} - Reserva creada
 */
const createReservation = async (reservation, user) => {
  const t = await Transacción.starTransaction();
  try {
    const event = await event_service.findById(reservation.eventId);

    if (event.available_seats < reservation.quantity) {
      throw new ServiceError(
        "Not enough seats",
        ErrorCodes.RESERVATION.NOT_ENOUGH_SEATS
      );
    }

    const newReservation = await reservation_repository.create(reservation, t);
    await newReservation.setUser(user.id, { transaction: t });

    await Transacción.commitTransaction(t);
    return newReservation;
  } catch (e) {
    await Transacción.rollbackTransaction(t);
    throw new ServiceError(
      e.message || "Error creating reservation",
      e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
    );
  }
};

/**
 * Busca una reserva por su id
 *
 * @param {string} id - Id de la reserva
 * @returns {Promise<*>} - Reserva encontrada
 */
const findById = async (id) => {
  try {
    const reservation = await reservation_repository.findById(id);
    if (!reservation) {
      throw new ServiceError(
        "Reservation not found",
        ErrorCodes.RESERVATION.NOT_FOUND
      );
    }
    return reservation;
  } catch (e) {
    throw new ServiceError(
      e.message || "Error finding reservation",
      e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
    );
  }
};

/**
 * Busca todas las reservas
 *
 * @returns {Promise<*>} - Reservas encontradas
 */
const findAll = async () => {
  try {
    const reservations = await reservation_repository.findAll();

    return reservations || [];
  } catch (e) {
    throw new ServiceError(
      e.message || "Error finding reservation",
      e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
    );
  }
};

/**
 * Actualiza el estado de una reserva y las plazas disponibles del evento
 *
 * @param {string} id - Id de la reserva
 * @param {string} status - Nuevo estado de la reserva
 * @returns {Promise<*>} - Reserva actualizada
 */
const updateStatus = async (id, status) => {
  const t = await Transacción.starTransaction();
  try {
    const reservation = await findById(id);

    if (!Object.values(status_reservation).includes(status)) {
      throw new ServiceError(
        "Invalid status",
        ErrorCodes.RESERVATION.INVALID_STATUS
      );
    }

    await event_service.updateSeats(
      reservation.eventId,
      reservation.quantity,
      status,
      t
    );

    await reservation.update({ status: status }, { transaction: t });

    await Transacción.commitTransaction(t);
    return reservation;
  } catch (e) {
    await Transacción.rollbackTransaction(t);
    throw new ServiceError(
      e.message || "Error updating reservation",
      e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
    );
  }
};

/**
 * Busca todas las reservas de un usuario
 *
 * @param {Object} user - Usuario
 * @returns {Promise<*>} - Reservas encontradas
 */
const MyReservations = async (user) => {
  try {

    await user_service.findById(user.id);
    const reservations = await reservation_repository.findAllByUser(user.id);

    return reservations || [];
  } catch (e) {
    throw new ServiceError(
      e.message || "Error finding reservation",
      e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  createReservation,
  updateStatus,
  findById,
  findAll,
  MyReservations,
};
