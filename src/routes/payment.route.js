const Route = require("express").Router;
const payment_controller = require("../controller/payement.controller");
const validatorHandler = require("../middlewares/validator.middleware");
const auth_middleware = require("../middlewares/auth.middleware");
const { createValidator } = require("../validators/payment.validator");

const paymentRouter = Route();

/**
 * @route POST /payment/create
 * @description Crea un nuevo pago
 * @access Privado
 * @middleware
 * - authValidator => valida el token del usuario
 * - createValidator => valida los datos
 * - validatorHandler => maneja los errores
 * @cotroller
 * - payment_controller.createPayment => crea un nuevo pago
 */
paymentRouter.post(
  "/create",
  auth_middleware.authValidator,
  createValidator,
  validatorHandler,
  payment_controller.createPayment
);

/**
 * @route GET /payment/find-all
 * @description Busca todos los pagos
 * @access Privado
 * @middleware
 * - authValidator => valida el token del usuario
 * @cotroller
 * - payment_controller.findAll => busca todos los pagos
 */
paymentRouter.get(
  "/",
  auth_middleware.authValidator,
  payment_controller.findAllByUser
);

module.exports = paymentRouter;
