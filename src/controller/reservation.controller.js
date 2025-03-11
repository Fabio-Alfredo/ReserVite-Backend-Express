const createHttpError = require("http-errors");
const { ErrorCodes } = require("../utils/errors");
const { reservation_service } = require("../services");
const responseHandler = require("../helpers/responsehandler.helper");

/**
 * Crea una nueva reserva
 *
 * @param {Object} req - Request
 * @param {Object} res - Response
 * @param {Function} next - Next function
 * @returns {Promise<void>} - Reserva creada
 */
const createReservation = async (req, res, next) => {
  try {
    const data = req.body;
    const user = req.user;
    const reservationo = await reservation_service.createReservation(
      data,
      user
    );
    responseHandler(res, 201, "Reservation created successfully", reservationo);
  } catch (e) {
    switch (e.code) {
      case ErrorCodes.EVENT.EVENT_NOT_FOUND:
        next(createHttpError(409, e.message));
        break;
      case ErrorCodes.SERVER.INTERNAL_SERVER_ERROR:
        next(createHttpError(500, e.message));
        break;
      case ErrorCodes.RESERVATION.NOT_ENOUGH_SEATS:
        next(createHttpError(400, e.message));
        break;
      default:
        next(e);
    }
  }
};

/**
 * Busca una reserva por su id
 *
 * @param {Object} req - Request
 * @param {Object} res - Response
 * @param {Function} next - Next function
 * @returns {Promise<void>} - Reserva encontrada
 */
const findReservationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reservation = await reservation_service.findById(id);
    responseHandler(res, 200, "Reservation found", reservation);
  } catch (e) {
    switch (e.code) {
      case ErrorCodes.RESERVATION.NOT_FOUND:
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

/**
 * Busca todas las reservas
 *
 * @param {Object} req - Request
 * @param {Object} res - Response
 * @param {Function} next - Next function
 * @returns {Promise<void>} - Reservas encontradas
 */
const findAllReservations = async (req, res, next) => {
  try {
    const reservations = await reservation_service.findAll();
    responseHandler(res, 200, "Reservations found", reservations);
  } catch (e) {
    switch (e.code) {
      case ErrorCodes.RESERVATION.NOT_FOUND:
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

/**
 * Busca todas las reservas de un usuario
 *
 * @param {Object} req - Request
 * @param {Object} res - Response
 * @param {Function} next - Next function
 * @returns {Promise<void>} - Reservas encontradas
 */
const MyReservations = async (req, res, next) => {
  try {
    const user = req.user;
    const reservations = await reservation_service.findAllByUser(user);
    responseHandler(res, 200, "Reservations found", reservations);
  } catch (e) {
    switch (e.code) {
      case ErrorCodes.RESERVATION.NOT_FOUND:
        next(createHttpError(404, e.message));
        break;
      case ErrorCodes.SERVER.INTERNAL_SERVER_ERROR:
        next(createHttpError(500, e.message));
        break;
      case ErrorCodes.USER.NOT_FOUND:
        next(createHttpError(404, e.message));
        break;
      default:
        next(e);
    }
  }
};

module.exports = {
  createReservation,
  findReservationById,
  findAllReservations,
  MyReservations,
};
