const mongoose = require('mongoose');

const MailInfoInterview = new mongoose.Schema(
  {
    applicationNo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EmployeeDetail',
      unique: true
    },
    interviewDate: {
      type: String
    },
    interviewTime: {
      type: String
    },
    reminderMsg: {
      type: String
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model('MailInfoInterview', MailInfoInterview);
