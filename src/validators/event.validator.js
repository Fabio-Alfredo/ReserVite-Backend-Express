const { body, param  } = require("express-validator");

const createValidator = [
  body("title")
    .trim()
    .notEmpty()
    .isString()
    .withMessage("Title event is required")
    .isLength({ min: 5 })
    .withMessage("Title must be at least 5 characters")
    .bail(),

  body("description")
    .trim()
    .notEmpty()
    .isString()
    .withMessage("Description is required")
    .isLength({ min: 5 })
    .withMessage("Description must be at least 5 characters")
    .bail(),

  body("initial_date")
    .exists()
    .notEmpty()
    .isString()
    .withMessage("Initial date is required")
    .bail(),

  body("end_date")
    .exists()
    .notEmpty()
    .isString()
    .withMessage("End date is required")
    .bail(),

  body("location")
    .trim()
    .notEmpty()
    .isString()
    .withMessage("Location is required")
    .isLength({ min: 5 })
    .withMessage("Location must be at least 5 characters")
    .bail(),

  body("capacity")
    .notEmpty()
    .isInt()
    .withMessage("Capacity is required")
    .bail(),

  body("available_seats")
    .notEmpty()
    .isInt()
    .withMessage("Available seats is required")
    .bail(),

  body("price")
    .notEmpty()
    .isFloat({ decimal_digits: "0,2" })
    .withMessage("Price is required")
    .bail(),
];

const idValidator = [
  param("id").trim().notEmpty().isUUID().withMessage("Id is required").bail(),
];

const dateValidator = [
  param("date")
    .trim()
    .notEmpty()
    .isString()
    .withMessage("Date is required")
    .bail(),
];

const updateValidator = [
  param("id").trim().notEmpty().isUUID().withMessage("Id is required").bail(),
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .isString()
    .withMessage("Title event is required")
    .isLength({ min: 5 })
    .withMessage("Title must be at least 5 characters")
    .bail(),
  body("description")
    .optional()
    .trim()
    .notEmpty()
    .isString()
    .withMessage("Description is required")
    .isLength({ min: 5 })
    .withMessage("Description must be at least 5 characters")
    .bail(),
  body("initial_date")
    .optional()
    .exists()
    .notEmpty()
    .isString()
    .withMessage("Initial date is required")
    .bail(),
  body("end_date")
    .optional()
    .exists()
    .notEmpty()
    .isString()
    .withMessage("End date is required")
    .bail(),
  body("location")
    .optional()
    .trim()
    .notEmpty()
    .isString()
    .withMessage("Location is required")
    .isLength({ min: 5 })
    .withMessage("Location must be at least 5 characters")
    .bail(),
];

module.exports = {
  createValidator,
  idValidator,
  dateValidator,
  updateValidator,
};
