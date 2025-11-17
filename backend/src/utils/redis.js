import { createClient } from "redis";

let redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

if (redisUrl && !redisUrl.startsWith('redis://') && !redisUrl.startsWith('rediss://')) {
    redisUrl = 'redis://localhost:6379';
}

const client = createClient({
    url: redisUrl,
    ...(redisUrl.startsWith('rediss://') && {
        socket: {
            tls: true,
            rejectUnauthorized: false,
        }
    })
});

client.on("error", (err) => {
    console.error("Redis Client Error", err);
});

const connectRedis = async () => {
    try {
        await client.connect();
        console.log("Connected to Redis");
    } catch (error) {
        console.error("Could not connect to Redis", error.message);
        process.exit(1);
    }
};

export { client, connectRedis };
