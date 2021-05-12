const mongoose = require('mongoose');
const counter = require('../../utils/counter');

const earlyAndLateDeparture = new mongoose.Schema(
  {
    employeeId: {
      type: String
    },
    _id:{
      type:String
    },
    earlyLateLeaveNo:{
      type:String
    },
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
      type: String,
      enum: ['Late Arrival', 'Early Departure']
    },
    description: {
      type: String
    },
    arrivalOrDepartureTime: {
      type: Date
    },
    status: {
      type: String,
      enum: ['Approved', 'Not Approved'],
      default: 'Not Approved'
    },
    deleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

earlyAndLateDeparture.pre('save', counter('earlyLateLeave',8,'EAL'));

earlyAndLateDeparture.pre(/^find/, function(next) {
  this.find({ deleted: false });
  next();
});

const earlyAndLateDepartureModel = mongoose.model(
  'EarlyAndDeparture',
  earlyAndLateDeparture
);

module.exports = earlyAndLateDepartureModel;
