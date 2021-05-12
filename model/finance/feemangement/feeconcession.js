const mongoose = require("mongoose");

const FeeConcession = new mongoose.Schema(
  {
    admissionNo: {
      type: Number,
    },
    concessionType: {
      type: String,
    },
    concessionInPercentage: {
      type: Number,
    },
    gaurdianDetail: [
      {
        gaurdianName: {
          type: String,
        },
        relation: {
          type: String,
        },
      },
    ],
    fullname: {
      type: String,
    },
    guardianName: {
      type: String,
    },
    gender: {
      type: String,
    },
    assignClass: {
      type: String,
    },
    stream: {
      type: String,
    },
    registerationNo: {
      type: String,
    },
    deductAmount: {
      type: Number,
    },
    amountTotal: {
      type: Number,
    },
    balanceAmount: {
      type: Number,
    },
    perquaterdeduction: {
      type: Number,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("FeeConcession", FeeConcession);
