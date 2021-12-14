const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    console.log("Zapytanie metodą GET do strony głównej");
    res.end("Ahoj przygodo!?!");
});

module.exports = router;
