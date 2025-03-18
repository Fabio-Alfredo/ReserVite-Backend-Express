const Route = require("express").Router;
const review_controller = require("../controller/review.controller");
const validatorHandler = require("../middlewares/validator.middleware");
const auth_middleware = require("../middlewares/auth.middleware");

const reviewRouter = Route();

/**
 * @route POST /review/create
 * @description Crea una nueva review
 * @access Privado
 * @middleware
 * - authValidator => valida el token del usuario
 * - validatorHandler => maneja los errores
 * @cotroller
 * - review_controller.createReview => crea una nueva review
 */
reviewRouter.post(
  "/create",
  auth_middleware.authValidator,
  review_controller.createReview
);

/**
 * @route GET /review/find-all-by-event-id/:eventId
 * @description Busca todas las reviews de un evento
 * @access Privado
 * @middleware
 * - authValidator => valida el token del usuario
 * @cotroller
 * - review_controller.getReviewsByEventId => busca todas las reviews de un evento
 */
reviewRouter.get(
  "/find-all-by-event-id/:eventId",
  auth_middleware.authValidator,
  review_controller.getReviewsByEventId
);

/**
 * @route PUT /review/update/:id
 * @description Actualiza una review
 * @access Privado
 * @middleware
 * - authValidator => valida el token del usuario
 * - validatorHandler => maneja los errores
 * @cotroller
 * - review_controller.updateReview => actualiza una review
 */
reviewRouter.put(
  "/update/:id",
  auth_middleware.authValidator,
  review_controller.updateReview
);

module.exports = reviewRouter;
