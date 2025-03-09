module.exports = (sequelize, DataTypes) => {
  const Reservations = sequelize.define(
    "Reservations",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("active", "cancelled"),
        allowNull: false,
        defaultValue: "active",
      },
      checked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
  };

  return Reservations;
};
