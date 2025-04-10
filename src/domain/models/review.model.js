/**
 * Modelo de la tabla reviews
 * 
 * Relaciones:
 * El modelo Reviews tiene una relación de muchos a uno con el modelo Events.
 * El modelo Reviews tiene una relación de muchos a uno con el modelo Users.
 * 
 * @typedef {Object} Reviews
 * @property {UUID} id - Identificador único de la reseña
 * @property {integer} rating.required - Calificación de la reseña
 * @property {string} comment.required - Comentario de la reseña
 * @property {Date} createdAt - Fecha de creación de la reseña
 * @property {Date} updatedAt - Fecha de actualización de la reseña
 */
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
