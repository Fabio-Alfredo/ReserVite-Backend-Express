const { sign, verify, TokenExpiredError } = require("jsonwebtoken");
const config = require("../../config/config");

/**
 * Token strategies
 *  funcion para generar y verificar tokens
 */
const TokenStrategies = {
  // JWT token strategy
  /**
   * Genera un token JWT
   * @param {Object} payload - Datos del token
   * @returns {Object} - Token generado
   * @returns {string} - Token
   * @returns {string} - Tipo de token
   * @returns {number} - Tiempo de exp
   */
  JWT: {
    generateToken: (payload) => {
      const token = sign(payload, config.secret_key_jwt, {
        expiresIn: 3600,
      });
      return {
        token,
        type: "Bearer",
        expires_in: 3600,
      };
    },

    /**
     * Verifica un token JWT
     * @param {string} token - Token a verificar
     * @returns {Object} - Datos del token
     */
    verifyToken: (token) => {
      try {
        const payload = verify(token, config.secret_key_jwt);
        return { valid: true, payload };
      } catch (e) {
        console.log(e);
        if (e instanceof TokenExpiredError)
          return { valid: false, message: "Token expired" };
        return { valid: false, message: "Invalidtoken" };
      }
    },
  },

  RECOVERY_JWT: {
    generateToken: (payload) => {
      const token = sign(payload, config.secret_key_recovery_jwt, {
        expiresIn: 900,
      });
      return token;
    },

    verifyToken: (token) => {
      try {
        const payload = verify(token, config.secret_key_recovery_jwt);
        return { valid: true, payload };
      } catch (e) {
        if (e instanceof TokenExpiredError)
          return { valid: false, message: "Token expired" };
        return { valid: false, message: "Invalidtoken" };
      }
    },
  },

  OAuth: {
    generateToken: (payload) => {
      // Implement OAuth token generation
    },
    verifyToken: (token) => {
      // Implement OAuth token verification
    },
  },
};

/**
 * Crea una estrategia de token
 * @param {string} strategy - Estrategia de token
 * @returns {Object} - Estrategia de token
 */
const createTokenStrategy = (strategy) => {
  if (!TokenStrategies[strategy]) {
    throw new Error("Invalid token strategy");
  }
  return TokenStrategies[strategy];
};

module.exports = {
  createTokenStrategy,
};
