const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Leaderboard = sequelize.define("Leaderboard", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    rank: {
      type: DataTypes.INTEGER,
    },
    type: {
      type: DataTypes.ENUM("daily", "weekly", "allTime"),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });

  Leaderboard.associate = (models) => {
    Leaderboard.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Leaderboard;
};
