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
