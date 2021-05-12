const mongoose = require('mongoose');
const counter = require('../../utils/counter');

const EducationQualification = new mongoose.Schema({
  degree: {
    type: String,
    required: true
  },
  college: {
    type: String,
    required: true
  },
  university: {
    type: String,
    required: true
  },
  Percentage: {
    type: Number,
    required: true
  },
  yearOfPassing: {
    type: String,
    required: true
  }
});

const ProfessionalQualification = new mongoose.Schema({
  degree: {
    type: String,
    required: true
  },
  college: {
    type: String,
    required: true
  },
  university: {
    type: String,
    required: true
  },
  Percentage: {
    type: Number,
    required: true
  },
  yearOfPassing: {
    type: String,
    required: true
  }
});

const EmployeeDetailsSchema = new mongoose.Schema(
  {
    _id: {
      type: String
    },
    applicationNo: {
      type: String
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
    consent: {
      type: Boolean,
      required: true
    },
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
    offerLetter: {
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
      unique: true
    },
    secondaryContact: {
      type: Number,
      unique: true
    },
    contactRelation: {
      type: String
    },
    educationQualification: [EducationQualification],
    professionalQualification: [ProfessionalQualification],
    statusForInterView: {
      type: String,
      enum: {
        values: ['Call For Interview', 'Hold', 'Not Selected'],
        message:
          'The value for the statusForInterview should be Call For Interview, Hold, Not Selected'
      },
      default: 'Not Selected'
    },
    statusForHiring: {
      type: String,
      enum: ['Hired', 'Not Hired', 'Hold'],
      default: 'Not Hired'
    },
    statusForOfferLetter: {
      type: String,
      enum: ['Accepted', 'Not Accepted'],
      default: 'Not Accepted'
    },
    screeningTestScore: {
      type: Number
    },
    interviewScore: {
      type: Number
    },
    totalScore: {
      type: Number
    },
    department: {
      type: String
    },
    role: {
      type: String
    },
    shortlist: {
      type: String,
      enum: {
        values: ['Shortlisted', 'Not Shortlisted'],
        message: 'The shortlist should be Shortlisted or Not Shortlisted'
      },
      default: 'Not Shortlisted'
    },
    acceptanceOfferLetter: {
      type: String,
      enum: ['Accepted', 'Not Accepted']
    },
    deleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

EmployeeDetailsSchema.pre('save', counter('application', 8));

EmployeeDetailsSchema.pre(/^find/, function(next) {
  this.find({ deleted: false });
  next();
});

module.exports = mongoose.model('EmployeeDetail', EmployeeDetailsSchema);
