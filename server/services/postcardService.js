/* Setup */
const POSTCARD_DROPS_KEY = "postcard:drops";
const fetchPostcardDropsFromRedis = async (redisClient) => {
  try {
    const drops = await redisClient.zrevrange(
        POSTCARD_DROPS_KEY,
        0,
        50,
        "WITHSCORES"
    );
    return formatDrops(drops);
  } catch (error) {
    console.error("Error updating leaderboards:", error);
  }
}

function formatDrops(drops) {
  const formatted = [];
  for (let i = 0; i < drops.length; i += 2) {
    const [dropId, dropDate, siteId, source] = drops[i].split(":");
    formatted.push({
      dropId,
      dropDate,
      siteId,
      source,
    });
  }
  return formatted;
}

module.exports = {
  fetchPostcardDropsFromRedis,
};
