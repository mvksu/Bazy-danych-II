// Z poziomu Node.js zapytamy o dostępne polecenia
const IoRedis = require("ioredis");
const redis = new IoRedis();

const main = async () => {
    try {
        const polecenia = await redis.getBuiltinCommands();
        console.log(polecenia);
    } catch (err) {
        console.error(err);
    }
    redis.quit();
};

main();
