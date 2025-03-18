const review_repository = require("../repositories/review.repository");
const event_service = require("../services/event.service");
const Transacción = require("../repositories/transaction.repository");
const { ErrorCodes, ServiceError } = require("../utils/errors");

/**
 * Crea una nueva review
 * @param {Object} review - Datos de la review
 * @param {Object} user - Usuario que realiza la review
 * @returns {Promise<Reviews>} - Review creada
 */
const createReview = async (review, user) => {
  const t = await Transacción.starTransaction();
  try {
    await event_service.findById(review.eventId);

    const newReview = await review_repository.create(review, t);

    await newReview.setUser(user.id, { transaction: t });
    await newReview.setEvent(review.eventId, { transaction: t });

    await Transacción.commitTransaction(t);
    return newReview;
  } catch (e) {
    await Transacción.rollbackTransaction(t);
    throw new ServiceError(
      e.message || "Error creating review",
      e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
    );
  }
};

/**
 * Busca todas las reviews de un evento
 * @param {string} id - Id del evento
 * @returns {Promise<Reviews>} - Reviews encontradas
 */
const findAllByEventId = async (eventId) => {
  try {
    await event_service.findById(eventId);

    const reviews = await review_repository.findAllByEventId(eventId);
    return reviews;
  } catch (e) {
    throw new ServiceError(
      e.message || "Error finding reviews",
      e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
    );
  }
};

/**
 * Busca una review por su id
 * @param {string} id - Id de la review
 * @returns {Promise<Reviews>} - Review encontrada
 */
const updateReview = async (id, review, user) => {
  const t = await Transacción.starTransaction();
  try {
    const reviewToUpdate = await review_repository.findById(id);

    if (!reviewToUpdate || reviewToUpdate.userId !== user.id) {
      throw new ServiceError("Review not found", ErrorCodes.REVIEW.NOT_FOUND);
    }

    const newReview = await review_repository.update(id, review, t);

    await Transacción.commitTransaction(t);
    return newReview;
  } catch (e) {
    await Transacción.rollbackTransaction(t);
    throw new ServiceError(
      e.message || "Error finding review",
      e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  createReview,
  findAllByEventId,
  updateReview,
};
