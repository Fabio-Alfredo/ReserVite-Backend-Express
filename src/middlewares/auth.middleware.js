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

module.exports = authValidator;
