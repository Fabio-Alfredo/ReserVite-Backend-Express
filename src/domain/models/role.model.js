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
