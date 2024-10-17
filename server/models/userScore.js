module.exports = (sequelize, DataTypes) => {
  const UserScore = sequelize.define("UserScore", {
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: "Users",
        key: "id",
      },
    },
    overallScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    checkinScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    bonusScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    postcardScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });

  UserScore.associate = (models) => {
    UserScore.belongsTo(models.User, { foreignKey: "userId" });
  };

  return UserScore;
};

