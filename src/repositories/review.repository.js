const { Reviews } = require("../domain/models");

/**
 * Crea una nueva review
 * @param {Object} review - Datos de la review
 * @param {Object} t - Transacción de la base de datos
 * @returns {Promise<Reviews>} - Review creada
 */
const create = async (review, t) => {
  const newReview = await Reviews.create(review, { transaction: t });
  return newReview;
};

/**
 * Buscar reviews por su evento
 * @param {string} id - Id del evento
 * @returns {Promise<Reviews>} - Reviews encontrada
 */
const findByEventId = async (eventId) => {
  const reviews = await Reviews.findAll({
    where: { eventId },
  });
  return reviews;
};

/**
 * Buscar reviews por su usuario
 * @param {string} id - Id del usuario
 * @param {Object} t - Transacción de la base de datos
 * @returns {Promise<Reviews>} - Reviews encontrada
 */
const update = async (review, t) => {
  const updatedReview = await Reviews.update(review, {
    where: { id: review.id },
    transaction: t,
    fields: ["rating", "comment"],
  });
  return updatedReview;
};

module.exports = {
  create,
  findByEventId,
  update,
};