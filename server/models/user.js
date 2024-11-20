const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    googleId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    userIcon: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.UserBonus, {
      foreignKey: "userId",
    });
    User.hasOne(models.UserScore, { foreignKey: "userId" });
    User.belongsToMany(models.Site, {
      through: models.UserSites,
      foreignKey: "userId",
    });
  };

  return User;
};