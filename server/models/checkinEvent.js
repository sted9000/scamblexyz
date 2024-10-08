const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const CheckinEvent = sequelize.define("CheckinEvent", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    checkinTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    checkinType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["daily", "hourly"]],
      },
    },
    streakCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  });

  CheckinEvent.associate = (models) => {
    CheckinEvent.belongsTo(models.User);
    CheckinEvent.belongsTo(models.Site);
    CheckinEvent.belongsTo(models.Checkin);
  };

  return CheckinEvent;
};
