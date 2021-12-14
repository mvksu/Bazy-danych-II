const IoRedis = require("ioredis");
const redis = new IoRedis();

const main = async () => {
    try {
        await redis.set("kot", "Garfield");
        const kot = await redis.get("kot");
        console.log(kot);
    } catch (err) {
        console.error(err);
    }
    redis.quit();
};

main();
