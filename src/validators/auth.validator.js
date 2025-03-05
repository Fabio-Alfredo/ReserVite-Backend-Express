const { body } = require("express-validator");

const registerValidator = [
  body("name")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters")
    .bail(),

  body("email")
    .trim()
    .isString()
    .notEmpty()
    .isEmail()
    .withMessage("Invalid Email")
    .bail(),

  body("password")
    .trim()
    .isString()
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .bail(),
];

const loginValidator = [
  body("email")
    .trim()
    .isString()
    .notEmpty()
    .isEmail()
    .withMessage("Invalid Email")
    .bail(),

  body("password")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("Password is required")
    .bail(),
];

module.exports = {
  registerValidator,
  loginValidator,
};
