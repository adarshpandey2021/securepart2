const mongoose = require("mongoose");

const FeeScheduleCollectionSchema = new mongoose.Schema({
  quarterName: {
    type: String,
  },
  quarterMonth: [
    {
      type: String,
    },
  ],
  dueDate: {
    type: String,
  },
  qFeePercentOne: {
    type: String,
  },
  startingMonth: {
    type: Number,
  },
  endingMonth: {
    type: Number,
  },
  quaterMonthName: {
    type: String,
  },
  admissionNo: {
    type: Number,
  },
  applicationNo: {
    type: String,
  },
  assignSection: {
    type: String,
  },
  assignClass: {
    type: String,
  },
  fullname: {
    type: String,
  },
  stream: {
    type: String,
  },
  fixedDueDate: {
    type: String,
  },
  lastDateOfDeposit: {
    type: String,
    default: "",
  },
  scheduleLateFeeCharges: {
    type: String,
    default: "",
  },
  year: {
    type: Number,
  },
});

module.exports = mongoose.model(
  "FeeScheduleCollectionSchema",
  FeeScheduleCollectionSchema
);
