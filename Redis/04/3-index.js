// Z poziomu Node.js zapytamy o dostępne polecenia
const express = require("express");
const app = express();
const axios = require("axios");
const IoRedis = require("ioredis");
const redis = new IoRedis();
const port = process.env.PORT || 3000;

// Skorzystamy z serwisu „https://jsonplaceholder.typicode.com/”
app.get("/items/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const value = await redis.get(id);
        if (value === null) { //nie było w Redisie więc sięgamy na zewnątrz
            const url = `https://jsonplaceholder.typicode.com/photos/${id}`;
            const { data } = await axios.get(url);
            await redis.set(id, JSON.stringify(data)); // zapisać można jedynie „napis”
            res.json(data);
        } else {
            res.json(JSON.parse(value));
        }
    } catch (err) {
        console.error(err);
    }
});

app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
});
