const { body, param } = require("express-validator");
const status_reservation = require("../utils/constants/statusReservation.util");
const listStatus = Object.values(status_reservation);

const createValidator = [
  body("quantity")
    .notEmpty()
    .isInt()
    .withMessage("Quantity is required")
    .bail(),

  body("status")
    .trim()
    .notEmpty()
    .isIn(listStatus)
    .isString()
    .withMessage(
      "Status is required and must be one of the following values: " +
        listStatus
    )
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
