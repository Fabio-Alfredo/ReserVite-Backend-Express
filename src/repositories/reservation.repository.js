const { Reservations } = require("../domain/models");

const create = async (reservation, t) => {
  const newReservation = await Reservations.create(reservation, {
    transaction: t,
  });
  return newReservation;
};

module.exports = {
  create,
};
