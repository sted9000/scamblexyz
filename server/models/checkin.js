const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Checkin = sequelize.define("Checkin", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lastVisit: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    currentStreak: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    longestStreak: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  });

  Checkin.associate = (models) => {
    Checkin.belongsTo(models.User);
    Checkin.belongsTo(models.Site);
    Checkin.hasMany(models.CheckinEvent);
  };

  return Checkin;
};
