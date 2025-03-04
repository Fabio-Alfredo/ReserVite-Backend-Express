const user_repository = require("../repositories/user.repository");
const ServiceError = require("../utils/errors/service.error");
const ErrorCodes = require("../utils/errors/error.codes");

const register = async (user) => {
  try {
    const exists = await user_repository.findByEmail(user.email);
    if (exists) {
      throw new ServiceError(
        "Email already exists",
        ErrorCodes.USER.EMAIL_ALREADY_EXISTS
      );
    }
    const newUser = await user_repository.create(user);
    return newUser;
  } catch (e) {
    throw new ServiceError(
      e.message || "Error registering user",
      e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  register,
};
