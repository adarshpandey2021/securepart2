const mongoose = require("mongoose");

const FeeOnlineSchema = new mongoose.Schema(
  {
    admissionNo: {
      type: Number,
    },
    name: {
      type: String,
    },
    classOf: {
      type: String,
    },
    stream: {
      type: String,
    },
    section: {
      type: String,
    },
    quarterName: {
      type: String,
    },
    email: {
      type: String,
    },
    amountPay: {
      type: String,
    },
    lateFeecharge: {
      type: Number,
    },
    dueDate: {
      type: String,
    },
    payDate: {
      type: String,
    },
    status: {
      type: String,
      default: "Pending",
    },
    previousDue: {
      type: Number,
    },
    totalOutstanding: {
      type: Number,
    },
    currentDue: {
      type: Number,
    },
    balance: {
      type: Number,
    },
    paymentId: {
      type: String,
    },
    receiptUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FeeOnlineSchema", FeeOnlineSchema);
