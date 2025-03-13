const { Payments } = require("../domain/models");

const create = async (paymet) => {
  const newPayment = await Payments.create(paymet);
  return newPayment;
};

module.exports = {
  create,
};
