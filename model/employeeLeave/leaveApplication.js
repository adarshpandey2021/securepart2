const mongoose = require('mongoose');
const counter = require('../../utils/counter');

const { Schema } = mongoose;

const employeeLeaveApplication = new Schema(
  {
    _id: {
      type: String
    },
    leaveApplicationNo: {
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
    departmentName: {
      type: String
    },
    role: {
      type: String
    },
    typeOfLeave: {
      type: String
    },
    noOfDays: {
      type: Number
    },
    reason: {
      type: String
    },
    majorTasks: {
      type: String
    },
    contactNo: {
      type: String
    },
    status: {
      type: String,
      enum: ['Approved', 'Not Approved'],
      default: 'Not Approved'
    },
    fromDate: {
      type: Date,
      required: true
    },
    toDate: {
      type: Date
    },
    deleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// employeeLeaveApplication.index(
//   {employeeId:1 , typeOfLeave: 1, deleted:1},
//   {unique:true}
// )

// employeeLeavePolicySchema.index(
//   { departmentName: 1, role: 1 },
//   { unique: true }
// );

employeeLeaveApplication.pre('save', counter('leaveApplication', 8, 'LA'));

employeeLeaveApplication.pre(/^find/, function(next) {
  this.find({ deleted: false });
  next();
});

const employeeLeaveApplicationModel = mongoose.model(
  'EmployeeLeaveApplication',
  employeeLeaveApplication
);

module.exports = employeeLeaveApplicationModel;
