const statusReservation = require("../../utils/constants/statusReservation.util");
const listStatus = Object.values(statusReservation);

/**
 * Modelo de la tabla reservations
 * @typedef {Object} Reservations
 * @property {UUID} id - Identificador único de la reserva
 * @property {integer} quantity.required - Cantidad de asientos reservados
 * @property {string} status.required - Estado de la reserva
 * @property {boolean} checked.required - Indica si la reserva fue revisada
 * @property {Date} createdAt - Fecha de creación de la reserva
 * @property {Date} updatedAt - Fecha de actualización de la reserva
 */
module.exports = (sequelize, DataTypes) => {
  const Reservations = sequelize.define(
    "Reservations",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: listStatus,
        allowNull: false,
        defaultValue: statusReservation.PENDING,
      },
      checked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      tableName: "reservations",
      timestamps: true,
      underscored: true,
    }
  );

  Reservations.associate = (models) => {
    Reservations.belongsTo(models.Events, {
      as: "event",
      foreignKey: "eventId",
    });
    Reservations.belongsTo(models.Users, {
      as: "user",
      foreignKey: "userId",
    });
    Reservations.hasOne(models.Payments, {
      as: "payment",
      foreignKey: "reservationId",
    });
  };

  return Reservations;
};
