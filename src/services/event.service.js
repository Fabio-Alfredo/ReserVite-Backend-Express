const event_repository = require("../repositories/event.repository");
const user_service = require("../services/user.service");
const Transactions = require("../repositories/transaction.repository");
const { ServiceError, ErrorCodes } = require("../utils/errors");

/**
 * Crea un nuevo evento
 *
 * @param {Object} event - Datos del evento
 * @param {Object} organizer - Organizador del evento
 * @returns {Promise<*>} - Evento creado
 */
const createEvent = async (event, organizer) => {
  const t = await Transactions.starTransaction();
  try {
    const exists = await event_repository.existEvent(
      event.initial_date,
      event.end_date,
      event.location
    );

    if (exists) {
      throw new ServiceError(
        "Event already exists",
        ErrorCodes.EVENT.EVENT_ALREADY_EXISTS
      );
    }

    if (
      event.initial_date < new Date() ||
      event.end_date <= event.initial_date
    ) {
      throw new ServiceError("Invalid dates", ErrorCodes.EVENT.INVALID_DATES);
    }

    const newEvent = await event_repository.create(event, t);
    await newEvent.setOrganizer(organizer.id, { transaction: t });

    await Transactions.commitTransaction(t);
    return newEvent;
  } catch (e) {
    await Transactions.rollbackTransaction(t);
    throw new ServiceError(
      e.message || "Error creating event",
      e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
    );
  }
};

/**
 * Busca un evento por su id
 *
 * @param {string} id - Id del evento
 * @returns {Promise<*>} - Evento encontrado
 */
const findById = async (id) => {
  try {
    const event = await event_repository.findById(id);
    if (!event) {
      throw new ServiceError(
        "Event not found",
        ErrorCodes.EVENT.EVENT_NOT_FOUND
      );
    }
    return event;
  } catch (e) {
    throw new ServiceError(
      e.message || "Error finding event",
      e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
    );
  }
};

/**
 * Busca todos los eventos
 *
 * @returns {Promise<*>} - Eventos encontrados
 */
const findAll = async () => {
  try {
    const events = await event_repository.findAll();

    return events || [];
  } catch (e) {
    throw new ServiceError(
      e.message || "Error finding events",
      e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
    );
  }
};

/**
 * Busca todos los eventos de un organizador
 *
 * @param {string} organizerId - Id del organizador
 * @returns {Promise<*>} - Eventos encontrados
 */
const findAllByOrganizer = async (organizerId) => {
  try {
    const user = await user_service.findById(organizerId);

    if (!user.roles.some((role) => role.name === "organizer")) {
      throw new ServiceError("Organizer not found", ErrorCodes.USER.NOT_FOUND);
    }

    const events = await event_repository.findAllByOrganizer(user.id);

    return events || [];
  } catch (e) {
    throw new ServiceError(
      e.message || "Error finding events",
      e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
    );
  }
};

/**
 * Busca todos los eventos por una fecha
 *
 * @param {string} date - Fecha del evento
 * @returns {Promise<*>} - Eventos encontrados
 */
const findAllByDate = async (date) => {
  try {
    if (date < new Date()) {
      throw new ServiceError("Invalid date", ErrorCodes.EVENT.INVALID_DATES);
    }
    const events = await event_repository.findAllByDate(date);

    return events || [];
  } catch (e) {
    throw new ServiceError(
      e.message || "Error finding events",
      e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  createEvent,
  findById,
  findAll,
  findAllByOrganizer,
  findAllByDate,
};
