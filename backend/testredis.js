require("dotenv").config();

const redis = require("./config/redis");

async function testRedis() {
  try {
    await redis.set("test", "Redis is working!");

    const value = await redis.get("test");

    console.log("Redis Response:");
    console.log(value);
  } catch (err) {
    console.error(err);
  }
}

testRedis();