const UserScoreModel = (sequelize, DataTypes) => {
  const UserScore = sequelize.define("UserScore", {
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: "Users",
        key: "id",
      },
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });

  return UserScore;
};

const RankedUsersModel = (sequelize, DataTypes) => {
  const RankedUsers = sequelize.define(
    "RankedUsers",
    {
      userId: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      score: {
        type: DataTypes.INTEGER,
      },
      rank: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "ranked_users",
      timestamps: false,
    }
  );

  RankedUsers.associate = (models) => {
    RankedUsers.belongsTo(models.User, { foreignKey: "userId" });
  };

  return RankedUsers;
};

const createRankedUsersView = async (sequelize) => {
  try {
    // First, drop the view if it exists
    await sequelize.query(`DROP TABLE IF EXISTS ranked_users`);

    // Then, create the view
    await sequelize.query(`
      CREATE VIEW ranked_users AS
      SELECT
        userId,
        score,
        RANK() OVER (ORDER BY score DESC) as rank
      FROM UserScores
    `);
    console.log("Ranked users view created successfully");
  } catch (error) {
    console.error("Error creating ranked users view:", error);
  }
};

module.exports = { UserScoreModel, RankedUsersModel, createRankedUsersView };
