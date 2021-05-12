const mongoose = require("mongoose");

const QuarterPaymentSchema = new mongoose.Schema(
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
    quarteramount: {
      type: Number,
    },
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
      type: Number,
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
    year: {
      type: String,
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
    paymentStatus: {
      type: String,
      default: "Not Paid",
    },
    fullname: {
      type: String,
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
    gender: {
      type: String,
    },
    assignClass: {
      type: String,
    },
    stream: {
      type: String,
    },
    previousDue: {
      type: Number,
    },
    totalOutstanding: {
      type: Number,
    },
    assignSection: {
      type: String,
    },
    quarterNumber: {
      type: Number,
    },
    balance: {
      type: Number,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("QuarterPaymentSchema", QuarterPaymentSchema);
