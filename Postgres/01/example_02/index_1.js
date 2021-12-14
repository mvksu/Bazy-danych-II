const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Ahoj przygodo!");
});

app.post("/", (req, res) => {
    res.send("Dostałem zapytanie metodą POST!");
});

app.put("/", (req, res) => {
    res.send("Dostałem zapytanie metodą PUT!");
});

app.delete("/", (req, res) => {
    res.send("Dostałem zapytanie metodą DELETE!");
});

app.listen(port, () => {
    console.log(`Aplikacja Express.js działa na portcie ${port}`);
});
