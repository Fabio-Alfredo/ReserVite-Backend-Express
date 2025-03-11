/**
 * Modelo de la tabla roles
 * @typedef {Object} Roles
 * @property {string} id - Identificador único del rol
 * @property {string} name.required - Nombre del rol
 * @property {Date} createdAt - Fecha de creación del rol
 * @property {Date} updatedAt - Fecha de actualización del rol
 */
module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define(
    "Roles",
    {
      id: {
        allowNull: false,
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
      tableName: "roles",
      underscored: true,
    }
  );

  Roles.associate = (models) => {
    Roles.belongsToMany(models.Users, {
      through: "user_roles",
      as: "users",
      foreignKey: "roleId",
    });
  };

  return Roles;
};
