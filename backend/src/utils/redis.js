import dotenv from "dotenv";
dotenv.config();
import { createClient } from "redis";

const client = createClient({
    url: process.env.REDIS_URL,
    socket: {
        tls: true,
        rejectUnauthorized: false,
    }
});

client.on("error", (err) => {
    console.error("Redis Client Error", err);
});

const connectRedis = async () => {
    try {
        await client.connect();
        console.log("Connected to Redis");
    } catch (error) {
        console.error("Could not connect to Redis", error);
        process.exit(1);
    }
};

export { client, connectRedis };
