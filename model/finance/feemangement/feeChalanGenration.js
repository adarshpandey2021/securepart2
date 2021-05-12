const mongoose = require("mongoose");

const FeeChalanGenerateSchema = new mongoose.Schema({
  nameOfChallan: {
    type: String,
  },
  admissionNo: {
    type: Number,
  },
  classOf: {
    type: String,
  },
  section: {
    type: String,
  },
  amountPayable: {
    type: Number,
  },
  quarter: {
    type: String,
  },
  dueDate: {
    type: String,
  },
  action: {
    type: String,
  },
  quaterMonthName: {
    type: String,
  },
});

module.exports = mongoose.model(
  "FeeChalanGenerateSchema",
  FeeChalanGenerateSchema
);
