/*
    Dla uproszczenia kodu chcemy użyć „await” na najwyższym poziomie
    zagnieżdżenia. W node.js (przynajmniej na razie) taka konstrukcja
    obsługiwana jest wyłącznie wtedy, kiedy zastosujemy notację ES6 –
    stąd „import … from” zamiast „const … = require(…)”.

    Dodatkowo, ES6 dostepne jest wyłącznie wewnatrz „modułów” – stąd
    konieczność uzycia rozszerzenia „.mjs” zamiast „.js”.

*/
import neo4j from "neo4j-driver-lite";
import dotenv from "dotenv";

dotenv.config();
const user = process.env.DB_USER || "neo4j";
const pswd = process.env.DB_PSWD || "s3cr3t";
const host = process.env.DB_HOST || "localhost";

const driver = await neo4j.driver(
    `bolt://${host}`,
    neo4j.auth.basic(user, pswd)
);

const session = await driver.session({
    database: "neo4j",
    defaultAccessMode: neo4j.session.READ
});

console.log("Zaczynamy…\n");

await session
    .run(`
      MATCH (john {name: "John"})-[:FRIEND]->()-[:FRIEND]->(fof)
      RETURN john.name AS johnName, fof.name AS fofName
    `)
    .then(result => {
        result.records.forEach(record => {
            console.log(`John -(fof)-> ${record.get("fofName")}`);
        })
    })
    .catch(error => {
        console.log(error)
    })
    .then(() => session.close())

console.log("\nZapytanie obsłużone");

await driver.close()
