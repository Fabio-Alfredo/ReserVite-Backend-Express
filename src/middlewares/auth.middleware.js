const createHttpError = require("http-errors");
const createStrategy = require("../utils/jwt/jwt.util");
const { user_service } = require("../services");

/**
 * Middleware para validar la autenticación
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {Function} next - Next middleware function
 * @returns {Object} - Error response
 */
const authValidator = async (req, res, next) => {
  try {
    const auth = req.headers["authorization"];
    if (!auth) {
      throw createHttpError(401, "Token is required");
    }
    const token = auth.split(" ")[1];

    const tokenStrategy = createStrategy.createTokenStrategy("JWT");
    const payload = tokenStrategy.verifyToken(token);

    const user = await user_service.findById(payload.id);

    if (!payload || user.session_token !== token) {
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
