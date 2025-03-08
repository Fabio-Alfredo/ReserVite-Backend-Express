const createHttpError = require("http-errors");
const { ErrorCodes } = require("../utils/errors");
const { event_service } = require("../services");
const responseHandler = require("../helpers/responsehandler.helper");

const createEvent = async (req, res, next) => {
  try {
    const event = req.body;
    const organizer = req.user;
    const newEvent = await event_service.createEvent(event, organizer);

    responseHandler(res, 201, "Event created successfully", newEvent);
  } catch (e) {
    switch (e.code) {
      case ErrorCodes.EVENT.EVENT_ALREADY_EXISTS:
        next(createHttpError(409, e.message));
        break;
      case ErrorCodes.SERVER.INTERNAL_SERVER_ERROR:
        next(createHttpError(500, e.message));
        break;
      case ErrorCodes.EVENT.INVALID_DATES:
        next(createHttpError(400, e.message));
        break;
      default:
        next(e);
    }
  }
};

module.exports = {
  createEvent,
};
