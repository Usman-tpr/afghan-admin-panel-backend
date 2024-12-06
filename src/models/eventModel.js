// models/userModel.js
const mongoose = require("mongoose");
const createSchema = require("./baseModel");

const schema = createSchema({
  image: "", // Automatically a required String
  title_en:"",
  title_per:"",
  description_per:"",
  description_per:"",
  date_en:"",
  date_per:""

});

module.exports = mongoose.model("Visiter", schema);
