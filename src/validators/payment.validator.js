const { body } = require("express-validator");

const createValidator = [
  body("payment_method")
    .trim()
    .notEmpty()
    .isString()
    .withMessage("payment_method is required")
    .bail(),

  body("reservation_id")
    .trim()
    .notEmpty()
    .isUUID()
    .withMessage("reservation_id is required")
    .bail(),
];

module.exports = {
  createValidator,
};
