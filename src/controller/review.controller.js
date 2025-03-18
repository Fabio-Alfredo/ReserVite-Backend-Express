const createHttpError = require("http-errors");
const { ErrorCodes } = require("../utils/errors");
const { review_service } = require("../services");
const responseHandler = require("../helpers/responsehandler.helper");

/**
 * Crea una nueva review
 * @param {Object} req - Request
 * @param {Object} res - Response
 * @param {Object} next - Next
 */
const createReview = async (req, res, next) => {
  try {
    const data = req.body;
    const user = req.user;

    const review = await review_service.createReview(data, user);
    responseHandler(res, 201, "Review created successfully", review);
  } catch (e) {
    switch (e.code) {
      case ErrorCodes.EVENT.EVENT_NOT_FOUND:
        next(createHttpError(409, e.message));
        break;
      case ErrorCodes.SERVER.INTERNAL_SERVER_ERROR:
        next(createHttpError(500, e.message));
        break;
      default:
        next(e);
    }
  }
};

/**
 * Busca todas las reviews de un evento
 * @param {Object} req - Request
 * @param {Object} res - Response
 * @param {Object} next - Next
 */
const getReviewsByEventId = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const reviews = await review_service.findAllByEventId(eventId);
    responseHandler(res, 200, "Reviews found successfully", reviews);
  } catch (e) {
    switch (e.code) {
      case ErrorCodes.EVENT.EVENT_NOT_FOUND:
        next(createHttpError(409, e.message));
        break;
      case ErrorCodes.SERVER.INTERNAL_SERVER_ERROR:
        next(createHttpError(500, e.message));
        break;
      default:
        next(e);
    }
  }
};

/**
 * Busca una review por su id
 * @param {Object} req - Request
 * @param {Object} res - Response
 * @param {Object} next - Next
 */
const updateReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const user = req.user;
    const review = await review_service.updateReview(id, data, user);
    responseHandler(res, 200, "Review updated successfully", review);
  } catch (e) {
    switch (e.code) {
      case ErrorCodes.REVIEW.NOT_FOUND:
        next(createHttpError(409, e.message));
        break;
      case ErrorCodes.EVENT.EVENT_NOT_FOUND:
        next(createHttpError(409, e.message));
        break;
      case ErrorCodes.SERVER.INTERNAL_SERVER_ERROR:
        next(createHttpError(500, e.message));
        break;
      default:
        next(e);
    }
  }
};

const deleteOneReview = async (req, res, next) => {
  try {
    const user = req.user;
    const { eventId, reviewId } = req.body;
    await review_service.deleteReview(reviewId, eventId, user);
    responseHandler(res, 200, "Review deleted successfully");
  } catch (e) {
    switch (e.code) {
      case ErrorCodes.REVIEW.ERROR_DELETING_REVIEW:
        next(createHttpError(409, e.message));
        break;
      case ErrorCodes.EVENT.EVENT_NOT_FOUND:
        next(createHttpError(409, e.message));
        break;
      case ErrorCodes.SERVER.INTERNAL_SERVER_ERROR:
        next(createHttpError(500, e.message));
        break;
      default:
        next(e);
    }
  }
};
module.exports = {
  createReview,
  getReviewsByEventId,
  updateReview,
  deleteOneReview,
};
