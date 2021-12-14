// SERWER REST-API
const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const mongoURL = process.env.MONGO || "mongodb://localhost:27017/demo";

mongoose.connect(mongoURL).then(async () => {
    // Funkcjonalność serwera aplikacji (po udanym połączeniu)
    console.log("Nawiązano połaczenie z MongoDB");
    // dodajemy „middleware” odpowiedzialne za „parametry”
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());

    const personRoutes = require("./routes/");
    app.use("/person", personRoutes);

    app.listen(port, () => {
        console.log(`Serwer HTTP działa na porcie ${port}`);
    });

}).catch( err => {
    if (err) {
        console.error(err);
    }
})
