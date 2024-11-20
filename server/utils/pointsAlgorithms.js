const checkinPoints = (streak) => {
  if (streak === 1) {
    return 1;
  } else if (1 < streak < 10) {
    return 2;
  } else if (10 <=streak < 25) {
    return 3;
  } else if (25 <= streak < 100) {
    return 4;
  } else {
    return 5;
  }
}

// A dollar is work 1 point
// 100 points if someone else logs your bonus
const bonusPoints = (bonus) => {
  if (bonus.confirmedCount <= 1 ) {
    return 10;
  } else {
    return 1;
  }
}

module.exports = { checkinPoints, bonusPoints };
