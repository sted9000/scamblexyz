const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const UserBonus = sequelize.define("UserBonus", {
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
      type: DataTypes.ENUM('deposit', 'deposit_daily', 'signup', 'happyhour', 'other'),
      allowNull: false,
    },
    claimLimit: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "1",
    },
    datetime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    userId: {
      type: DataTypes.UUID,
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
    communityBonusId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "CommunityBonuses",
        key: "id",
      },
    },
  },
  {
    tableName: "UserBonuses",
  }
  );

  UserBonus.associate = (models) => {
    UserBonus.belongsTo(models.User, { foreignKey: "userId" });
    UserBonus.belongsTo(models.Site, { foreignKey: "siteId" });
    UserBonus.belongsTo(models.CommunityBonus, { foreignKey: "communityBonusId" });
  };
  return UserBonus;
};
