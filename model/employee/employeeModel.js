const mongoose = require('mongoose');

const joiningDetails = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true
  },
  dateOfJoining: {
    type: String,
    required: true
  },
  confirmationDate: {
    type: String,
    required: true
  },
  noticePeriod: {
    type: String,
    required: true
  },
  dateOfRetirement: {
    type: String,
    required: true
  }
});

const workingDetails = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true
  },
  department: {
    type: String,
    ref: 'CreateDepartmentSchema'
  },
  departmentName: {
    type: String,
    required: true
  },
  roleId: {
    type: String,
    ref: 'CreateRolesSchema'
  },
  role: {
    type: String,
    required: true
  },
  workingHours: {
    type: Number,
    required: true
  },
  workingEmailId: {
    type: String,
    required: true
  },
  workingMobileNo: {
    type: String,
    required: true
  },
  workingPhoneNo: {
    type: String,
    required: true
  }
});

const familyDetails = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  relation: {
    type: String,
    enum: ['Father', 'Mother', 'Spouse', 'Husband', 'Son', 'Daughter'],
    required: true
  },
  contactNo: {
    type: String,
    required: true
  }
});

const contactDetails = new mongoose.Schema({
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  },
  nearestLandmark: {
    type: String
  },
  photo: {
    type: String
  },
  Cv: {
    type: String
  },
  primaryEmail: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true
  },
  secondaryEmail: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true
  },
  primaryContact: {
    type: Number,
    unique: true,
    required: true
  },
  secondaryContact: {
    type: Number,
    unique: true
  },
  emergencyContact: {
    type: Number,
    unique: true
  },
  relation: {
    type: String
  }
});

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

const takenLeaves = new mongoose.Schema({
  casualLeave: {
    type: Number,
    default: 0
  },
  medicalLeave: {
    type: Number,
    default: 0
  },
  earnedLeave: {
    type: Number,
    default: 0
  },
  vacationLeave: {
    type: Number,
    default: 0
  },
  leaveWithoutPay: {
    type: Number,
    default: 0
  },
  leaveOnDuty: {
    type: Number,
    default: 0
  },
  halfDayLeave: {
    type: Number,
    default: 0
  },
  maternityLeave: {
    type: Number,
    default: 0
  },
  paternityLeave: {
    type: Number,
    default: 0
  },
  forYear: {
    type: Number
  }
});

const createEmployeeSchema = new mongoose.Schema(
  {
    _id: { type: String },
    employeeId: {
      type: String,
      required: true
    },
    department: {
      type: String,
      ref: 'CreateDepartmentSchema',
      required: true
    },
    roleId: {
      type: String,
      ref: 'CreateRolesSchema',
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    middleName: {
      type: String
    },
    lastName: {
      type: String,
      required: true
    },
    bloodGroup: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    dateOfBirth: {
      type: String,
      required: true
    },
    nationality: {
      type: String,
      required: true
    },
    deleted: {
      type: Boolean,
      default: false
    },
    paidLeavesThisMonth: {
      month: {
        type: Date,
        default: new Date()
      },
      noOfDays: {
        type: Number,
        default: 0
      }
    },
    unPaidLeavesThisMonth: {
      month: {
        type: Date,
        default: new Date()
      },
      noOfDays: {
        type: Number,
        default: 0
      }
    },
    halfPaidLeavesThisMonth: {
      month: {
        type: Date,
        default: new Date()
      },
      noOfDays: {
        type: Number,
        default: 0
      }
    },
    grossSalary: {
      type: Number,
      default: 0
    },
    salaryPaid: {
      _id: {
        type: String,
        ref: 'SalaryPayment'
      },
      paidOn: {
        type: Date
      },
      amount: {
        type: Number
      }
    },
    joiningDetails: [joiningDetails],
    workingDetails: [workingDetails],
    familyDetails: [familyDetails],
    contactDetails: [contactDetails],
    bankDetails: [bankDetails],
    takenLeaves: [takenLeaves]
  },
  { timestamps: true }
);

// createEmployeeSchema.post("save", function (error, doc, next) {
//   if (error.name === "MongoError" && error.code === 11000) {
//     next(new Error("This employee id is already registered."));
//   } else {
//     next(error);
//   }
// });

createEmployeeSchema.index({ employeeId: 1, type: -1 });

createEmployeeSchema.pre('save', function(next) {
  // eslint-disable-next-line no-underscore-dangle
  this._id = this.employeeId;
  next();
});

createEmployeeSchema.pre(/^find/, function(next) {
  this.find({ deleted: false });
  next();
});

const Employee = mongoose.model('CreateEmployee', createEmployeeSchema);

module.exports = Employee;
