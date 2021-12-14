const Person = require("../models/persons");

exports.getPersons = (req, res) => {
    // UWAGA! poniżej (mimo uzycia „then” nie mamy do czynienia z Promise!!!)
    Person.find()
        .then(persons => {
            res.json(persons);
        })
        .catch(err => {
            res.status(500).json(err);
        })
};

exports.getPersonById = (req, res) => {
    const id = req.params.personId;
    Person.findById(id)
        .then(person => {
            // może się zdarzyć, że osoby nie znaleziono (wtedy person będzie „null”)
            if (person !== null) {
                console.log("Get person from DB");
                // UWAGA! Niekoniecznie musimy zwracać uzytkowinikowi komplet danych!!!
                res.json(person);
            } else {
                console.log(`Person with id=${id} not found`);
                res.status(404).json({ error: "Person not found" });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
};

// Praktycznie identyczna implemencja jak getPersonById
exports.getPersonByName = (req, res) => {
    const name = req.params.name;
    Person.findOne({ name })
        .then(person => {
            // może się zdarzyć, że osoby nie znaleziono (wtedy person będzie „null”)
            if (person !== null) {
                console.log("Get person from DB");
                // UWAGA! Niekoniecznie musimy zwracać uzytkowinikowi komplet danych!!!
                res.json(person);
            } else {
                console.log(`Person with name=${name} not found`);
                res.status(404).json({ error: "Person not found" });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
};

exports.addPerson = (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const person = new Person({ name, age });
    person
        .save() // też wynik jest typu „Query” (taka „niby” Promise)
        .then(result => {
            console.log("new person created");
            res.json(result);
        })
        .catch(err => {
            res.status(500).json(err);
        })

};

exports.deletePersons = (req, res) => {
    Person.deleteMany({})
        .then(() => {
            console.log("All matching persons deleted");
            res.json("OK");
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
};
