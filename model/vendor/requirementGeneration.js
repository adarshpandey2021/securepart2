const mongoose = require('mongoose');
// const Counter = require('../employee/counter');

const counter = require('../../utils/counter');

const requirementSchema = new mongoose.Schema(
  {
    _id: { type: String },
    requirementNo: {
      type: 'String'
    },
    category: {
      type: String
    },
    purpose: {
      type: String
    },
    itemName: {
      type: String
    },
    quantity: {
      type: String
    },
    expectedDate: {
      type: Date
    },
    lastDate: {
      type: Date
    },
    status: {
      type: String,
      enum: {
        values: ['Reject', 'Approve', 'Modify And Approve'],
        message:
          'The value of the action should be Reject, Approve, Modify And Approve'
      }
    },
    deleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

requirementSchema.pre('save', counter('requirement', 8, 'P'));

// const pad = (num, size) => {
//   num = num.toString();
//   while (num.length < size) num = "0" + num;
//   return num;
// };

// requirementSchema.pre("save", async function (next) {
//   try {
//     let counter = await Counter.findByIdAndUpdate(
//       { _id: "requirement" },
//       { $inc: { seq: 1 } },
//       { new: true }
//     );

//     if (!counter) counter = await Counter.create({ _id: "requirement" });
//     const value = "P" + pad(counter.seq, 8);
//     this._id = value;
//     this.requirementNo = value;
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

requirementSchema.pre(/^find/, function(next) {
  this.find({ deleted: false });
  next();
});

module.exports = mongoose.model('requirementGeneration', requirementSchema);
