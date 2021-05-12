const mongoose = require("mongoose");

const FeeRefund = new mongoose.Schema(
  {
    admissionNo: {
      type: String,
    },
    name: {
      type: String,
    },
    classOf: {
      type: String,
    },
    section: {
      type: String,
    },
    stream: {
        type:String
    },
    refundHead: {
      type: String,
    },
    refundNoteDate: {
      type: String,
    },
    chequeNo: {
      type: String,
    },
    bankAccountNo: {
      type: Number,
    },
    bankName: {
      type: String,
    },
    bankBranch: {
      type: String,
    },
    chequeInFavourOf: {
      type: String,
    },
    amountToPay: {
      type: Number,
    },
    previousTransportFee:{
        type: Number,
      },
newTransportFee:{
    type: Number,
  },
routeChangeIntimateDate:{
    type: String,
  },
refundIntimateCreatedOn:{
    type: String,
  },
  chargeId:{
    type: String,
  },
  amountRefund:{
    type: Number,
  },
  refundId:{
    type: String,
  },
  status:{
      type:String
  },
  paymentMode:{
      type:String
  }
  },
  { timestamp: true }
);
module.exports = mongoose.model("FeeRefund", FeeRefund);
