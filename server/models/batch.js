const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Batch = sequelize.define("Batch", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    submissionDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    totalCards: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pendingCards: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    creditedCards: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    rejectedCards: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    allowShare: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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

  Batch.associate = (models) => {
    Batch.belongsTo(models.User, {
      foreignKey: "userId",
    });
    Batch.belongsTo(models.Site, {
      foreignKey: "siteId",
    });
    Batch.belongsToMany(models.Drop, {
      through: models.BatchDrop,
      foreignKey: "batchId",
      otherKey: "dropId",
    });
  };

  return Batch;
};
