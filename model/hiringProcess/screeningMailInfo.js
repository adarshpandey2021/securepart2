const mongoose = require('mongoose');

const MailInfoScreening = new mongoose.Schema(
  {
    applicationNo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EmployeeDetail',
      unique: true
    },
    departmentName: {
      type: String
    },
    role: {
      type: String
    },
    vacantPosition: {
      type: Number
    },
    screeningDate: {
      type: String
    },
    screeningTime: {
      type: String
    },
    reminderMsg: {
      type: String
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model('MailInfoScreening', MailInfoScreening);
