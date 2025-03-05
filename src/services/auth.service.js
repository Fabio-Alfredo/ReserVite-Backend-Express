const user_repository = require('../repositories/user.repository');
const ServiceError = require('../utils/errors/service.error');
const ErrorCodes = require('../utils/errors/error.codes');
const createStrategy = require('../utils/jwt/jwt.util');
const Transactions = require('../repositories/transaction.repository');

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
        'Email already exists',
        ErrorCodes.USER.EMAIL_ALREADY_EXISTS
      );
    }
    const newUser = await user_repository.create(user);

    await Transactions.commitTransaction(t);
    return newUser;
  } catch (e) {
    await Transactions.rollbackTransaction(t);
    throw new ServiceError(
      e.message || 'Error registering user',
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
        'Invalid email or password',
        ErrorCodes.USER.INVALID_CREDENTIALS
      );
    }

    const tokenStrategy = createStrategy.createTokenStrategy('JWT');

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
      e.message || 'Error authenticating user',
      e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  register,
  authUser,
};
