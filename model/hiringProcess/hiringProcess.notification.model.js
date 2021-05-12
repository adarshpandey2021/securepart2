const mongoose = require('mongoose');

const HiringProcessNotificationDetails = new mongoose.Schema(
  {
    department: {
      type: String,
      require: true
    },
    startDate: {
      type: String,
      require: true
    },

    jobProfile: {
      type: String,
      require: true
    },
    lastDate: {
      type: String,
      require: true
    },
    jobDescription: {
      type: String,
      require: true
    },
    skills: {
      type: String,
      require: true
    },
    qualification: {
      type: String,
      require: true
    },
    role: {
      type: String,
      require: true
    },
    deleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

HiringProcessNotificationDetails.pre(/^find/, function(next) {
  this.find({ deleted: false });
  next();
});

module.exports = mongoose.model(
  'HiringProcessNotificationDetails',
  HiringProcessNotificationDetails
);
