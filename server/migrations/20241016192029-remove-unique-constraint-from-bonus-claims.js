'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      // 1. Rename the current table
      await queryInterface.renameTable('BonusClaims', 'BonusClaims_old', { transaction });

      // 2. Create a new table without the unique constraint
      await queryInterface.createTable('BonusClaims', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        claimDate: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        userId: {
          type: Sequelize.UUID,
          allowNull: false,
        },
        bonusId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      }, { transaction });

      // 3. Copy data from the old table to the new one
      await queryInterface.sequelize.query(
        `INSERT INTO BonusClaims (id, claimDate, userId, bonusId, createdAt, updatedAt)
         SELECT id, claimDate, userId, bonusId, createdAt, updatedAt FROM BonusClaims_old`,
        { transaction }
      );

      // 4. Drop the old table
      await queryInterface.dropTable('BonusClaims_old', { transaction });
    });
  },

  down: async (queryInterface, Sequelize) => {
    console.log('Down migration not implemented for safety reasons.');
    console.log('To revert, you would need to manually recreate the table with the unique constraint.');
  }
};