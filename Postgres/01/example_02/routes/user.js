module.exports = () => {
    return (req, res, next) => {
        console.log("To ja – warstwa pośrednicząca");
        if (req.method === "POST") {
            req.header("Content-Type", "text/plain; charset=utf-8");
            res.end("Metodzie POST mówimy NIE!");
        } else {
            console.log(`Zapytanie: metoda == ${req.method}, URL == ${req.url}`);
            next();
        }
    };
};
