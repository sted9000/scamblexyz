const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Drop = sequelize.define("Drop", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dropDate: {
      type: DataTypes.DATE,
      allowNull: false,
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
    siteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Sites",
        key: "id",
      },
    },
  });

  Drop.associate = (models) => {
    Drop.belongsToMany(models.Batch, {
      through: models.BatchDrop,
      foreignKey: "dropId",
      otherKey: "batchId",
    });
  };

  return Drop;
};
