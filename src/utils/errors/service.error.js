/**
 * ServiceError class
 * @class
 * @extends Error
 */
class ServiceError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

module.exports = ServiceError;