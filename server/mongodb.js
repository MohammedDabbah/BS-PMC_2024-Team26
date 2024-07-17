const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb+srv://mdabbah670:MD%404284@cluster0.fax8vly.mongodb.net/User")
  .then(() => { console.log("MongoDB connected") })
  .catch(() => { console.log("Failed to connect to MongoDB") });

// Base User Schema
const UserSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  username: String,
  mail: String,
  password: String,
  role: String,
});
UserSchema.plugin(passportLocalMongoose);

const Developer = mongoose.model("Developer", UserSchema);
const Manager = mongoose.model("Manager", UserSchema);
const Tester = mongoose.model("Tester", UserSchema);

const userModels = {
  developer: Developer,
  manager: Manager,
  tester: Tester,
};

module.exports = userModels;