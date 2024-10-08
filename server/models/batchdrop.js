const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const BatchDrop = sequelize.define("BatchDrop", {
    batchId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Batches",
        key: "id",
      },
    },
    dropId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Drops",
        key: "id",
      },
    },
    dropType: {
      type: DataTypes.STRING,
      allowNull: false,
      enum: ["drop", "rejection"],
    },
    cardsProcessed: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return BatchDrop;
};
