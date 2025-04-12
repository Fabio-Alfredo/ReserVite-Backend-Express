const bcrypt = require("bcryptjs");

/**
 * Modelo de la tabla users
 * 
 * Relaciones:
 * El modelo Users tiene una relación de muchos a muchos con el modelo Roles.
 * El modelo Users tiene una relación de uno a muchos con el modelo Events.
 * El modelo Users tiene una relación de uno a muchos con el modelo Reservations.
 * El modelo Users tiene una relación de uno a muchos con el modelo Payments.
 * El modelo Users tiene una relación de uno a muchos con el modelo Reviews.
 * 
 * @typedef {Object} Users
 * @property {UUID} id - Identificador único del usuario
 * @property {string} name.required - Nombre del usuario
 * @property {string} email.required - Correo electrónico del usuario
 * @property {string} password.required - Contraseña del usuario
 * @property {Date} createdAt - Fecha de creación del usuario
 * @property {Date} updatedAt - Fecha de actualización del usuario
 */

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      id: {
        allowNull: false,
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validators: {
          notNull: {
            msg: "Name is required",
          },
          notEmpty: {
            msg: "Name cannot be empty",
          },
          is: {
            args: ["^[a-z]+$", "i"],
            msg: "Name must contain only letters",
          },
        },
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: {
          msg: "Email already exists",
        },
        validators: {
          notNull: {
            msg: "Email is required",
          },
          notEmpty: {
            msg: "Email cannot be empty",
          },
          isEmail: {
            msg: "Invalid email",
          },
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validators: {
          notNull: {
            msg: "Password is required",
          },
          notEmpty: {
            msg: "Password cannot be empty",
          },
        },
      },
      session_token: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      recovery_token: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      url_images:{
        allowNull: true,
        type: DataTypes.STRING,
        defaultValue: "https://res.cloudinary.com/dxk8v4z6f/image/upload/v1697085545/default_user.png",
        validators: {
          isUrl: {
            msg: "Invalid URL",
          },
        },
      }
    },
    {
      timestamps: true,
      tableName: "users",
      underscored: true,
      scopes: {
        withRoles: {
          include: [
            {
              model: sequelize.models.Roles,
              as: "roles",
              through: {
                attributes: [],
              },
              required: false,
            },
          ],
        },
      },
    }
  );

  Users.beforeSave(async (user) => {
    if (user.changed("password")) {
      user.password = await bcrypt.hash(user.password, parseInt(10));
    }
  });

  Users.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  Users.associate = (models) => {
    Users.belongsToMany(models.Roles, {
      through: "user_roles",
      as: "roles",
      foreignKey: "userId",
    });

    Users.hasMany(models.Events, {
      foreignKey: "organizer_id",
      as: "events",
    });

    Users.hasMany(models.Reservations, {
      foreignKey: "userId",
      as: "reservations",
    });
    Users.hasMany(models.Payments, {
      foreignKey: "userId",
      as: "payments",
    });
    Users.hasMany(models.Reviews, {
      foreignKey: "userId",
      as: "reviews",
    });
  };

  return Users;
};
