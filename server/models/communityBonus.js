const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const CommunityBonus = sequelize.define("CommunityBonus", {
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
      enum: ["deposit", "deposit_daily", "signup", "happyhour", "other"],
    },
    claimLimit: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "1",
    },
    claimedCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    datetime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    siteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Sites",
        key: "id",
      },
    },
  },
  {
    tableName: "CommunityBonuses",
  }
);

  CommunityBonus.associate = (models) => {
    CommunityBonus.belongsTo(models.User, { foreignKey: "userId" });
    CommunityBonus.belongsTo(models.Site, { foreignKey: "siteId" });
    // CommunityBonus.hasOne(models.UserBonus, {
    //   foreignKey: "userBonusId",
    // });
  };
  return CommunityBonus;
};
