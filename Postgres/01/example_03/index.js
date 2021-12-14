// Użyjemy konfiguracji do zdefiniowania portu
require('dotenv').config();

const express = require("express");
const app = express();

// app.use(express.urlencoded({
//     "extended": false
// }));
app.use(express.json());

// Częsty „zabieg” – konfiguracja porzez zmienne systemowe
const port = process.env.PORT || 3000;

const user = require("./routes/user");
const admin = require("./routes/admin");
const main = require("./routes/main");

// „warstwa” dla użytkowników (middleware expressowe)
app.use(user);

// „warstwa” dla administratora (middleware expressowe)
app.use("/admin", admin);


// „część główna” aplikacji – dla zwykłych śmiertelników
// oczywiście można było również skorzystać z osobnej „warstwy”
app.use("/", main);

app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
});
