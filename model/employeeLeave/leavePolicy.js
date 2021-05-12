const mongoose = require('mongoose');
const counter = require('../../utils/counter');

const gazettedHolidays = new mongoose.Schema({
  holiday: {
    type: String
  },
  date: {
    type: Date
  },
  dayOfTheWeek: {
    type: String
  }
});

const otherLeaves = new mongoose.Schema({
  casualLeave: {
    type: Number,
    default: 10
  },
  medicalLeave: {
    type: Number,
    default: 5
  },
  earnedLeave: {
    type: Number,
    default: 10
  },
  vacationLeave: {
    type: Number,
    default: 5
  },
  leaveWithoutPay: {
    type: Number
  },
  leaveOnDuty: {
    type: Number
  },
  halfDayLeave: {
    type: Number,
    default: 5
  },
  maternityLeave: {
    type: Number,
    default: 5
  },
  paternityLeave: {
    type: Number,
    default: 5
  }
});

const employeeLeavePolicySchema = new mongoose.Schema(
  {
    _id: String,
    lavePolicyNo: String,
    departmentName: {
      type: String,
      required: true
    },
    role: {
      type: String
    },
    typeOfLeave: {
      type: String,
      enum: ['Gazetted Holidays', 'Other Leaves']
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
    gazettedHolidays: [gazettedHolidays],
    otherLeaves: [otherLeaves],
    deleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// employeeLeavePolicySchema.index(
//   { departmentName: 1, role: 1 },
//   { unique: true }
// );

// employeeLeavePolicySchema.post("save", function (error, doc, next) {
//   if (error.name === "MongoError" && error.code === 11000) {
//     next(new Error("This Department and Role already have a Leave policy."));
//   } else {
//     next(error);
//   }
// });

employeeLeavePolicySchema.pre('save', counter('leavePolicy', 5, 'LP'));

employeeLeavePolicySchema.pre(/^find/, function(next) {
  this.find({ deleted: false });
  next();
});

const employeeLeavePolicyModel = mongoose.model(
  'EmployeeLeavePolicy',
  employeeLeavePolicySchema
);

module.exports = employeeLeavePolicyModel;
