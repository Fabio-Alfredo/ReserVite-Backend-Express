const userDTO = require("../../domain/dtos/user.dto");

const statusReservation = {
  PENDING: "PENDING",
  PAID: "PAID",
  USED: "USED",
  CANCELED: "CANCELED",
};

module.exports = statusReservation;
