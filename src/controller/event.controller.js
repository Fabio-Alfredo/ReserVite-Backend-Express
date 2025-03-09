const createHttpError = require("http-errors");
const { ErrorCodes } = require("../utils/errors");
const { event_service } = require("../services");
const responseHandler = require("../helpers/responsehandler.helper");

/**
 * Crea un nuevo evento
 *
 * @param {Object} req - Request
 * @param {Object} res - Response
 * @param {Function} next - Next function
 * @returns {Promise<void>}
 */
const createEvent = async (req, res, next) => {
  try {
    const event = req.body;
    const organizer = req.user;
    const newEvent = await event_service.createEvent(event, organizer);

    responseHandler(res, 201, "Event created successfully", newEvent);
  } catch (e) {
    switch (e.code) {
      case ErrorCodes.EVENT.EVENT_ALREADY_EXISTS:
        next(createHttpError(409, e.message));
        break;
      case ErrorCodes.SERVER.INTERNAL_SERVER_ERROR:
        next(createHttpError(500, e.message));
        break;
      case ErrorCodes.EVENT.INVALID_DATES:
        next(createHttpError(400, e.message));
        break;
      default:
        next(e);
    }
  }
};

/**
 * Busca un evento por su id
 *
 * @param {Object} req - Request
 * @param {Object} res - Response
 * @param {Function} next - Next function
 * @returns {Promise<void>}
 */
const findById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await event_service.findById(id);

    responseHandler(res, 200, "Event found", event);
  } catch (e) {
    switch (e.code) {
      case ErrorCodes.EVENT.EVENT_NOT_FOUND:
        next(createHttpError(404, e.message));
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
 * Busca todos los eventos
 *
 * @param {Object} req - Request
 * @param {Object} res - Response
 * @param {Function} next - Next function
 * @returns {Promise<void>}
 */
const findAll = async (req, res, next) => {
  try {
    const events = await event_service.findAll();

    responseHandler(res, 200, "Events found", events);
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

/**
 * Busca todos los eventos de un organizador
 *
 * @param {Object} req - Request
 * @param {Object} res - Response
 * @param {Function} next - Next function
 * @returns {Promise<void>}
 */
const findAllByOrganizer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const events = await event_service.findAllByOrganizer(id);

    responseHandler(res, 200, "Events found", events);
  } catch (e) {
    switch (e.code) {
      case ErrorCodes.EVENT.EVENT_NOT_FOUND:
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

/**
 * Busca todos los eventos por una fecha
 *
 * @param {Object} req - Request
 * @param {Object} res - Response
 * @param {Function} next - Next function
 * @returns {Promise<void>}
 */
const findAllByDate = async (req, res, next) => {
  try {
    const { date } = req.params;
    const events = await event_service.findAllByDate(date);

    responseHandler(res, 200, "Events found", events);
  } catch (e) {
    switch (e.code) {
      case ErrorCodes.EVENT.EVENT_NOT_FOUND:
        next(createHttpError(404, e.message));
        break;
      case ErrorCodes.SERVER.INTERNAL_SERVER_ERROR:
        next(createHttpError(500, e.message));
        break;
      case ErrorCodes.EVENT.INVALID_DATES:
        next(createHttpError(400, e.message));
        break;
      default:
        next(e);
    }
  }
};

module.exports = {
  createEvent,
  findById,
  findAll,
  findAllByOrganizer,
  findAllByDate,
};
