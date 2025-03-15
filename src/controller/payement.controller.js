const createHttpError = require("http-errors");
const { payment_service } = require("../services");
const { ErrorCodes } = require("../utils/errors");
const responseHandler = require("../helpers/responsehandler.helper");

const createPayment = async (req, res, next) => {
  try {
    const payment = req.body;
    const user = req.user;
    const newPayment = await payment_service.createPayment(payment, user);
    responseHandler(res, 201, newPayment);
  } catch (e) {
    switch (e.code) {
      case ErrorCodes.USER.NOT_FOUND:
        next(createHttpError(404, e.message));
        break;
      case ErrorCodes.RESERVATION.NOT_FOUND:
        next(createHttpError(404, e.message));
        break;
      case ErrorCodes.RESERVATION.INVALID_STATUS:
        next(createHttpError(400, e.message));
        break;
      case ErrorCodes.SERVER.INTERNAL_SERVER_ERROR:
        next(createHttpError(500, e.message));
        break;
      default:
        next(createHttpError(500, e.message));
    }
  }
};

const findAllByUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const payments = await payment_service.findAllByUser(userId);
    responseHandler(res, 200, payments);
  } catch (e) {
    switch (e.code) {
      case ErrorCodes.USER.NOT_FOUND:
        next(createHttpError(404, e.message));
        break;
      case ErrorCodes.PAYMENT.NOT_FOUND:
        next(createHttpError(404, e.message));
        break;
      case ErrorCodes.SERVER.INTERNAL_SERVER_ERROR:
        next(createHttpError(500, e.message));
        break;
      case ErrorCodes.RESERVATION.NOT_PENDING:
        next(createHttpError(400, e.message));
        break;
      case ErrorCodes.RESERVATION.NOT_FOUND:
        next(createHttpError(404, e.message));
        break;
      default:
        next(createHttpError(500, e.message));
    }
  }
};
module.exports = {
  createPayment,
  findAllByUser,
};
