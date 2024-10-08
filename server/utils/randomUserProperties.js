// Function that returns a random username
function randomUsername() {
  const adjectives = ["Happy", "Lucky", "Sunny", "Clever", "Swift"];
  const nouns = ["Panda", "Tiger", "Eagle", "Dolphin", "Fox"];

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNumber = Math.floor(Math.random() * 100);

  return `${randomAdjective}${randomNoun}${randomNumber}`;
}

// Function that returns a random user icon (integer between 1 and 5)
function randomUserIcon() {
  return Math.floor(Math.random() * 5) + 1;
}

module.exports = { randomUsername, randomUserIcon };
