// models/userModel.js
const mongoose = require("mongoose");
const createSchema = require("./baseModel");

const schema = createSchema({
  image: "", // Automatically a required String
  title_english:"",
  title_pashto:"",
  title_parsi:"",
  description_english:"",
  description_parsi:"",
  description_pashto:"",
  date_english:"",
  date_parsi:"",
  date_pashto:""
});

module.exports = mongoose.model("AfghanVisit", schema);
