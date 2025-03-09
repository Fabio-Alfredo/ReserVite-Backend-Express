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
        type: DataTypes.DECIMAL,
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
    });
  };

  return Events;
};
