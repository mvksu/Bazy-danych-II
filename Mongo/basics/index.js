const mongoose = require("mongoose");
const User = require("./User");

mongoose.connect("mongodb://localhost:27017/basics");

async function run() {
  try {
    const user = await User.create({
      name: "Kyle",
      age: 24,
      hobbies: ["Weight Lifting, Chess"],
      email: "test@ws.pl",
      address: {
        street: "Main St",
      },
    });
    user.name = "Sally";
    //   const user = new User({ name: "Kyle", age: 30 });
    //   await user.save();
    console.log(user);
  } catch (err) {
    console.error(err.message);
  }
}
// run();

async function run2() {
  try {
    // const user = await User.find({ name: "Kyle" });
    const user = await await User.where({ name: "Kyle" })
      .where("age")
      .lt(123)
      .where("email")
      .eq("test@ws.pl")
      .populate("bestFriend")
      .limit(1)
      .select("age");
    user[0].bestFriend = "61b7b8ed38a3665b690f1997";
    await user[0].save();
    user[0].sayHi();
    console.log(user);
  } catch (err) {
    console.error(err.message);
  }
}
run2();
