const user_repository = require("../repositories/user.repository");
const ServiceError = require("../utils/errors/service.error");
const ErrorCodes = require("../utils/errors/error.codes");
const createStrategy = require("../utils/jwt/jwt.util");
const Transactions = require("../repositories/transaction.repository");
const createEmail = require("../helpers/sedEmail.helper");

/**
 * Registra un nuevo usuario
 *
 * @param {Object} user - Datos del usuario
 * @returns {Promise<*>} - Usuario registrado
 * @throws {ServiceError} - Error al registrar el usuario
 */
const register = async (user) => {
  const t = await Transactions.starTransaction();
  try {
    const exists = await user_repository.findByEmail(user.email);
    if (exists) {
      throw new ServiceError(
        "Email already exists",
        ErrorCodes.USER.EMAIL_ALREADY_EXISTS
      );
    }
    const newUser = await user_repository.create(user);

    await Transactions.commitTransaction(t);
    return newUser;
  } catch (e) {
    await Transactions.rollbackTransaction(t);
    throw new ServiceError(
      e.message || "Error registering user",
      e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
    );
  }
};

/**
 * Autentica un usuario
 *
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Promise<*>} - Token de sesión
 * @throws {ServiceError} - Error al autenticar el usuario
 */
const authUser = async (email, password) => {
  const t = await Transactions.starTransaction();
  try {
    const user = await user_repository.findByEmail(email);

    if (!user || !(await user.validPassword(password))) {
      throw new ServiceError(
        "Invalid email or password",
        ErrorCodes.USER.INVALID_CREDENTIALS
      );
    }

    const tokenStrategy = createStrategy.createTokenStrategy("JWT");

    const tokenData = tokenStrategy.generateToken({
      id: user.id,
      email: user.email,
    });

    await user_repository.updateSessionToken(user.id, tokenData.token, t);

    await Transactions.commitTransaction(t);
    return tokenData;
  } catch (e) {
    await Transactions.rollbackTransaction(t);
    throw new ServiceError(
      e.message || "Error authenticating user",
      e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
    );
  }
};

/**
 * Recupera la contraseña de un usuario
 *
 * @param {string} email - Email del usuario
 * @param {string} name - Nombre del usuario
 * @returns {Promise<string>} - Token de recuperación
 * @throws {ServiceError} - Error al recuperar la contraseña
 */
const recoverPassword = async (email, name) => {
  const t = await Transactions.starTransaction();
  try {
    const exists = await user_repository.findByEmailAndUsername(email, name);
    if (!exists) {
      throw new ServiceError(
        "Invalid email or name",
        ErrorCodes.USER.NOT_FOUND
      );
    }

    const tokenStrategy = createStrategy.createTokenStrategy("RECOVERY_JWT");
    const token = tokenStrategy.generateToken({
      id: exists.id,
      email: exists.email,
    });

    await createEmail(
      email,
      "Recover Password",
      "Recover your password",
      `<a href="http://localhost:3000/recover/${token}">Recover Password</a>`
    );

    await user_repository.updateRecoveryToken(exists.id, token, t);

    await Transactions.commitTransaction(t);
    return token;
  } catch (e) {
    await Transactions.rollbackTransaction(t);
    throw new ServiceError(
      e.message || "Error recovering password",
      e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
    );
  }
};

/**
 * Resetea la contraseña de un usuario
 *
 * @param {string} token - Token de recuperación
 * @param {string} password - Nueva contraseña
 * @returns {Promise<string>} - Mensaje de éxito
 * @throws {ServiceError} - Error al resetear la contraseña
 */
const resetPassword = async (token, password) => {
  const t = await Transactions.starTransaction();
  try {
    const tokenStrategy = createStrategy.createTokenStrategy("RECOVERY_JWT");
    const payload = tokenStrategy.verifyToken(token);

    const user = await user_repository.findById(payload.id);

    if (!user) {
      throw new ServiceError("Invalid token", ErrorCodes.USER.INVALID_TOKEN);
    }

    user.password = password;
    user.recovery_token = null;
    await user_repository.save(user, t);

    await Transactions.commitTransaction(t);
    return "Password updated successfully";
  } catch (e) {
    await Transactions.rollbackTransaction(t);
    throw new ServiceError(
      e.message || "Error updating password",
      e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
    );
  }
};
module.exports = {
  register,
  authUser,
  recoverPassword,
  resetPassword,
};
