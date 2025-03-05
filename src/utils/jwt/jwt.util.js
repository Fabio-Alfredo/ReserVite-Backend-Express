const { sign, verify } = require("jsonwebtoken");
const config = require("../../config/config");

const TokenStrategies = {
  JWT: {
    generateToken: (payload) => {
      const token = sign(payload, config.development.secret_key_jwt);
      return token;
    },
    verifyToken: (token) => {
      const payload = verify(token, config.development.secret_key_jwt);
      return payload;
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

const createTokenStrategy = (strategy) => {
  if (!TokenStrategies[strategy]) {
    throw new Error("Invalid token strategy");
  }
  return TokenStrategies[strategy];
};

module.exports = {
  createTokenStrategy,
};
