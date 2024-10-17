const checkinPoints = (streak) => {
  if (streak === 1) {
    return 1;
  } else if (1 < streak < 10) {
    return 2;
  } else if (10 < streak < 25) {
    return 3;
  } else if (25 < streak < 100) {
    return 4;
  } else {
    return 5;
  }
}

// Bonus points are currently 1 point for each bonus you post or log...
// ... and 10 points if you post a bonus and it is logged by the another user
const bonusPoints = (bonus) => {
  if (bonus.confirmedCount <= 1 ) {
    return 10;
  } else {
    return 1;
  }
}

module.exports = { checkinPoints, bonusPoints };
