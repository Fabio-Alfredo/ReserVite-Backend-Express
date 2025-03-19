const Stripe = require("stripe");
const { stripe_secret_key } = require("../config");

const stripeClient = Stripe(stripe_secret_key);

module.exports = stripeClient;
