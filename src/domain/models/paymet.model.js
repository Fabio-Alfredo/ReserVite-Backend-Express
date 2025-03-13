module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "Payment",
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
      },
    },
    {
      tableName: "payment",
      timestamps: true,
      underscored: true,
    }
  );

  Payment.associate = (models) => {
    Payment.hasOne(models.Reservations, {
      as: "reservation",
      foreignKey: "reservationId",
    });
    Payment.belongsTo(models.Users, {
      as: "user",
      foreignKey: "userId",
    });
  };
};
