const Route = require("express").Router;
const payment_controller = require("../controller/payement.controller");
const validatorHandler = require("../middlewares/validator.middleware");
const auth_middleware = require("../middlewares/auth.middleware");
const { createValidator } = require("../validators/payment.validator");

const paymentRouter = Route();

paymentRouter.post(
  "/create",
  auth_middleware.authValidator,
  createValidator,
  validatorHandler,
  payment_controller.createPayment
);

paymentRouter.get(
  "/",
  auth_middleware.authValidator,
  payment_controller.findAllByUser
);

module.exports = paymentRouter;
