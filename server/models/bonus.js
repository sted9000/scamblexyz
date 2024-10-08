const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Bonus = sequelize.define("Bonus", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rewardType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "boost",
    },
    bonusAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bonusType: {
      type: DataTypes.STRING,
      allowNull: false,
      enum: ["deposit", "signup", "happyhour", "other"],
    },
    allowShare: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    datetime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    confirmedCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    disputedCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    siteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Sites",
        key: "id",
      },
    },
  });

  Bonus.associate = (models) => {
    Bonus.belongsTo(models.User, { foreignKey: "userId" });
    Bonus.belongsTo(models.Site, { foreignKey: "siteId" });
    Bonus.belongsToMany(models.User, {
      through: models.ClaimBonus,
      foreignKey: "bonusId",
    });
  };

  return Bonus;
};
