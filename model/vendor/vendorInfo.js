const mongoose = require('mongoose');
// const Counter = require("../employee/counter")

const counter = require('../../utils/counter');

const address = new mongoose.Schema({
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  },
  nearestLandmark: {
    type: String
  },
  primaryEmail: {
    type: String,
    trim: true,
    lowercase: true
  },
  secondaryEmail: {
    type: String,
    lowercase: true
  },
  primaryContact: {
    type: Number
  },
  secondaryContact: {
    type: Number
  }
});

const vendorInfoSchema = new mongoose.Schema({
  vendorNo: String,
  _id: String,
  vendorCategory: {
    type: String,
  },
  nameOfTheOrganization: {
    type: String
  },
  ownerName: {
    type: String
  },
  address: [address],
  panCardNo: {
    type: Number
  },
  GSTINNo: {
    type: String
  },
  bankNameAndBranch: {
    type: String,
    trim: true
  },
  bankAccountNumber: {
    type: Number
  },
  IFSCCode: {
    type: String
  },
  deleted: {
    type: Boolean,
    default: false
  }
});

// const pad = (num, size) => {
//   num = num.toString();
//   while (num.length < size) num = "0" + num;
//   return num;
// };

// vendorInfoSchema.pre("save", async function (next) {
//   try {
//     let counter = await Counter.findByIdAndUpdate(
//       { _id: "vendor" },
//       { $inc: { seq: 1 } },
//       { new: true }
//     );

//     if (!counter) counter = await Counter.create({ _id: "vendor" });
//     const value = "V" + pad(counter.seq, 5);
//     this._id = value;
//     this.vendorNo = value;
//     next();
//   } catch (err) {
//     next(err);
//   }
// });
// enum: {
//   values: [
//     'House Keeping',
//     'Stationary',
//     'Repair And Maintenance',
//     'Construction',
//     'Pharmaceutical',
//     'Transport'
//   ],
//   message:
//     'The Vendor Category should be House Keeping, Stationary, Repair And Maintenance, Construction, Pharmaceutical, Transport'
// }

vendorInfoSchema.pre('save', counter('vendor', 5));
vendorInfoSchema.pre(/^find/, function(next) {
  this.find({ deleted: false });
  next();
});

module.exports = mongoose.model('vendorInfo', vendorInfoSchema);
