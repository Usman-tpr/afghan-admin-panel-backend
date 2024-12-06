// models/userModel.js
const mongoose = require("mongoose");
const createSchema = require("./baseModel");

const schema = createSchema({
  image: "", // Automatically a required String
  title_en:"",
  title_par:"",
  description_en:"",
  description_par:"",
  date_en:"",
  date_par:""
});

module.exports = mongoose.model("Visit", schema);
