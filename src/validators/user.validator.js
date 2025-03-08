const { body, query, param } = require("express-validator");
const operationRoles = require("../utils/constants/operationRoles.util");

const listOperations = Object.values(operationRoles);

const assingRoleValidator = [
  body("userId")
    .trim()
    .notEmpty()
    .isUUID()
    .withMessage("Id user is required")
    .bail(),

  body("roleId")
    .trim()
    .notEmpty()
    .isString()
    .withMessage("Id role is required")
    .bail(),

  body("operation")
    .trim()
    .notEmpty()
    .isIn(listOperations)
    .withMessage("Operation not valid")
    .bail(),
];

const findAllByRoleValidator = [
  query("roleId")
    .trim()
    .optional()
    .isString()
    .matches(/^(?:[A-Z]+)?$/)
    .withMessage("Role id is not valid")
    .bail(),
];

const findByIdValidator = [
  param("id")
    .trim()
    .notEmpty()
    .isUUID()
    .withMessage("Id user is required")
    .bail(),
];

const findByEmailValidator = [
  param("email")
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage("Email is required")
    .bail(),
];

module.exports = {
  assingRoleValidator,
  findAllByRoleValidator,
  findByIdValidator,
  findByEmailValidator,
};
