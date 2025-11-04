import { client } from "./redis.js";
import jwt from "jsonwebtoken";

const addTokenToBlacklist = async (accessToken) => {
  try {
    const decoded = jwt.decode(accessToken);
    if (!decoded || !decoded.exp) return;
    const timeToLive = decoded.exp - Math.floor(Date.now() / 1000);
    if (timeToLive > 0) {
      await client.set(`blacklist:${accessToken}`, "revoked", {
        EX: timeToLive,
      });
      console.log(`add token to blacklist: ${accessToken}`);
    }
  } catch (error) {
    console.error("Error adding token to blacklist:", error);
  }
};

const isBlacklisted = async (accessToken) => {
  try {
    const result = await client.get(`blacklist:${accessToken}`);
    console.log(`check token in blacklist:${result}`);
    return result === "revoked";
  } catch (error) {
    console.error("Error checking if token is blacklisted:", error);
    return false;
  }
};

export { addTokenToBlacklist, isBlacklisted };
