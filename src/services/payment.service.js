const payment_repository = require("../repositories/payment.repository");
const user_service = require("./user.service");
const reservation_service = require("./reservation.service");
const { ErrorCodes, ServiceError } = require("../utils/errors");
const Transactions = require("../repositories/transaction.repository");
const generatePDF = require("../helpers/generatePDF.helper");
const sendEmail = require("../helpers/sedEmail.helper");
const status_reservation = require("../utils/constants/statusReservation.util");

/**
 * Crea un nuevo pago
 *
 * @param {Object} payment - Datos del pago
 * @param {Object} user - Usuario que realiza el pago
 * @returns {Promise<*>} - Pago creado
 */
const createPayment = async (payment, user) => {
  const t = await Transactions.starTransaction();
  try {
    const Existsuser = await user_service.findById(user.id);
    const reservation = await reservation_service.findById(
      payment.reservation_id
    );

    if (reservation.status !== status_reservation.PENDING || reservation.userId !== user.id) {
      throw new ServiceError(
        "Reservation not Found Invalid data user or status",
        ErrorCodes.RESERVATION.NOT_FOUND
      );
    }

    payment.amount = reservation.price;
    const newPayment = await payment_repository.create(payment, t);
    await reservation_service.updateStatus(reservation.id, status_reservation.PAID, t);

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

/**
 * Busca todos los pagos de un usuario
 *
 * @param {string} userId - Id del usuario
 * @returns {Promise<*>} - Pagos encontrados
 */
const findAllByUser = async (userId) => {
  try {
    await user_service.findById(userId);

    const payments = await payment_repository.findAllByUser(userId);
    return payments;
  } catch (e) {
    throw new ServiceError(
      e.message || "Error finding payments",
      e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  createPayment,
  findAllByUser,
};
