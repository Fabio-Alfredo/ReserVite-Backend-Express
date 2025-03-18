const { body, param } = require("express-validator");

const createReviewValidator = [
  body("eventId")
    .exists()
    .withMessage("El id del evento es requerido")
    .isUUID()
    .withMessage("El id del evento debe ser un UUID")
    .bail(),

  body("rating")
    .exists()
    .withMessage("La calificación es requerida")
    .isNumeric()
    .withMessage("La calificación debe ser un número")
    .bail(),

  body("comment")
    .exists()
    .withMessage("El comentario es requerido")
    .isString()
    .withMessage("El comentario debe ser un texto")
    .bail(),
];

const updateReviewValidator = [
  param("id")
    .exists()
    .withMessage("El id de la review es requerido")
    .isUUID()
    .withMessage("El id de la review debe ser un UUID")
    .bail(),

  body("comment")
    .optional()
    .exists()
    .withMessage("El comentario es requerido")
    .isString()
    .withMessage("El comentario debe ser un texto")
    .bail(),

  body("rating")
    .optional()
    .exists()
    .withMessage("La calificación es requerida")
    .isNumeric()
    .withMessage("La calificación debe ser un número")
    .bail(),
];

module.exports = {
  createReviewValidator,
  updateReviewValidator,
};
