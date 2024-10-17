const { sequelize, ClaimBonus } = require('./models');

// 1. Check Database Schema
const checkDatabaseSchema = async (sequelize) => {
    try {
      const [results] = await sequelize.query(`
        SELECT sql 
        FROM sqlite_master 
        WHERE type='table' AND name='BonusClaims';
      `);
      console.log("BonusClaims table schema:", results[0].sql);
    } catch (error) {
      console.error("Error checking schema:", error);
    }
  };
  
  // 2. Check Existing Records
  const checkExistingRecords = async (ClaimBonus) => {
    try {
      const existingClaim = await ClaimBonus.findOne({
        where: {
          userId: '55967f69-e5d9-45c4-a361-cda0aad2814c',
          bonusId: 14
        }
      });
      console.log("Existing claim:", existingClaim);
    } catch (error) {
      console.error("Error checking existing records:", error);
    }
  };
  
  // 3. Attempt Insertion
  const attemptInsertion = async (ClaimBonus) => {
    try {
      const newClaim = await ClaimBonus.create({
        userId: '55967f69-e5d9-45c4-a361-cda0aad2814c',
        bonusId: 14,
        claimDate: new Date()
      });
      console.log("New claim created:", newClaim);
    } catch (error) {
      console.error("Error creating new claim:", error);
    }
  };
  
  // Main debugging function
  const debugUniqueConstraint = async (sequelize, ClaimBonus) => {
    await checkDatabaseSchema(sequelize);
    await checkExistingRecords(ClaimBonus);
    await attemptInsertion(ClaimBonus);
  };
  
  // Usage:
  debugUniqueConstraint(sequelize, ClaimBonus);