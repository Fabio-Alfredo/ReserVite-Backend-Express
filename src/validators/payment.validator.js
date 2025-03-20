const { body } = require("express-validator");
const payment_methods = require("../utils/constants/paymentMethods");

const paymentMethodValues = Object.values(payment_methods);

const createValidator = [
  body("payment_method")
    .trim()
    .notEmpty()
    .isIn(paymentMethodValues)
    .isString()
    .withMessage("payment_method is required")
    .bail(),

  body("reservation_id")
    .trim()
    .notEmpty()
    .isUUID()
    .withMessage("reservation_id is required")
    .bail(),

  body("tokenId")
    .trim()
    .notEmpty()
    .isString()
    .withMessage("tokenId is required")
    .bail(),
];

module.exports = {
  createValidator,
};
