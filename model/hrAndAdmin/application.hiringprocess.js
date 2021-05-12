const mongoose = require('mongoose');

const ContactDetails = new mongoose.Schema({
  street1: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  pincode: {
    type: String
  },
  landmark: {
    type: String
  },
  fulladdress: {
    type: String
  },
  primaryEmail: {
    type: String,
    trim: true,
    require: true,
    unique: 1,
    lowercase: true
  },
  secondaryEmail: {
    type: String,
    trim: true,
    require: true,
    unique: 1,
    lowercase: true
  },
  primaryContact: {
    type: Number,
    unique: 1,
    require: true
  },
  secondaryContact: {
    type: Number,
    unique: 1,
    require: true
  },
  tertiaryContact: {
    type: Number,
    unique: 1,
    require: true
  },
  contactRelation: {
    type: String
  }
});

const ApplicationFormSchema = new mongoose.Schema({
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
  fullname: {
    type: String
  },
  gender: {
    type: String,
    require: true
  },
  bloodGroup: {
    type: String
  },
  dateOfBirth: {
    type: String,
    require: true
  },
  nationality: {
    type: String
  },
  contactDetails: [ContactDetails],
  uploadCv: {
    type: String
  },
  uploadPhoto: {
    type: String
  }
});

ApplicationFormSchema.pre(/^find/, function(next) {
  this.find({ deleted: false });
  next();
});

module.exports = mongoose.model('ApplicationFormSchema', ApplicationFormSchema);
