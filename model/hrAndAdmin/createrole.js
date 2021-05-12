const mongoose = require('mongoose');
// const { Schema } = require('mongoose');
// const Counter = require('../employee/counter');

const counter = require('../../utils/counter');

const CreateRolesSchema = new mongoose.Schema(
  {
    _id: String,
    roleNo: String,
    department: {
      type: String,
      ref: 'CreateDepartmentSchema',
      required: true
    },
    departmentName: {
      type: String
    },
    role: {
      type: String,
      enum: {
        values: [
          'PPT',
          'PRT',
          'TGT',
          'Sr. TGT',
          'PGT',
          'Sr. PGT',
          'Front Office',
          'Admin',
          'Sr. Administrator',
          'Transport Incharge',
          'Driver',
          'Conductor',
          'Female Assistant',
          'Nanies',
          'Janitors',
          'Peons',
          'Gardner',
          'Security Guard',
          'All'
        ],
        message:
          'Roles must be PPT, PRT, TGT, Sr. TGT, PGT, Sr. PGT, Front Office, Admin, Sr. Administrator, Transport Incharge, Driver, Conductor, Female Assistant, Nanies, Janitors, Peons, Gardner, Security Guard, All'
      }
    },
    description: {
      type: String
    },
    academicqualification: [
      {
        qualification: {
          type: String
        }
      }
    ],
    requiredSkill: [
      {
        skill: {
          type: String
        }
      }
    ],
    digitalCompetence: [
      {
        digitalCompetence: {
          type: String
        }
      }
    ],
    deleted: {
      type: Boolean,
      default: false
    },
    grossSalary: {
      type: Number
    },
    basic: {
      type: Number
    }
  },
  { timestamps: true }
);

// const pad = (num, size) => {
//   num = num.toString();
//   while (num.length < size) num = "0" + num;
//   return num;
// };

// CreateRolesSchema.pre("save", async function (next) {
//   try {
//     let counter = await Counter.findByIdAndUpdate(
//       { _id: "role" },
//       { $inc: { seq: 1 } },
//       { new: true }
//     );

//     if (!counter) counter = await Counter.create({ _id: "role" });
//     const value = "R" + pad(counter.seq, 5);
//     this._id = value;
//     this.roleNo = value;
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

CreateRolesSchema.pre('save', counter('role', 5));

CreateRolesSchema.pre(/^find/, function(next) {
  this.find({ deleted: false });
  next();
});

module.exports = mongoose.model('CreateRolesSchema', CreateRolesSchema);
