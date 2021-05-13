/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
// const catchAsync = require('../../../utils/catchAsync');
const counter = require('../../../utils/counter');
// const logger = require('../../../utils/logger');
const Employee = require('../../employee/employeeModel');

const salaryHeads = new mongoose.Schema({
  _id: {
    type: String,
    ref: 'SalaryStructure',
    required: true
  },
  salaryHead: {
    type: String,
    required: true
  }
});

const AssignSalaryStructureSchema = new mongoose.Schema(
  {
    _id: String,
    assignSalaryNo: String,
    employeeId: {
      type: String
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
    employee: {
      type: String,
      ref: 'CreateEmployee',
      required: true
    },
    employeeName: {
      type: String
    },
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
    salaryHeads: [salaryHeads],
    monthEffectiveFrom: {
      type: Date,
      required: true
    },
    bankNameAndBranch: {
      type: String
    },
    bankAccountNo: {
      type: Number
    },
    IFSCCode: {
      type: String
    },
    grossSalary: {
      type: Number
    },
    monthlyGross:{
      type: Number
    },
    deleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

AssignSalaryStructureSchema.pre('save', counter('assignSalary', 8, 'SL'));

AssignSalaryStructureSchema.pre(
  /find(?:ById(?:AndUpdate)?|One(?:AndUpdate)?)/,
  function(next) {
    this.populate({
      path: 'salaryHeads._id'
    });
    return next();
  }
);


AssignSalaryStructureSchema.post(
  /find(?:ById(?:AndUpdate)?|One(?:AndUpdate)?)|save/,
  async function(doc, next) {
    let grossSalary = 0;
    let monthlyGross = 0;
    // const { employee } = doc;
    if (doc) {
      doc.grossSalary = 0;
      doc.monthlyGross = 0;
      doc.salaryHeads.forEach(salary => {
        if (salary._id)
          if (salary._id.type === 'Deduction'){
            doc.grossSalary -= salary._id.amount;
          }
          else if (salary._id.type === 'Earning'){
            doc.monthlyGross += salary._id.amount
            doc.grossSalary += salary._id.amount;
          }
      });
      // console.log(doc.grossSalary);
      // eslint-disable-next-line prefer-destructuring
      grossSalary = doc.grossSalary;
      // eslint-disable-next-line prefer-destructuring
      monthlyGross = doc.monthlyGross;
    }
    next();
    if (grossSalary > 0) {
      const employee = await Employee.findById(doc.employee);
      employee.grossSalary = grossSalary;
      employee.monthlyGross = monthlyGross;
      employee.isSalaryAssigned = true;
      await employee.save();
      // console.log(employee.grossSalary);
    }
  }
);

AssignSalaryStructureSchema.pre(/^find/, function(next) {
  this.find({ deleted: false });
  next();
});

// AssignSalaryStructureSchema.post(/find(?:ById|One)/, async function(doc, next) {
//   let grossSalary = 0;
//   // const { employee } = doc;
//   if (doc) {
//     doc.grossSalary = 0;
//     doc.salaryHeads.forEach(salary => {
//       if (salary._id)
//         if (salary._id.type === 'Deduction')
//           doc.grossSalary -= salary._id.amount;
//         else if (salary._id.type === 'Earning')
//           doc.grossSalary += salary._id.amount;
//     });
//     // console.log(doc.grossSalary);
//     // eslint-disable-next-line prefer-destructuring
//     grossSalary = doc.grossSalary;
//   }
//   next();
//   if (grossSalary > 0) {
//     const employee = await Employee.findById(doc.employee);
//     employee.grossSalary = grossSalary;
//     await employee.save();
//     // console.log(employee.grossSalary);
//   }
// });

module.exports = mongoose.model(
  'AssignSalaryStructure',
  AssignSalaryStructureSchema
);
