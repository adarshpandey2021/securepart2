const mongoose = require('mongoose');

// const { Schema } = mongoose;

const monthlyAttendanceSchema = new mongoose.Schema(
  {
    employee: {
      type: String,
      ref: 'CreateEmployee',
      required: true
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
    month: {
      type: Number
    },
    year: {
      type: Number
    },
    totalNoOfWorkingDays: {
      type: Number
    },
    noOfSundays: {
      type: Number
    },
    noOfHolidays: {
      type: Number
    },
    noOfLeaves: {
      type: Number
    },
    leavesWithoutPay: {
      type: Number
    },
    actualWorkingDays: {
      type: Number
    },
    deleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

monthlyAttendanceSchema.pre(/^find/, function(next) {
  this.find({ deleted: false });
  next();
});

monthlyAttendanceSchema.pre('aggregate', function() {
  // Add a $match state to the beginning of each pipeline.
  this.pipeline().unshift({ $match: { deleted: { $ne: true } } });
});

module.exports = mongoose.model('monthlyAttendance', monthlyAttendanceSchema);
