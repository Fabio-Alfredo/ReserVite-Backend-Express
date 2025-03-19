const payment_repository = require("../repositories/payment.repository");
const user_service = require("./user.service");
const reservation_service = require("./reservation.service");
const stripe_service = require("./stripe.service");
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

    if (
      reservation.status !== status_reservation.PENDING ||
      reservation.userId !== user.id
    ) {
      throw new ServiceError(
        "Reservation not Found Invalid data user or status",
        ErrorCodes.RESERVATION.NOT_FOUND
      );
    }

    payment.amount = reservation.price;
    const newPayment = await payment_repository.create(payment, t);
    await reservation_service.updateStatus(
      reservation.id,
      status_reservation.PAID,
      t
    );

    await newPayment.setUser(Existsuser.id, { transaction: t });
    await newPayment.setReservation(reservation.id, { transaction: t });
    
    await stripe_service.createCustomer(Existsuser, payment.tokenId, reservation);
    await sendConfirmation(reservation, Existsuser, newPayment);

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
 * Envia un correo de confirmación de la reserva
 *
 * @param {Object} reservation - Datos de la reserva
 * @param {Object} user - Usuario que realiza la reserva
 * @param {Object} payment - Datos del pago
 * @returns {Promise<void>} - Promesa vacía
 */
const sendConfirmation = async (reservation, user, payment) => {
  const pdf = await generatePDF(
    {
      user: user.name,
      reservation: reservation.id,
      payment: payment.id,
      date: new Date().toLocaleDateString(),
      location: reservation.event.location,
      seats: reservation.quantity,
    },
    `./tickets/ticket_${payment.id}.pdf`
  );

  await sendEmail(user.email, "paymentConfirmation", pdf);
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
