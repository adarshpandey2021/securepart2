const mongoose = require("mongoose");

const TotalPaymentSchema = new mongoose.Schema(
  {
    applicationNo: {
      type: Number,
    },
    totalamount: {
      type: Number,
    },
    amountPaid: {
      type: Number,
    },
    amountBalance: {
      type: Number,
    },
    q1: {
      type: Boolean,
    },
    q2: {
      type: Boolean,
    },
    q3: {
      type: Boolean,
    },
    q4: {
      type: Boolean,
    },
    concessionType: {
      type: String,
    },
    concessionInPercentage: {
      type: Number,
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
  },
  { timestamp: true }
);

module.exports = mongoose.model("TotalPaymentSchema", TotalPaymentSchema);
