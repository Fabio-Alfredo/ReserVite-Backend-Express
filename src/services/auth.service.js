const user_repository = require("../repositories/user.repository");
const ServiceError = require("../utils/errors/service.error");
const ErrorCodes = require("../utils/errors/error.codes");
const createStrategy = require("../utils/jwt/jwt.util");

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

const authUser = async (email, password) => {
  const user = await user_repository.findByEmail(email);

  if (!user || !(await user.validPassword(password))) {
    throw new ServiceError(
      "Invalid email or password",
      ErrorCodes.USER.INVALID_CREDENTIALS
    );
  }

  const tokenStrategy = createStrategy("JWT");

  const token = tokenStrategy.generateToken({
    id: user.id,
    email: user.email,
  });

  return token;
};

module.exports = {
  register,
  authUser,
};
