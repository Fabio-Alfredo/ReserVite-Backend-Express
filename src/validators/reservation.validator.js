const { body, param } = require("express-validator");
const status_reservation = require("../utils/constants/statusReservation.util");

const createValidator = [
  body("quantity")
    .notEmpty()
    .isInt()
    .withMessage("Quantity is required")
    .bail(),

  body("eventId")
    .notEmpty()
    .isUUID()
    .withMessage("Event ID is required")
    .bail(),
];

const findByIdValidator = [
  param("id").trim().notEmpty().isUUID().withMessage("Id is required").bail(),
];

module.exports = {
  createValidator,
  findByIdValidator,
};
