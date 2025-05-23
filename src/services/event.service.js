const event_repository = require("../repositories/event.repository");
const user_service = require("../services/user.service");
const Transactions = require("../repositories/transaction.repository");
const status_reservation = require("../utils/constants/statusReservation.util");
const { ServiceError, ErrorCodes } = require("../utils/errors");
const uploadImages = require("../helpers/uploadImages.helper");

/**
 * Crea un nuevo evento
 *
 * @param {Object} event - Datos del evento
 * @param {Object} organizer - Organizador del evento
 * @returns {Promise<*>} - Evento creado
 */
const createEvent = async (event, organizer, file) => {
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

    if (!file || !file.image) {
      throw new ServiceError(
        "Image is required",
        ErrorCodes.EVENT.INVALID_IMAGES
      );
    }
    console.log("antes de subir la imagen");
    const image = await uploadImages(file, "events");
    event.url_images = image;
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

/**
 * Actualiza los asientos disponibles de un evento ya sea por una cancelación o confirmación
 *
 * @param {string} id - Id del evento
 * @param {number} seats - Cantidad de asientos
 * @param {string} actio - Acción a realizar
 * @returns {Promise<*>} - Evento actualizado
 */
const updateSeats = async (id, seats, actio) => {
  const t = await Transactions.starTransaction();
  try {
    const event = await findById(id);

    let newSeats;

    if (actio === status_reservation.CANCELED) {
      newSeats = event.available_seats + parseInt(seats);
    } else if (actio === status_reservation.PAID) {
      newSeats = event.available_seats - parseInt(seats);
    }

    await event.update({ available_seats: newSeats }, { transaction: t });

    await Transactions.commitTransaction(t);

    return event;
  } catch (e) {
    await Transactions.rollbackTransaction(t);
    throw new ServiceError(
      e.message || "Error updating seats",
      e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
    );
  }
};

/**
 * Actualiza la información de un evento
 *
 * @param {string} id - Id del evento
 * @param {Object} event - Datos del evento
 * @returns {Promise<*>} - Evento actualizado
 */
const updateEvent = async (id, event, file) => {
  const t = await Transactions.starTransaction();
  try {
    await findById(id);

    if (event.location && event.initial_date && event.end_date) {
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
    }

    if (file && file.image) {
      const image = await uploadImages(file, "events");
      event.url_images = image;
    }

    const updatedEvent = await event_repository.update(id, event, t);

    await Transactions.commitTransaction(t);
    return updatedEvent;
  } catch (e) {
    await Transactions.rollbackTransaction(t);
    throw new ServiceError(
      e.message || "Error updating event",
      e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
    );
  }
};

/**
 * Elimina un evento
 *
 * @param {string} id - Id del evento
 * @returns {Promise<boolean>} - Evento eliminado
 */
const deleteEvent = async (id) => {
  const t = await Transactions.starTransaction();
  try {
    await event_repository.findById(id);
    const deleted = await event_repository.delete(id, t);

    await Transactions.commitTransaction(t);
    return deleted;
  } catch (e) {
    await Transactions.rollbackTransaction(t);
    throw new ServiceError(
      e.message || "Error deleting event",
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
  updateSeats,
  updateEvent,
  deleteEvent,
};
