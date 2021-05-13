const mongoose = require('mongoose');
const counter = require('../../../utils/counter');

const SalaryStructureSchema = new mongoose.Schema(
  {
    _id: String,
    salaryStructureNo: String,
    department: {
      type: String,
      enum: ['Academics', 'Admin', 'Transport', 'Support Staff']
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
          'Security Guard'
        ],
        message:
          'Roles must be PPT, PRT, TGT, Sr. TGT, PGT, Sr. PGT, Front Office, Admin, Sr. Administrator, Transport Incharge, Driver, Conductor, Female Assistant, Nanies, Janitors, Peons, Gardner, Security Guard'
      }
    },
    departmentId: {
      type: String,
      ref: 'CreateDepartmentSchema',
      required: true
    },
    roleId: {
      type: String,
      ref: 'CreateRolesSchema',
      required: true
    },
    salaryHead: {
      type: String,
      enum: {
        values: ['Basic', 'HRA', 'DA', 'CCA', 'PF', 'ESIC','PF employee contribute'],
        message:
          'The values of the type should be Basic, HRA, DA, CCA, PF, ESIC,PF employee contribute'
      }
    },
    annualIncrement: {
      type: Number
    },
    monthlyIncrement: {
      type: Number
    },
    amount: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true,
      enum: {
        values: ['Deduction', 'Earning'],
        message: 'The value of the type should be Deduction or Earning'
      }
    },
    deleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);
SalaryStructureSchema.pre('save', counter('salaryStructure', 5, 'SS'));

// SalaryStructureSchema.pre('save', async function(next) {
//   const role = await createrole.findById(this.roleId);

//   if (!role) return nextError(next, 'No role is created for this Id.', 400);

//   if (this.type === 'Earning') role.grossSalary += this.amount;
//   else if (this.type === 'Deduction') role.grossSalary -= this.amount;

//   if (this.salaryHead === 'Basic') role.Basic = this.amount;

//   return next();
// });

SalaryStructureSchema.pre(/^find/, function(next) {
  this.find({ deleted: false });
  next();
});

SalaryStructureSchema.pre('aggregate', function() {
  // Add a $match state to the beginning of each pipeline.
  this.pipeline().unshift({ $match: { deleted: { $ne: true } } });
});

const SalaryStructureModel = mongoose.model(
  'SalaryStructure',
  SalaryStructureSchema
);

module.exports = SalaryStructureModel;
