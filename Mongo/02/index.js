const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

const personSchema = new mongoose.Schema({
    name:  String,
    age: Number
});

mongoose.connect("mongodb://localhost:27017/wyklad").then(async () => {
    const db = mongoose.connection;
    const Person = mongoose.model("Person", personSchema);

    console.log("Połączenie z MongoDB nawiązane");
    // Poniższe 4 linijki (po jednorazowym odkomentowaniu i uruchomieniu
    // serwera dodadzą do kolekcji „people” w bazie „wyklad” poniższe dwa
    // dokumenty)
    //-------------------------------------------------------------------
    // const mrBean = new Person({ name: "Jaś Fasola", age: 40 });
    // const johnDow = new Person({ name: "John Dow", age: 18 });
    // await mrBean.save();
    // await johnDow.save();
    //-------------------------------------------------------------------
    // Aby przetestować działanie należy:
    // 0. Zainstalować zależności: „npm install”
    // 1. Zdjąć komentarz z powyższych 4 linijek i uruchomić serwer: „node app.js”
    // 2. Zatrzymać serwer (Ctrl-C) i ponownie ująć w komentarz „4 linijki”
    // 3. Uruchomić serwer i w terminalu wydać polecenie „http localhost:3000/19”
    //
    // W efekcie odpowiedzią powininno być coś „w stylu”:
    //
    // Wynik:
    // {
    //     _id: new ObjectId("6165c34828451a1fe2a89633"),
    //     name: 'Jaś Fasola',
    //     age: 40,
    //     __v: 0
    // }

    app.use(express.urlencoded({extended: false}));

    app.get("/:age", async (req, res) => {
        const age = parseInt(req.params.age, 10);
        Person.find({"age": {$gt: age}}, (err, docs) => {
            console.log(req.params.age);
            if (err) {
                res.send(`Błąd: ${err}`);
            } else {
                console.log(docs);
                res.send(`Wynik:\n${docs}`);
            }
        })
    });
    app.listen(port, () => {
        console.log(`Serwer HTTP działa na porcie ${port}`);
    });
}).catch( err => {
    if (err) {
        console.error(err);
    }
});
