const mongoose = require("mongoose");

const UpdateTransportSchema = new mongoose.Schema({
  admissionNo: {
    type: Number,
  },
  classOf: {
    type: String,
  },
  newTransport: {
    type: Boolean,
  },
  diclosure: {
    type:  Boolean,
  },
  changeTransport: {
    type:  Boolean,
  },
  address: [
    {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      pincode: { type: String },
      landmark: { type: String },
      fulladdress: { type: String },
    },
  ],
  effectiveDate:{
      type:String
  },
},{timestamps:true});

module.exports = mongoose.model("UpdateTransportSchema", UpdateTransportSchema);
