// models/userModel.js
const mongoose = require("mongoose");
const createSchema = require("./baseModel");

const schema = createSchema({
  name: "", // Automatically a required String
  email: { unique: true }, // A required, unique String
  password: "", // Defaults to required String
  role:""
});

module.exports = mongoose.model("AfghanUser", schema);
