const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Person's name is required"],
        match: [/^\S+ \S+/, "Must be person's full name"]
    },
    age: {
        type: Number,
        required: true,
        min: [1, "Age must be > 0"],
        max: [130, "Person cannot be that old!"]
    }
});

module.exports = mongoose.model("Person", personSchema);
