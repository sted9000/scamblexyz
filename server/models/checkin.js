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
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    checkinType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "daily",
      enum: ["daily", "hourly"],
    },
    checkinTime: {
      type: DataTypes.TIME,
      allowNull: true,
      defaultValue: "00:00:00",
    },
    hourlyCheckinReset: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 24,
    },
  });

  Checkin.associate = (models) => {
    Checkin.belongsTo(models.User);
    Checkin.belongsTo(models.Site);
    Checkin.hasMany(models.CheckinEvent);
  };

  return Checkin;
};
