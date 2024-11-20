const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Site = sequelize.define("Site", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullName: {
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
    imagePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isPostcard: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    postcardValue: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    postcardLeadTime: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    postcardConsistancy: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    postcardPopularity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    checkinType: {
      type: DataTypes.STRING,
      defaultValue: null,
      enum: ["DAILY", "HOURLY", "24_HOUR"],
    },
    checkingResetTime: {
      type: DataTypes.STRING,
      defaultValue: "00:00:00",
    },
    checkinValue: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    parentCompany: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  });

  Site.associate = (models) => {
    Site.belongsToMany(models.User, {
      through: models.UserSites,
      foreignKey: "siteId",
    });
    Site.hasMany(models.CommunityBonus, {
      foreignKey: "siteId",
    });
    Site.hasMany(models.UserBonus, {
      foreignKey: "siteId",
    });
    Site.hasMany(models.Drop, {
      foreignKey: "siteId",
    });
  };

  return Site;
};