const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const ClaimBonus = sequelize.define("BonusClaim", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    claimDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    bonusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Bonuses",
        key: "id",
      },
    },
  });

  ClaimBonus.associate = (models) => {
    ClaimBonus.belongsTo(models.User, { foreignKey: "userId" });
    ClaimBonus.belongsTo(models.Bonus, { foreignKey: "bonusId" });
  };

  return ClaimBonus;
};
