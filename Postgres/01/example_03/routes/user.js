const express = require("express");
const router = express.Router();

router.post("/", (req, res, next) => {
    console.log("Argumenty przesłane metodą POST:");
    console.log(req.body);
    res.end("Metodzie POST mówimy NIE!");
});

router.use((req, res, next) => {
    console.log(`Zapytanie: metoda == ${req.method}, URL == ${req.url}`);
    next();
});

module.exports = router;
