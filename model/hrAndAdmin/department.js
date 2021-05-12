const mongoose = require('mongoose');
// const Counter = require('../employee/counter');

const counter = require('../../utils/counter');

const Approver = new mongoose.Schema({
  leaveApprover: [
    {
      leaveApprove: {
        type: String
      }
    }
  ],
  onDutyApprover: [
    {
      onDutyApprove: {
        type: String
      }
    }
  ]
});

const CreateDepartmentSchema = new mongoose.Schema(
  {
    _id: String,
    departmentNo: {
      type: String
    },
    departmentName: {
      type: String,
      enum: {
        values: ['Academics', 'Admin', 'Transport', 'Support Staff', 'All'],
        message:
          'The department could only be Academics, Admin, Transport, Support Staff, All'
      }
    },
    parentDepartment: {
      type: String
    },
    addCategory: {
      type: String
    },
    leaveBlockList: {
      type: String
    },
    approver: [Approver],
    deleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// const pad = (num, size) => {
//   num = num.toString();
//   while (num.length < size) num = "0" + num;
//   return num;
// };

// CreateDepartmentSchema.pre("save", async function (next) {
//   try {
//     let counter = await Counter.findByIdAndUpdate(
//       { _id: "department" },
//       { $inc: { seq: 1 } },
//       { new: true }
//     );

//     if (!counter) counter = await Counter.create({ _id: "department" });
//     const value = "D" + pad(counter.seq, 4);
//     this._id = value;
//     this.departmentNo = value;
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

CreateDepartmentSchema.pre('save', counter('department', 4));

CreateDepartmentSchema.pre(/^find/, function(next) {
  this.find({ deleted: false });
  next();
});

module.exports = mongoose.model(
  'CreateDepartmentSchema',
  CreateDepartmentSchema
);
