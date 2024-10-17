const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const BonusEvent = sequelize.define("BonusEvent", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bonusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Bonuses", // Ensure this matches the name of the Bonus model
        key: "id",
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    event: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "confirmed",
      enum: ["confirmed", "disputed"],
    },
  });
  
  // Define associations for BonusEvent
  BonusEvent.associate = (models) => {
    BonusEvent.belongsTo(models.Bonus, { foreignKey: "bonusId" });
    BonusEvent.belongsTo(models.User, { foreignKey: "userId" });
  };

  return BonusEvent;
};
