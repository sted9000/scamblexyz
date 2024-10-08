const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Site = sequelize.define("Site", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    siteName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    isPostcard: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  Site.associate = (models) => {
    Site.belongsToMany(models.User, {
      through: models.UserSites,
      foreignKey: "siteId",
    });
  };

  return Site;
};