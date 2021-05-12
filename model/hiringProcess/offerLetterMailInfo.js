const mongoose = require('mongoose');

const MailInfoOfferLetter = new mongoose.Schema(
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
    reminderMsg: {
      type: String
    },
    offerLetter: {
      type: String
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model('MailInfoOfferLetter', MailInfoOfferLetter);
