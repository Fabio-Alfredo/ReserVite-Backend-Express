const payment_repository = require("../repositories/payment.repository");
const user_service = require("./user.service");
const reservation_service = require("./reservation.service");
const { ErrorCodes, ServiceError } = require("../utils/errors");
const Transactions = require("../repositories/transaction.repository");

const createPayment = async (payment, user) => {
  const t = await Transactions.starTransaction();
  try {
    const user = await user_service.findById(user.id);
    const reservation = await reservation_service.findById(
      payment.reservation_id
    );

    if (!user || !reservation) {
      throw new ServiceError(
        "User or reservation not found",
        ErrorCodes.USER.NOT_FOUND
      );
    }

    const newPayment = await payment_repository.create(payment, t);
    await reservation_service.updateStatus(reservation.id, "CONFIRMED", t);

    await newPayment.setUser(user.id, { transaction: t });
    await newPayment.setReservation(reservation.id, { transaction: t });

    await Transactions.commitTransaction(t);
    return newPayment;
  } catch (e) {
    await Transactions.rollbackTransaction(t);
    throw new ServiceError(
      e.message || "Error creating payment",
      e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  createPayment,
};
