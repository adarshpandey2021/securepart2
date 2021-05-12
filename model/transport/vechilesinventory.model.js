const mongoose = require("mongoose");

const AddVechileSchema = new mongoose.Schema({
  vechileRegistrationNo: {
    type: String,
  },
  vechileNumber: {
    type: String,
    unique: true,
  },
  vechileType: {
    type: String,
  },
  totalSeat: {
    type: String,
  },
  vechileInsurancePolicyNo: {
    type: String,
  },
  renwableDate: {
    type: String,
  },
  fitnessCertiNo: {
    type: String,
  },
  fitnessValidFrom: {
    type: String,
  },
  fitnessValidTo: {
    type: String,
  },

  pollutionCertiNo: {
    type: String,
  },
  pollutionValidFrom: {
    type: String,
  },
  pollutionValidTo: {
    type: String,
  },
  vechileLastServiceDate: {
    type: String,
  },
  vechileNextServiceDate: {
    type: String,
  },
  uploadPolicy: {
    type: String,
  },
  uploadRCbook: {
    type: String,
  },
  provisionUploadCerti: {
    type: String,
  },
});

const AssignConductorSchema = new mongoose.Schema({
  nameOfConductor: {
    type: String,
  },
  conductorPrimaryNo: {
    type: String,
  },
  conductorSecondaryNo: {
    type: String,
  },
  adharcardConductor: {
    type: Number,
  },
  pancardConductor: {
    type: String,
  },
  uploadIdProof: {
    type: String,
  },
  conductorResidentialAddress: [
    {
      aCresStreet: { type: String },
      aCresCity: { type: String },
      aCresState: { type: String },
      aCresPincode: { type: String },
      aCreslandmark: { type: String },
      aCresCountry: { type: String },
      aCresFulladdress: { type: String },
    },
  ],
  conductorPermanentAddress: [
    {
      aCperStreet: { type: String },
      aCperCity: { type: String },
      aCperState: { type: String },
      aCperPincode: { type: String },
      aCperlandmark: { type: String },
      aCperCountry: { type: String },
      perFulladdress: { type: String },
    },
  ],
});
const AssignDriverSchema = new mongoose.Schema({
  nameOfDriver: {
    type: String,
  },
  drivingLicenseNo: {
    type: String,
  },
  drivingLicenseValid: {
    type: String,
  },
  uploadCopyOfDrivingLicence: {
    type: String,
  },
  uploadMedicalFitnessCerti: {
    type: String,
  },
  primaryContactNoDriver: {
    type: String,
  },
  secondaryContactNoDriver: {
    type: String,
  },
  adharcardDriver: {
    type: Number,
  },
  pancardDriver: {
    type: String,
  },
  driverResidentialAddress: [
    {
      aDresStreet: { type: String },
      aDresCity: { type: String },
      aDresState: { type: String },
      aDresPincode: { type: String },
      aDreslandmark: { type: String },
      aDresCountry: { type: String },
      aDresFulladdress: { type: String },
    },
  ],
  driverPermanentAddress: [
    {
      aDperStreet: { type: String },
      aDperCity: { type: String },
      aDperState: { type: String },
      aDperPincode: { type: String },
      aDperlandmark: { type: String },
      aDperCountry: { type: String },
      aDperFulladdress: { type: String },
    },
  ],
});
const AssignFemaleAsstSchema = new mongoose.Schema({
  nameOfFemaleAsst: {
    type: String,
  },
  femaleAsstPrimaryContactNo: {
    type: String,
  },
  femaleAsstSecondaryContactNo: {
    type: String,
  },
  femaleAsstAdharCard: {
    type: Number,
  },
  femaleAsstPanCard: {
    type: String,
  },
  femaleAsstUploadId: {
    type: String,
  },
  femaleResidentialAddress: [
    {
      aFresStreet: { type: String },
      aFresCity: { type: String },
      aFresState: { type: String },
      aFresPincode: { type: String },
      aFreslandmark: { type: String },
      aFresCountry: { type: String },
      aFresFulladdress: { type: String },
    },
  ],
  femalePermanentAddress: [
    {
      aFperStreet: { type: String },
      aFperCity: { type: String },
      aFperState: { type: String },
      aFperPincode: { type: String },
      aFperlandmark: { type: String },
      aFperCountry: { type: String },
      aFperFulladdress: { type: String },
    },
  ],
});
const OtherFittingSchema = new mongoose.Schema({
  cctv: {
    type: String,
  },
  firstAidBox: {
    type: String,
  },
  fireExtinguisher: {
    type: String,
  },
  fireExtinguisherRefilingDate: {
    type: String,
  },
});
const Stopage = new mongoose.Schema({
  stopageRouteNo: {
    type: String,
  },
  nameOfStop: {
    type: String,
  },
  pickUpTime: {
    type: String,
  },
  dropOfTime: {
    type: String,
  },
  distanceFromSchool: {
    type: String,
  },
});

const RouteNo = new mongoose.Schema({
  startingPoint: {
    type: String,
  },
  endingPonit: {
    type: String,
  },
  nameOfStop: {
    type: String,
  },
  distanceFromSchool: {
    type: String,
  },
});

const VechileInventorySchema = new mongoose.Schema(
  {
    addVechile: [AddVechileSchema],
    assignDriver: [AssignDriverSchema],
    assignConductor: [AssignConductorSchema],
    assignFemaleAssitant: [AssignFemaleAsstSchema],
    other: [OtherFittingSchema],
    routeNo: { type: String },
    stopage: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "VechileInventorySchema",
  VechileInventorySchema
);
