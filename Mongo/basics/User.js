const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: 1,
      max: 99,
    //   validate: {
    //       validator: v => v % 2 === 0,
    //       message: props => `${props.value} is not even number`
    // }
  },
  email: {
    type: String,
    minLength: 1,
    required: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  bestFriend: mongoose.SchemaTypes.ObjectId,
  hobbies: [String],
  address: addressSchema,
});

userSchema.methods.sayHi = function () {
    console.log("si hi")
}

module.exports = mongoose.model("User", userSchema);
