// models/baseModel.js
const mongoose = require("mongoose");

// Super-lazy schema generator
const createSchema = (fields) => {
  const processedFields = {};

  for (const [key, value] of Object.entries(fields)) {
    if (typeof value === "undefined" || value === "") {
      processedFields[key] = { type: String }; // Default to String
    } else if (typeof value === "object" && !value.type) {
      processedFields[key] = {
        type: String,
        ...value // Allow overrides like { unique: true } if needed
      };
    } else {
      processedFields[key] = {
        type: value.type || String,
        unique: !!value.unique, // Default to false
        default: value.default || undefined
      };
    }
  }

  return new mongoose.Schema(processedFields, { timestamps: true });
};

module.exports = createSchema;
