module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define(
    "Reviews",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "reviews",
      timestamps: true,
      underscored: true,
    }
  );

  Reviews.associate = (models) => {
    Reviews.belongsTo(models.Events, {
      as: "event",
      foreignKey: "eventId",
    });
    Reviews.belongsTo(models.Users, {
      as: "user",
      foreignKey: "userId",
    });
  };

  return Reviews;
};
