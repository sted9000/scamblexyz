const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const BonusClaim = sequelize.define("BonusClaim", {
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
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    bonusId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Bonuses",
        key: "id",
      },
    },
  });

  BonusClaim.associate = (models) => {
    BonusClaim.belongsTo(models.User, { foreignKey: "userId" });
    BonusClaim.belongsTo(models.Bonus, { foreignKey: "bonusId" });
  };

  return BonusClaim;
};