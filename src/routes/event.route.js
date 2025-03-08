const Route = require("express").Router;
const event_controller = require("../controller/event.controller");
const validatorHandler = require("../middlewares/validator.middleware");
const auth_middleware = require("../middlewares/auth.middleware");

const eventRouter = Route();

eventRouter.post(
  "/create",
  auth_middleware.authValidator,
  event_controller.createEvent
);

module.exports = eventRouter;