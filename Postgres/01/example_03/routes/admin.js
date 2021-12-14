const express = require("express");
const router = express.Router();

router.get("/", (_req, res) => {
    console.log("/");
    res.header("Content-Type", "text/plain; charset=utf-8");
    res.end("Spróbuj /admin/users");
});

router.get("/users", (_req, res) => {
    console.log("Komunikat w konsoli serwera");
    res.json(["Błażej", "Kasia", "Tomek"]);
});

// dodajemy „wartswę przechwytującą”
router.use((req, res) => {
    console.log(`Zapytanie do nieznanej strony, wykonane metodą ${req.method}`);
    res.json({"err": "NIE ma takiej strony!"});
});

module.exports = router;
