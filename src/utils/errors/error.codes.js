const ERROR_CODES = {
  SERVER: {
    INTERNAL_SERVER_ERROR: 1000,
    EMAIL_SEND_ERROR: 1001,
  },
  USER: {
    NOT_FOUND: 2000,
    INVALID_CREDENTIALS: 2001,
    EMAIL_ALREADY_EXISTS: 2002,
    INVALID_EMAIL: 2003,
    INVALID_TOKEN: 2004,
  },
  ROLE:{
    ROLE_NOT_FOUND: 3000,
    ROLE_ALREADY_EXISTS: 3001,
  },
  OPERATION:{
    NOT_VALID: 4000,
  },
  EVENT: {
    EVENT_ALREADY_EXISTS: 5000,
    INVALID_DATES: 5001,
    EVENT_NOT_FOUND: 5002,
  },
  RESERVATION: {
    NOT_ENOUGH_SEATS: 6000,
    NOT_FOUND: 6001,
    INVALID_STATUS: 6002,
    NOT_PENDING: 6003,
  },
  PAYMENT: {
    NOT_FOUND: 7000,
  },
  REVIEW: {
    NOT_FOUND: 8000,
    ERROR_DELETING_REVIEW: 8001,
  },
};

module.exports = ERROR_CODES;
