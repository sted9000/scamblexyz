const calculateBonus = (bonus) => {
    const { amount, bonusAmount } = bonus;
    return bonusAmount - amount;
}

module.exports = { calculateBonus };    