const { body } = require("express-validator");
const operationRoles = require("../utils/constants/operationRoles.util");

const listOperations = Object.values(operationRoles);

const assingRole = [
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


module.exports = {
  assingRole,
};