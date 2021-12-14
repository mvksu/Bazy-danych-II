// Do zdefiniowania aplikacji użyjemy Express.js
const express = require('express');
const app = express();

// Nasza aplikacja będzie „konsumowała” dane w formacie JSON
app.use(express.json());
const fs = require('fs');
const csv = require('fast-csv')
const ws = fs.createWriteStream("my.csv")


//==================================================================
// Definiujemy REST API – kod poniżej wymaga uzupełnienia
//==================================================================

// Pobieranie danych na temat wszystkich zespołów
app.get('/bands', async (req, res) => {
  const bands = client.query("SELECT * FROM bands", (err, res) => {
    const resultsToCSV = res.map(x => [x.id, x.name, x.creationDate, new Date(new Date() - x.creationDate)])
    csv.write([
      ["id", "name", "creationDate", "years"],
      ...resultsToCSV
    ], {headers:true}).pipe(ws);
  })
});

// Dodawanie rekordów do bazy
app.post('/bands', async (req, res) => {
  const inserted = client.query("INSERT INTO bands (name, creationDate) VALUES ($1, $2)", ["name1", "02/11/12"], )
  const message = {
    toInsert: req.body
  };
  return res.send(message);
});

// Pobieranie danych na temat zespołu o danej nazwie
app.get('/bands/:bandName', async (req, res) => {
  let name = req.params.bandName;
  const bands = client.query("SELECT * FROM bands WHERE bandName = $1", [name]);
  return res.send({
    queryFor: name
  });
});

// Usuwanie rekordu związanego z zespołem
app.delete('/bands/:id', async (req, res) => {
  let id = req.params.id;
  client.query("DELETE FROM band WHERE id = $1", [id], (err, res) => {
    if (err) {
      throw err
    }
    else console.log(res)
  })
  return res.send({
    deletedBandId: id
  });
});

// Aktualizacja rekordu związanego z zespołem
app.put('/bands/:id', async (req, res) => {
  let id = req.params.id;
  let data = req.body;
  client.query('UPDATE band SET name = $1, creationDate = $2 WHERE id = $3', [data.name, data.creationDate, id], (err, res) => {
    if (err) {
      throw error
    }
    console.log('updated')
  })
});

//==================================================================
// Poniższy kod nie powinien już wymagać zmian
//==================================================================

// Przygotowujemy/wczytujemy konfigurację połączenia z PostgreSQL-em
require('dotenv').config();
const dbConnData = {
    host: process.env.PGHOST || '127.0.0.1',
    port: process.env.PGPORT || 5432,
    database: process.env.PGDATABASE || 'postgres',
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD
};
// Łączymy się z bazą i „stawiamy” serwer API
// Do kontaktu z serwerem PostgreSQL wykorzystamy bibliotekę pg

const { Client } = require('pg');
const client = new Client(dbConnData);
console.log('Connection parameters: ');
console.log(dbConnData);
client
  .connect()
  .then(() => {
    console.log('Connected to PostgreSQL');
    const port = process.env.PORT || 5000
    app.listen(port, () => {
      console.log(`API server listening at http://localhost:${port}`);
    });
  })
  .catch(err => console.error('Connection error', err.stack));
