const createHttpError = require("http-errors");
const createStrategy = require("../utils/jwt/jwt.util");

/**
 * Middleware para validar la autenticación
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {Function} next - Next middleware function
 * @returns {Object} - Error response
 */
const authValidator = (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      throw createHttpError(401, "Token is required");
    }
    const tokenStrategy = createStrategy.createTokenStrategy("JWT");
    const payload = tokenStrategy.verifyToken(token);

    if (!payload) {
      throw createHttpError(401, "Invalid token");
    }

    req.user = payload;
    req.token = token;
    next();
  } catch (e) {
    next(e);
  }
};

/**
 * Middleware para validar los roles
 * @param {Array} roles - Roles permitidos
 * @returns {Function} - Middleware function para validar los roles
 */
const roleValidator = (roles = []) => {
  return (req, res, next) => {
    try {
      const { user } = req;
      if (!roles.some((role) => user.roles.includes(role))) {
        throw createHttpError(403, "Forbidden access");
      }

      next();
    } catch (e) {
      next(e);
    }
  };
};

module.exports = {
  authValidator,
  roleValidator,
};
