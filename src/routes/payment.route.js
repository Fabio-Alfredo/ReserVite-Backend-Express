const Route = require("express").Router;
const payment_controller = require("../controller/payement.controller");
const validatorHandler = require("../middlewares/validator.middleware");
const auth_middleware = require("../middlewares/auth.middleware");

const paymentRouter = Route();

paymentRouter.post(
  "/create",
  auth_middleware.authValidator,
  payment_controller.createPayment
);


module.exports = paymentRouter;