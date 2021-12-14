const express = require("express");
const app = express();
const port = 3000;

app.get("/", (_req, res) => {
    console.dir(res);
    res.send("Ahoj przygodo!");
});

app.delete("/", (_req, res) => {
    res
        .status(418)
        .send("I po przygodzie :(");
});

app.listen(port, () => {
    console.log(`Aplikacja Express.js (z delete) działa na portcie ${port}`);
});
