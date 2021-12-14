const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bar = () => console.log("-".repeat(50));


const personSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    age: Number
});

const bookSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'Person' },
    title: String
});

const Book = mongoose.model("Book", bookSchema);
const Person = mongoose.model('Person', personSchema);

mongoose.connect("mongodb://localhost:27017/wyklad_03").then(async () => {
    const db = mongoose.connection;

    bar();
    console.log("Połączenie z MongoDB nawiązane");

    const author = new Person({
        _id: new mongoose.Types.ObjectId(),
        name: "Ian Fleming"
    });

    author.save(async (err) => {
        if (err) return handleError(err);

        const book1 = new Book({
            title: "Casino Royale",
            author: author._id    // wstawiamy _id autora
        });

        await book1.save((err) => {
            if (err) return handleError(err);
            // zapisane
        });

        Book.
            findOne({ title: "Casino Royale" }).
            populate("author"). // WAŻNE – populacja
            exec((err, book) => {
                if (err) return handleError(err);
                bar();
                if (book.populated("author")) {
                    console.log("book.populated(\"author\") => true")
                    bar();
                    console.log(`Autorem książki „${book.title}” jest ${book.author.name}`);
                    bar();
                    console.log("book =>");
                    console.log(book);
                    bar();
                } else {
                    console.log("book.populated(\"author\") => false")
                }
            });

        await Book.deleteMany({});
        await Person.deleteMany({});

        mongoose.disconnect();

    });

}).catch(err => {
    if (err) {
        console.error(err);
    }
});
