const Route = require("express").Router;
const event_controller = require("../controller/event.controller");
const validatorHandler = require("../middlewares/validator.middleware");
const auth_middleware = require("../middlewares/auth.middleware");
const {
  createValidator,
  idValidator,
  dateValidator,
  updateValidator,
} = require("../validators/event.validator");

const eventRouter = Route();

/**
 * @route POST /event/create
 * @description Crea un nuevo evento
 * @access Privado
 * @middleware
 * - authValidator => valida el token del usuario
 * - roleValidator => valida el rol del usuario
 * - createValidator => valida los campos del body
 * - validatorHandler => maneja los errores de validacion
 * @cotroller
 * - event_controller.createEvent => crea un nuevo evento
 */
eventRouter.post(
  "/create",
  auth_middleware.authValidator,
  auth_middleware.roleValidator(["ADMIN"]),
  createValidator,
  validatorHandler,
  event_controller.createEvent
);

/**
 * @route GET /event/find-by-id/:id
 * @description Busca un evento por su id
 * @access Privado
 * @middleware
 * - authValidator => valida el token del usuario
 * - idValidator => valida los campos del param
 * - validatorHandler => maneja los errores de validacion
 * @cotroller
 * - event_controller.findById => busca un evento por su id
 */
eventRouter.get(
  "/find-by-id/:id",
  auth_middleware.authValidator,
  idValidator,
  validatorHandler,
  event_controller.findById
);

/**
 * @route GET /event/find-all
 * @description Busca todos los eventos
 * @access Privado
 * @middleware
 * - authValidator => valida el token del usuario
 * @cotroller
 * - event_controller.findAll => busca todos los eventos
 */
eventRouter.get(
  "/find-all",
  auth_middleware.authValidator,
  event_controller.findAll
);

/**
 * @route GET /event/find-all-by-organizer/:id
 * @description Busca todos los eventos de un organizador
 * @access Privado
 * @middleware
 * - authValidator => valida el token del usuario
 * - idValidator => valida los campos del param
 * - validatorHandler => maneja los errores de validacion
 * @cotroller
 * - event_controller.findAllByOrganizer => busca todos los eventos de un organizador
 */
eventRouter.get(
  "/find-all-by-organizer/:id",
  auth_middleware.authValidator,
  idValidator,
  validatorHandler,
  event_controller.findAllByOrganizer
);

/**
 * @route GET /event/find-all-by-date/:date
 * @description Busca todos los eventos por una fecha
 * @access Privado
 * @middleware
 * - authValidator => valida el token del usuario
 * - dateValidator => valida los campos del param
 * - validatorHandler => maneja los errores de validacion
 * @cotroller
 * - event_controller.findAllByDate => busca todos los eventos por una fecha
 */
eventRouter.get(
  "/find-all-by-date/:date",
  auth_middleware.authValidator,
  dateValidator,
  validatorHandler,
  event_controller.findAllByDate
);

/**
 * @route PUT /event/update/:id
 * @description Actualiza un evento
 * @access Privado
 * @middleware
 * - authValidator => valida el token del usuario
 * - roleValidator => valida el rol del usuario
 * - updateValidator => valida los campos del body
 * - validatorHandler => maneja los errores de validacion
 * @cotroller
 * - event_controller.update => actualiza un evento
 */
eventRouter.put(
  "/update/:id",
  auth_middleware.authValidator,
  auth_middleware.roleValidator(["ADMIN"]),
  updateValidator,
  validatorHandler,
  event_controller.updateEventIformation
);

/**
 * @route DELETE /event/delete/:id
 * @description Elimina un evento
 * @access Privado
 * @middleware
 * - authValidator => valida el token del usuario
 * - roleValidator => valida el rol del usuario
 * - idValidator => valida los campos del param
 * - validatorHandler => maneja los errores de validacion
 * @cotroller
 * - event_controller.deleteOneEvent => elimina un evento
 */
eventRouter.delete(
  "/delete/:id",
  auth_middleware.authValidator,
  auth_middleware.roleValidator(["ADMIN"]),
  idValidator,
  validatorHandler,
  event_controller.deleteOneEvent
);

module.exports = eventRouter;
