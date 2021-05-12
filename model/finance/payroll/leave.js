const mongoose = require('mongoose');

const Leave = new mongoose.Schema({
  staffName: {
    type: String
  },
  leaveType: {
    type: String
  },
  fromDate: {
    type: String
  },
  toDate: {
    type: String
  },
  numberOfDay: {
    type: Number
  },
  status: {
    type: String,
    enum: ['approve', 'reject', 'pending'],
    default: 'pending'
  },
  deleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('LeaveSchema', Leave);
