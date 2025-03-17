const Route = require("express").Router;
const reservation_controller = require("../controller/reservation.controller");
const validatorHandler = require("../middlewares/validator.middleware");
const auth_middleware = require("../middlewares/auth.middleware");
const {
  createValidator,
  findByIdValidator,
} = require("../validators/reservation.validator");

const reservationRouter = Route();

/**
 * @route POST /reservation/create
 * @description Crea una nueva reserva
 * @access Privado
 * @middleware
 * - authValidator => valida el token del usuario
 * - createValidator => valida los datos
 * - validatorHandler => maneja los errores
 * @cotroller
 * - reservation_controller.createReservation => crea una nueva reserva
 */
reservationRouter.post(
  "/create",
  auth_middleware.authValidator,
  createValidator,
  validatorHandler,
  reservation_controller.createReservation
);

/**
 * @route GET /reservation/find-by-id/:id
 * @description Busca una reserva por su id
 * @access Privado
 * @middleware
 * - authValidator => valida el token del usuario
 * - findByIdValidator => valida el id
 * - validatorHandler => maneja los errores
 * @cotroller
 * - reservation_controller.findReservationById => busca una reserva por su id
 */
reservationRouter.get(
  "/find-by-id/:id",
  auth_middleware.authValidator,
  findByIdValidator,
  validatorHandler,
  reservation_controller.findReservationById
);

/**
 * @route GET /reservation/find-all
 * @description Busca todas las reservas
 * @access Privado
 * @middleware
 * - authValidator => valida el token del usuario
 * - roleValidator => valida el rol del usuario
 * @cotroller
 * - reservation_controller.findAllReservations => busca todas las reservas
 */
reservationRouter.get(
  "/find-all",
  auth_middleware.authValidator,
  auth_middleware.roleValidator(["ADMIN", "ORG"]),
  reservation_controller.findAllReservations
);

/**
 * @route GET /reservation/find-my-reservations
 * @description Busca todas las reservas de un usuario
 * @access Privado
 * @middleware
 * - authValidator => valida el token del usuario
 * @cotroller
 * - reservation_controller.MyReservations => busca todas las reservas de un usuario
 */
reservationRouter.get(
  "/find-my-reservations",
  auth_middleware.authValidator,
  reservation_controller.MyReservations
);

/**
 * @route DELETE /reservation/delete/:id
 * @description Elimina una reserva
 * @access Privado
 * @middleware
 * - authValidator => valida el token del usuario
 * - roleValidator => valida el rol del usuario
 * - findByIdValidator => valida el id
 * - validatorHandler => maneja los errores
 * @cotroller
 * - reservation_controller.deleteReservation => elimina una reserva
 */
reservationRouter.patch(
  "/usage/:id",
  auth_middleware.authValidator,
  auth_middleware.roleValidator(["ADMIN"]),
  findByIdValidator,
  validatorHandler,
  reservation_controller.usageReservation
);

module.exports = reservationRouter;
