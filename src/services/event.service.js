const event_repository = require("../repositories/event.repository");
const { user_service } = require("../services");
const Transactions = require("../repositories/transaction.repository");
const { ServiceError, ErrorCodes } = require("../utils/errors");

const createEvent = async (event, organizer) => {
  const t = await Transactions.starTransaction();
  try {
    const exists = await event_repository.existEvent(
      event.initial_date,
      event.end_date,
      event.location
    );

    if (exists) {
      throw new ServiceError(
        "Event already exists",
        ErrorCodes.EVENT.EVENT_ALREADY_EXISTS
      );
    }

    if(event.initial_date < new Date() || event.end_date <= event.initial_date) {
      throw new ServiceError(
        "Invalid dates",
        ErrorCodes.EVENT.INVALID_DATES
      );
    }

    const newEvent = await event_repository.create(event, t);
    await newEvent.setOrganizer(organizer.id, { transaction: t });

    await Transactions.commitTransaction(t);
    return newEvent;
  } catch (e) {
    await Transactions.rollbackTransaction(t);
    throw new ServiceError(
      e.message || "Error creating event",
      e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  createEvent,
};
