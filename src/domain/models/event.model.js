/**
 * Modelo de la tabla events
 * 
 * Relaciones:
 * El modelo Events tiene una relación de uno a muchos con el modelo Reservations.
 * El modelo Events tiene una relación de uno a muchos con el modelo Reviews.
 * El modelo Events tiene una relación de muchos a uno con el modelo Users.
 * 
 * @typedef {Object} Events
 * @property {UUID} id - Identificador único del evento
 * @property {string} title.required - Título del evento
 * @property {string} description.required - Descripción del evento
 * @property {Date} initial_date.required - Fecha de inicio del evento
 * @property {Date} end_date.required - Fecha de finalización del evento
 * @property {string} location.required - Ubicación del evento
 * @property {integer} capacity.required - Capacidad máxima del evento
 * @property {integer} available_seats.required - Asientos disponibles del evento
 * @property {decimal} price.required - Precio del evento
 * @property {Date} createdAt - Fecha de creación del evento
 * @property {Date} updatedAt - Fecha de actualización del evento
 */
module.exports = (sequelize, DataTypes) => {
  const Events = sequelize.define(
    "Events",
    {
      id: {
        allowNull: false,
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
        validators: {
          notNull: {
            msg: "Title is required",
          },
          notEmpty: {
            msg: "Title cannot be empty",
          },
        },
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
        validators: {
          notNull: {
            msg: "Description is required",
          },
          notEmpty: {
            msg: "Description cannot be empty",
          },
        },
      },
      initial_date: {
        allowNull: false,
        type: DataTypes.DATE,
        validators: {
          notNull: {
            msg: "Initial date is required",
          },
        },
      },
      end_date: {
        allowNull: false,
        type: DataTypes.DATE,
        validators: {
          notNull: {
            msg: "End date is required",
          },
        },
      },
      location: {
        allowNull: false,
        type: DataTypes.STRING,
        validators: {
          notNull: {
            msg: "Location is required",
          },
          notEmpty: {
            msg: "Location cannot be empty",
          },
        },
      },
      capacity: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validators: {
          notNull: {
            msg: "Capacity is required",
          },
        },
      },
      available_seats: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validators: {
          notNull: {
            msg: "Available seats is required",
          },
        },
      },
      price: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
        validators: {
          notNull: {
            msg: "Price is required",
          },
        },
      },
    },
    {
      timestamps: true,
      tableName: "events",
      underscored: true,
      scopes: {
        withReviews: function () {
          return {
            include: [
              {
                model: sequelize.models.Reviews,
                as: "reviews",
                attributes: ["id", "rating", "comment", "createdAt"],
                required: false,
              },
            ],
          };
        },
      },
    }
  );

  Events.associate = (models) => {
    Events.belongsTo(models.Users, {
      as: "organizer",
      foreignKey: "organizer_id",
    });
    Events.hasMany(models.Reservations, {
      as: "reservations",
      foreignKey: "eventId",
      onDelete: "CASCADE",
    });
    Events.hasMany(models.Reviews, {
      as: "reviews",
      foreignKey: "eventId",
      onDelete: "CASCADE",
    });
  };

  return Events;
};
