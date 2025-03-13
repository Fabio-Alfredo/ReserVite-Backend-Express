const payment_repository = require("../repositories/payment.repository");
const user_service = require("./user.service");
const reservation_service = require("./reservation.service");
const { ErrorCodes, ServiceError } = require("../utils/errors");
const Transactions = require("../repositories/transaction.repository");
const generatePDF = require("../helpers/generatePDF.helper");
const sendEmail = require("../helpers/sedEmail.helper");

const createPayment = async (payment, user) => {
  const t = await Transactions.starTransaction();
  try {
    const Existsuser = await user_service.findById(user.id);
    const reservation = await reservation_service.findById(
      payment.reservation_id
    );

    if (!Existsuser || !reservation) {
      throw new ServiceError(
        "User or reservation not found",
        ErrorCodes.USER.NOT_FOUND
      );
    }

    // if (reservation.status !== "PENDING") {
    //   throw new ServiceError(
    //     "Reservation is not pending",
    //     ErrorCodes.RESERVATION.NOT_PENDING
    //   );
    // }

    const newPayment = await payment_repository.create(payment, t);
    await reservation_service.updateStatus(reservation.id, "CONFIRMED", t);

    await newPayment.setUser(Existsuser.id, { transaction: t });
    await newPayment.setReservation(reservation.id, { transaction: t });

    const pdf = await generatePDF(
      {
        user: Existsuser.name,
        reservation: reservation.id,
        payment: newPayment.id,
        date: new Date().toLocaleDateString(),
        // location: reservation.event.location,
        seats: reservation.quantity,
      },
      `./tickets/ticket_${newPayment.id}.pdf`
    );

    await sendEmail(Existsuser.email, "paymentConfirmation", pdf);
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
