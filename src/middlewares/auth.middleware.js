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
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) return next(createHttpError(401, "Unauthorized"));

    const tokenStrategy = createStrategy.createTokenStrategy("JWT");
    const { valid, payload } = tokenStrategy.verifyToken(token);

    if (!valid) return next(createHttpError(401, "Unauthorized"));

    const user = await user_service.findById(payload.id);
    if (!user || user.session_token !== token)
      return next(createHttpError(401, "Unauthorized"));


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
