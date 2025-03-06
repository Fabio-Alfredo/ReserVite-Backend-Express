const { body } = require('express-validator');

const createValidator = [
  body('id')
    .trim()
    .notEmpty()
    .isString()
    .withMessage('Id role is required')
    .isLength({ min: 3 })
    .withMessage('Id must be at least 3 characters')
    .bail(),

  body('name')
    .trim()
    .notEmpty()
    .isString()
    .withMessage('Name role is required')
    .isLength({ min: 5 })
    .withMessage('Name must be at least 5 characters')
    .bail(),
];

const idValidator = [
    body('id')
    .trim()
    .notEmpty()
    .isString()
    .withMessage('Id is required')
    .bail()
]

module.exports = {
  createValidator,
  idValidator
};
