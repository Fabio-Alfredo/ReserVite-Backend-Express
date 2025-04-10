/**
 * Modelo de la tabla payments
 * 
 * Relaciones:
 * El modelo Payments tiene una relación de uno a muchos con el modelo Reservations.
 * El modelo Payments tiene una relación de uno a muchos con el modelo Users.
 * 
 * @typedef {Object} Payments
 * @property {UUID} id - Identificador único del pago
 * @property {string} payment_method.required - Método de pago
 * @property {decimal} amount.required - Monto del pago
 * @property {string} status.required - Estado del pago
 * @property {Date} createdAt - Fecha de creación del pago
 * @property {Date} updatedAt - Fecha de actualización del pago
 */
module.exports = (sequelize, DataTypes) => {
  const Payments = sequelize.define(
    "Payments",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      payment_method: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:"PAID"
      },
    },
    {
      tableName: "payment",
      timestamps: true,
      underscored: true,
    }
  );

  Payments.associate = (models) => {
    Payments.belongsTo(models.Reservations, {
      as: "reservation",
      foreignKey: "reservationId",
    });
    Payments.belongsTo(models.Users, {
      as: "user",
      foreignKey: "userId",
    });
  };

    return Payments;
};
