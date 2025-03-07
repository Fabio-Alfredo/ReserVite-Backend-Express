const user_service = require("../services/user.service");
const responseHandler = require("../helpers/responsehandler.helper");
const createHttpError = require("http-errors");
const ErrorCodes = require("../utils/errors/error.codes");
const userDTO = require("../domain/dtos/user.dto");

const assingRole = async (req, res, next) => {
  try {
    const { userId, roleId, operation } = req.body;
    const user = await user_service.updatingRoles(userId, roleId, operation);
    responseHandler(res, 200, "Role assigned successfully", userDTO(user));
  } catch (e) {
    switch (e.code) {
      case ErrorCodes.ROLE.ROLE_NOT_FOUND:
        next(createHttpError(404, e.message));
        break;
      case ErrorCodes.USER.NOT_FOUND:
        next(createHttpError(404, e.message));
        break;
      case ErrorCodes.SERVER.INTERNAL_SERVER_ERROR:
        next(createHttpError(500, e.message));
        break;
      case ErrorCodes.OPERATION.NOT_VALID:
        next(createHttpError(400, e.message));
        break;
      default:
        next(e);
    }
  }
};

module.exports = {
  assingRole,
};
