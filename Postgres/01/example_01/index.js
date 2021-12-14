require('dotenv').config();

const { Client } = require('pg');
const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD
});

(async () => {
    try {
        await client.connect();
        const res = await client.query('SELECT $1::text as message', ['Hello world!']);
        console.log(res.rows[0].message); // Hello world!
        await client.end();
    } catch (err) {
        console.error('Nie mogę połączyć się z serwerem');
        console.error(err);
    }
})();
