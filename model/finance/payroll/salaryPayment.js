const mongoose = require('mongoose');
const counter = require('../../../utils/counter');
const nextError = require('../../../utils/nextError');
const Employee = require('../../employee/employeeModel');

const bankDetails = new mongoose.Schema({
  bankAccountNo: {
    type: Number,
    required: true
  },
  bankNameAndBranch: {
    type: String,
    required: true
  },
  IFSCCode: {
    type: String,
    required: true
  }
});

const SalaryPayment = new mongoose.Schema(
  {
    _id: String,
    salaryPaymentNo: String,
    employeeId: {
      type: String
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
    totalWorkingDays: {
      type: Number
    },
    actualWorkingDays: {
      type: Number
    },
    dateOfPayment: {
      type: Date
    },
    remark: {
      type: String
    },
    grossSalary: {
      type: Number
    },
    deleted: {
      type: Boolean,
      default: false
    },
    month: {
      type: Date
    },
    isPaid: {
      type: Boolean,
      default: false
    },
    unPaidLeavesThisMonth: {
      type: Number,
      default: 0
    },
    halfPaidLeavesThisMonth: {
      type: Number,
      default: 0
    },
    paidLeavesThisMonth: {
      type: Number,
      default: 0
    },
    bankDetails: [bankDetails]
  },
  { timestamps: true }
);

SalaryPayment.pre('save', counter('salaryPayment', 8, 'SP'));

SalaryPayment.pre('save', async function(next) {
  const employee = await Employee.findById(this.employee);
  if (!employee) nextError(next, 'No Employee is available for this Id', 400);
  return next();
});

SalaryPayment.pre(/^find/, function(next) {
  this.find({ deleted: false });
  next();
});

SalaryPayment.post('save', async function(doc, next) {
  next();
  const employee = await Employee.findById(doc.employee);
  employee.salaryPaid = {
    _id: doc._id,
    paidOn: doc.dateOfPayment,
    amount: doc.grossSalary
  };
  employee.save();
});

module.exports = mongoose.model('SalaryPayment', SalaryPayment);
