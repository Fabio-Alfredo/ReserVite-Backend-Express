const stripe = require("../config/stripe/stripe.config");
const { ErrorCodes, ServiceError } = require("../utils/errors");

/**
 * Crea un cliente en Stripe y realiza un cargo
 *
 * @param {Object} user - Datos del usuario
 * @param {string} tokenId - Token de Stripe
 * @param {Object} reservation - Datos de la reserva
 * @returns {Promise<*>} - Cargo realizado
 */
const createCustomer = async (user, tokenId, reservation) => {
  try {
    
    const stripeCharge = await stripe.charges.create({
      amount: parseFloat(reservation.price) * 100,
      currency: "usd",
      source: tokenId,
      description: `Charge for ${user.email}`,
    });

    return stripeCharge;
  } catch (e) {
    throw new ServiceError(
      e.message || "Error creating customer",
      e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  createCustomer,
};
