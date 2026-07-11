const redis = require("../config/redis");

/**
 * Get cached data
 */
const getCache = async (key) => {
  try {
    return await redis.get(key);
  } catch (err) {
    console.error("Redis GET Error:", err.message);
    return null;
  }
};

/**
 * Store data in cache
 */
const setCache = async (key, value, ttl = 600) => {
  try {
    await redis.set(key, value, {
      ex: ttl,
    });
  } catch (err) {
    console.error("Redis SET Error:", err.message);
  }
};

/**
 * Delete cache
 */
// const deleteCache = async (key) => {
//   try {
//     await redis.del(key);
//   } catch (err) {
//     console.error("Redis DEL Error:", err.message);
//   }
// };
const deleteCache = async (key) => {
  try {
    console.log(`Deleting cache: ${key}`);
    await redis.del(key);
  } catch (err) {
    console.error("Redis DEL Error:", err.message);
  }
};

module.exports = {
  getCache,
  setCache,
  deleteCache,
};