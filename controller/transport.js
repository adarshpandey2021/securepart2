const VechileInventorySchema = require("../model/transport/vechilesinventory.model");
const CreateRouteSchema = require("../model/transport/createroute");
const ApplicantSchema = require("../model/admission/registerationForm");
const LogBookSchema = require("../model/transport/logbook");
const VechileMaintenanceSchema = require("../model/transport/vechilemaintence");
const UpdateTransportSchema = require("../model/transport/updatetransportfacility");
const AddVechileSchema = require("../model/transport/vechileinventory/addvechile");
const AssignDriverSchema = require("../model/transport/vechileinventory/assigndriverschema");
const AssignConductorSchema = require("../model/transport/vechileinventory/assignConductor");
const AssignFemaleAssttSchema = require("../model/transport/vechileinventory/assignfemaleAssitant");
const OtherFittingSchema = require("../model/transport/vechileinventory/otherFitting");
const GenerateRouteNumberSchema = require("../model/transport/vechileinventory/generaterouteNo");
const StopageSchema = require("../model/transport/vechileinventory/createStopage");
const DriverLogBooKSchema = require("../model/transport/vechileinventory/createDriverLog");
const ConductorLogBooKSchema = require("../model/transport/vechileinventory/createConductorLog");
const TripNumberSchema = require("../model/transport/vechileinventory/showtripno");
exports.GetVechileInventory = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);
    const findData = await VechileInventorySchema.find({})
      .skip((page - 1) * size)
      .limit(size)
      .sort({ _id: -1 });
    if (findData) {
      return res.json({ data: findData });
    } else if (findData.length === 0) {
      return res.json("0 list");
    } else {
      return res.json("Oops! an error occurr");
    }
  } catch (e) {
    return next(e);
  }
};

exports.VechileInventory = async (req, res, next) => {
  const {
    addVechile,
    nameOfDriver,
    drivingLicenseNo,
    drivingLicenseValid,
    uploadCopyOfDrivingLicence,
    uploadMedicalFitnessCerti,
    primaryContactNoDriver,
    secondaryContactNoDriver,
    adharcardDriver,
    pancardDriver,
    aDresStreet,
    aDresCity,
    aDresState,
    aDresPincode,
    aDreslandmark,
    aDresCountry,
    aDperStreet,
    aDperCity,
    aDperState,
    aDperPincode,
    aDperlandmark,
    aDperCountry,
    nameOfConductor,
    conductorPrimaryNo,
    conductorSecondaryNo,
    adharcardConductor,
    uploadIdProof,
    pancardConductor,
    aCresStreet,
    aCresCity,
    aCresState,
    aCresPincode,
    aCreslandmark,
    aCresCountry,
    aCperStreet,
    aCperCity,
    aCperState,
    aCperPincode,
    aCperlandmark,
    aCperCountry,
    nameOfFemaleAsst,
    femaleAsstPrimaryContactNo,
    femaleAsstSecondaryContactNo,
    femaleAsstAdharCard,
    femaleAsstPanCard,
    femaleAsstUploadId,
    aFresStreet,
    aFresCity,
    aFresState,
    aFresPincode,
    aFreslandmark,
    aFresCountry,
    aFperStreet,
    aFperCity,
    aFperState,
    aFperPincode,
    aFperlandmark,
    aFperCountry,
    cctv,
    firstAidBox,
    fireExtinguisher,
    fireExtinguisherRefilingDate,
  } = req.body;

  const product = await new VechileInventorySchema({
    addVechile,
    assignDriver: [
      {
        nameOfDriver,
        drivingLicenseNo,
        drivingLicenseValid,
        uploadCopyOfDrivingLicence,
        uploadMedicalFitnessCerti,
        primaryContactNoDriver,
        secondaryContactNoDriver,
        adharcardDriver,
        pancardDriver,
        driverResidentialAddress: [
          {
            aDresStreet,
            aDresCity,
            aDresState,
            aDresPincode,
            aDreslandmark,
            aDresCountry,
          },
        ],
        driverPermanentAddress: [
          {
            aDperStreet,
            aDperCity,
            aDperState,
            aDperPincode,
            aDperlandmark,
            aDperCountry,
          },
        ],
      },
    ],
    assignConductor: [
      {
        nameOfConductor,
        conductorPrimaryNo,
        conductorSecondaryNo,
        adharcardConductor,
        uploadIdProof,
        pancardConductor,
        conductorResidentialAddress: [
          {
            aCresStreet,
            aCresCity,
            aCresState,
            aCresPincode,
            aCreslandmark,
            aCresCountry,
          },
        ],
        conductorPermanentAddress: [
          {
            aCperStreet,
            aCperCity,
            aCperState,
            aCperPincode,
            aCperlandmark,
            aCperCountry,
          },
        ],
      },
    ],
    assignFemaleAssitant: [
      {
        nameOfFemaleAsst,
        femaleAsstPrimaryContactNo,
        femaleAsstSecondaryContactNo,
        femaleAsstAdharCard,
        femaleAsstPanCard,
        femaleAsstUploadId,
        femaleResidentialAddress: [
          {
            aFresStreet,
            aFresCity,
            aFresState,
            aFresPincode,
            aFreslandmark,
            aFresCountry,
          },
        ],
        femalePermanentAddress: [
          {
            aFperStreet,
            aFperCity,
            aFperState,
            aFperPincode,
            aFperlandmark,
            aFperCountry,
          },
        ],
      },
    ],
    other: [
      { cctv, firstAidBox, fireExtinguisher, fireExtinguisherRefilingDate },
    ],
  });
  product.save((err, d) => {
    if (err) {
      return res.json({ message: { err }, data: {}, status: false });
    }
    return res.json({
      data: d,
      status: true,
      message: " Vechile Inventory  is Added Successfully",
    });
  });
};

//////////////addd vechile

exports.AddVechile = async (req, res, next) => {
  const {
    vechileRegistrationNo,
    vechileType,
    totalSeat,
    vechileInsurancePolicyNo,
    renwableDate,
    fitnessCertiNo,
    fitnessValidFrom,
    fitnessValidTo,
    pollutionCertiNo,
    pollutionValidFrom,
    pollutionValidTo,
    vechileLastServiceDate,
    vechileNextServiceDate,
    upload,
  } = req.body;

  let newdata = await new AddVechileSchema({
    vechileRegistrationNo,
    vechileType,
    totalSeat,
    vechileInsurancePolicyNo,
    renwableDate,
    fitnessCertiNo,
    fitnessValidFrom,
    fitnessValidTo,
    pollutionCertiNo,
    pollutionValidFrom,
    pollutionValidTo,
    vechileLastServiceDate,
    vechileNextServiceDate,
    upload,
  });
  newdata.save((data, err) => {
    if (err) {
      return res.json({ message: { err }, data: {}, status: false });
    }

    return res.json({
      data: {
        vechileRegistrationNo,
        vechileType,
        totalSeat,
        vechileInsurancePolicyNo,
        renwableDate,
        fitnessCertiNo,
        fitnessValidFrom,
        fitnessValidTo,
        pollutionCertiNo,
        pollutionValidFrom,
        pollutionValidTo,
        vechileLastServiceDate,
        vechileNextServiceDate,
        upload,
      },
      status: true,
      message: "Vechile is Added Successfully",
    });
  });
};

exports.GetVechileInfo = async (req, res, next) => {
  try {
    const findData = await AddVechileSchema.find({});
    if (findData) {
      return res.json({ data: findData });
    } else if (findData.length === 0) {
      return res.json("0 list");
    } else {
      return res.json("Oops! an error occurr");
    }
  } catch (e) {
    return next(e);
  }
};

exports.AssignDriver = async (req, res, next) => {
  const {
    nameOfDriver,
    drivingLicenseNo,
    drivingLicenseValid,
    primaryContactNoDriver,
    secondaryContactNoDriver,
    uploadCopyOfDrivingLicence,
    uploadMedicalFitnessCerti,
    adharcardDriver,
    pancardDriver,
    driverResidentialAddress,
    driverPermanentAddress,
  } = req.body;

  let newdata = await new AssignDriverSchema({
    nameOfDriver,
    drivingLicenseNo,
    drivingLicenseValid,
    primaryContactNoDriver,
    secondaryContactNoDriver,
    uploadCopyOfDrivingLicence,
    uploadMedicalFitnessCerti,
    adharcardDriver,
    pancardDriver,
    driverResidentialAddress,
    driverPermanentAddress,
  });
  newdata.save((data, err) => {
    if (err) {
      return res.json({ message: { err }, data: {}, status: false });
    }

    return res.json({
      data: {
        nameOfDriver,
        drivingLicenseNo,
        drivingLicenseValid,
        primaryContactNoDriver,
        secondaryContactNoDriver,
        uploadCopyOfDrivingLicence,
        uploadMedicalFitnessCerti,
        adharcardDriver,
        pancardDriver,
        driverResidentialAddress,
        driverPermanentAddress,
      },
      status: true,
      message: "Assigning Driver  is Added Successfully",
    });
  });
};

exports.GetDriverInfo = async (req, res, next) => {
  try {
    const findData = await AssignDriverSchema.find({});
    if (findData) {
      return res.json({ data: findData });
    } else if (findData.length === 0) {
      return res.json("0 list");
    } else {
      return res.json("Oops! an error occurr");
    }
  } catch (e) {
    return next(e);
  }
};

exports.AssignConductor = async (req, res, next) => {
  const {
    nameOfConductor,
    conductorPrimaryNo,
    conductorSecondaryNo,
    adharcardConductor,
    uploadIdProof,
    pancardConductor,
    conductorResidentialAddress,
    conductorPermanentAddress,
  } = req.body;

  let newdata = await new AssignConductorSchema({
    nameOfConductor,
    conductorPrimaryNo,
    conductorSecondaryNo,
    adharcardConductor,
    uploadIdProof,
    pancardConductor,
    conductorResidentialAddress,
    conductorPermanentAddress,
  });
  newdata.save((data, err) => {
    if (err) {
      return res.json({ message: { err }, data: {}, status: false });
    }

    return res.json({
      data: {
        nameOfConductor,
        conductorPrimaryNo,
        conductorSecondaryNo,
        adharcardConductor,
        uploadIdProof,
        pancardConductor,
        conductorResidentialAddress,
        conductorPermanentAddress,
      },
      status: true,
      message: { err },
      message: "Assigning Conductor  is Added Successfully",
    });
  });
};

exports.GetConductorInfo = async (req, res, next) => {
  try {
    const findData = await AssignConductorSchema.find({});
    if (findData) {
      return res.json({ data: findData });
    } else if (findData.length === 0) {
      return res.json("0 list");
    } else {
      return res.json("Oops! an error occurr");
    }
  } catch (e) {
    return next(e);
  }
};

exports.AssignFemaleAsstt = async (req, res, next) => {
  const {
    nameOfFemaleAsst,
    femaleAsstPrimaryContactNo,
    femaleAsstSecondaryContactNo,
    femaleAsstAdharCard,
    femaleAsstPanCard,
    femaleAsstUploadId,
    femaleResidentialAddress,
    femalePermanentAddress,
  } = req.body;

  let newdata = await new AssignFemaleAssttSchema({
    nameOfFemaleAsst,
    femaleAsstPrimaryContactNo,
    femaleAsstSecondaryContactNo,
    femaleAsstAdharCard,
    femaleAsstPanCard,
    femaleAsstUploadId,
    femaleResidentialAddress,
    femalePermanentAddress,
  });
  newdata.save((data, err) => {
    if (err) {
      return res.json({ message: { err }, data: {}, status: false });
    }

    return res.json({
      data: {
        nameOfFemaleAsst,
        femaleAsstPrimaryContactNo,
        femaleAsstSecondaryContactNo,
        femaleAsstAdharCard,
        femaleAsstPanCard,
        femaleAsstUploadId,
        femaleResidentialAddress,
        femalePermanentAddress,
      },
      status: true,
      message: "Assigning Female Assitance os Done",
    });
  });
};

exports.GetFemaleAsstInfo = async (req, res, next) => {
  try {
    const findData = await AssignFemaleAssttSchema.find({});
    if (findData) {
      return res.json({ data: findData });
    } else if (findData.length === 0) {
      return res.json("0 list");
    } else {
      return res.json("Oops! an error occurr");
    }
  } catch (e) {
    return next(e);
  }
};

exports.AddOtherFitting = async (req, res, next) => {
  const {
    cctv,
    firstAidBox,
    fireExtinguisher,
    fireExtinguisherRefilingDate,
  } = req.body;

  let newdata = await new OtherFittingSchema({
    cctv,
    firstAidBox,
    fireExtinguisher,
    fireExtinguisherRefilingDate,
  });
  newdata.save((data, err) => {
    if (err) {
      return res.json({ message: { err }, data: {}, status: false });
    }

    return res.json({
      data: {
        cctv,
        firstAidBox,
        fireExtinguisher,
        fireExtinguisherRefilingDate,
      },
      status: true,
      message: "Other fitting and Texture is Added",
    });
  });
};

exports.GetOtherFittingInfo = async (req, res, next) => {
  try {
    const findData = await OtherFittingSchema.find({});
    if (findData) {
      return res.json({ data: findData });
    } else if (findData.length === 0) {
      return res.json("0 list");
    } else {
      return res.json("Oops! an error occurr");
    }
  } catch (e) {
    return next(e);
  }
};

exports.GetVechileNumber = async (req, res, next) => {
  try {
    let type = req.query.vechileType;

    let find_data = await VechileInventorySchema.find({
      "addVechile.vechileType": type,
    }).select("addVechile.vechileNumber");

    if (find_data) {
      return res.json({ data: find_data });
    } else if (find_data.length === 0) {
      return res.json("0 list");
    } else {
      return res.json("Oops! an error occurr");
    }
  } catch (e) {
    return next(e);
  }
};

/////////////////////

/////New Create Routes
exports.RouteAddittion = async (req, res, next) => {
  try {
    let id = req.params.id;
    const { routeNo, stopage } = req.body;
    let finddata = await await VechileInventorySchema.find({
      "addVechile.routeNo": routeNo,
    });

    let find_data = await VechileInventorySchema.findOne({
      "addVechile.vechileNumber": id,
    });
    find_data.routeNo = routeNo;
    find_data.stopage = stopage;
    find_data.save((err, data) => {
      if (err) {
        return res.json({
          status: false,
          message: err,
        });
      }
      return res.json({
        data: data,
        message: `Route is Added to vechile number ${id}`,
        status: true,
      });
    });
  } catch (e) {
    return console.log(e);
  }
};

////Generate routeno.

exports.GenerateRouteNumber = async (req, res, next) => {
  const { routeNo, startingPoint, endingPonit } = req.body;
  let find_data = await GenerateRouteNumberSchema.find({});
  let newdata = await new GenerateRouteNumberSchema({
    startingPoint,
    endingPonit,
    routeNo,
  });

  newdata.save((err, data) => {
    if (err) {
      return res.json({
        status: false,
        message: err,
      });
    }
    return res.json({
      data: data,
      message: `Route number is ${routeNo}`,
      status: true,
    });
  });
};

exports.GetRouteNumber = async (req, res, next) => {
  try {
    const findData = await GenerateRouteNumberSchema.find({});
    if (findData) {
      return res.json({ data: findData });
    } else if (findData.length === 0) {
      return res.json("0 list");
    } else {
      return res.json("Oops! an error occurr");
    }
  } catch (e) {
    return next(e);
  }
};

exports.CreateRouteStopage = async (req, res, next) => {
  const {
    routeNo,
    nameOfStop,
    pickUpTime,
    dropOfTime,
    distanceFromSchool,
  } = req.body;
  let data = await StopageSchema.find({});
  let newdata = await new StopageSchema({
    routeNo,
    nameOfStop,
    pickUpTime,
    dropOfTime,
    distanceFromSchool,
    stopageName: nameOfStop,
  });
  newdata.save((err, data) => {
    if (err) {
      return res.json({
        status: false,
        message: err,
      });
    }
    return res.json({
      data: data,
      message: ` Stop Route number is ${nameOfStop}`,
      status: true,
    });
  });
};

exports.GetStopRouteNumber = async (req, res, next) => {
  try {
    const findData = await StopageSchema.find({});
    if (findData) {
      return res.json({ data: findData });
    } else if (findData.length === 0) {
      return res.json("0 list");
    } else {
      return res.json("Oops! an error occurr");
    }
  } catch (e) {
    return next(e);
  }
};

exports.GetStoppageNameByRouteno = async (req, res, next) => {
  try {
    let find = req.query.routeNo;
    const findData = await StopageSchema.find({ routeNo: find });
    if (findData) {
      return res.json({ data: findData });
    } else if (findData.length === 0) {
      return res.json("0 list");
    } else {
      return res.json("Oops! an error occurr");
    }
  } catch (e) {
    return next(e);
  }
};

/////////create routes
exports.CreateRoute = (req, res, next) => {
  const {
    routeNo,
    vechileType,
    vechicleNo,
    driverName,
    conductorName,
    femaleAsstName,
    stopageRouteNo,
    nameOfStop,
    pickUpTime,
    dropOfTime,
    distanceFromSchool,
  } = req.body;

  let newdata = new CreateRouteSchema({
    routeNo,
    vechileType,
    vechicleNo,
    driverName,
    conductorName,
    femaleAsstName,
    stopage: [
      {
        stopageRouteNo,
        nameOfStop,
        pickUpTime,
        dropOfTime,
        distanceFromSchool,
      },
    ],
  });
  newdata.save((data, err) => {
    if (err) return console.log(err);

    return res.json({
      msg: "Route is Added.",
    });
  });
};
exports.GetRoute = (req, res, next) => {
  CreateRouteSchema.find({}, (err, list) => {
    if (err) console.log(err);
    else res.send({ Route: list });
  });
};

///assign landmark and busRoute to particular
exports.AssignBusRoute = async (req, res, next) => {
  const id = req.body.registerationNo;
  const landmark = req.body.landmark;
  const busRouteNo = req.body.busRouteNo;
  let find_data = await ApplicantSchema.findOne({ registerationNo: id });
  find_data.landmark = landmark;
  find_data.busRouteNo = busRouteNo;
  find_data.stopageName = stopageName;
  find_data.routeUpdated = true;

  find_data.save((err, data) => {
    if (err) res.json({ message: err });
    return res.json({
      data: data,
      message: ` Bus is assign to ${id}`,
      status: true,
    });
  });
};

exports.GetAssignBusRoute = async (req, res, next) => {
  try {
    const findData = await ApplicantSchema.find({ routeUpdated: true });
    if (findData) {
      return res.json({ data: findData });
    } else if (findData.length === 0) {
      return res.json("0 list");
    } else {
      return res.json("Oops! an error occurr");
    }
  } catch (e) {
    return next(e);
  }
};

exports.LogBook = (req, res, next) => {
  const { tripNo, startKm, endKm, conductorlog } = req.body;

  let newdata = new LogBookSchema({
    driverlog: [{ tripNo, startKm, endKm }],
    conductorlog,
  });
  newdata.save((err, data) => {
    if (err)
      return res.json({
        message: err,
        status: false,
      });

    return res.json({
      data: data,
      status: true,
      message: "Log Book is Created",
    });
  });
};

exports.GetLogBook = async (req, res, next) => {
  try {
    const findData = await LogBookSchema.find({});
    if (findData) {
      return res.json({ data: findData });
    } else if (findData.length === 0) {
      return res.json("0 list");
    } else {
      return res.json("Oops! an error occurr");
    }
  } catch (e) {
    return next(e);
  }
};

/////maintenance vechile In Transport requision  module sir what values does radio button return to Backend.

exports.VechileMaintenance = (req, res, next) => {
  const {
    vechileType,
    vechileNo,
    repairDate,
    maintenanceDate,
    vendorName,
    billNo,
    amount,
  } = req.body;
  let getDate = new Date(maintenanceDate).toLocaleDateString();
  let newdata = new VechileMaintenanceSchema({
    vechileType,
    vechileNo,
    repairDate,
    maintenanceDate: getDate,
    vendorName,
    billNo,
    amount,
  });
  newdata.save((err, data) => {
    if (err)
      return res.json({
        message: err,
        status: false,
      });

    return res.json({
      data: data,
      status: true,
      message: "Maintenance record is Created",
    });
  });
};
exports.GetVechileMaintenance = async (req, res, next) => {
  try {
    const findData = await VechileMaintenanceSchema.find({});
    if (findData) {
      return res.json({ data: findData });
    } else if (findData.length === 0) {
      return res.json("0 list");
    } else {
      return res.json("Oops! an error occurr");
    }
  } catch (e) {
    return next(e);
  }
};

exports.DeleteVechileMaintence = async (req, res, next) => {
  const id = req.params.id;
  VechileMaintenanceSchema.findByIdAndRemove({ _id: id }, (err, data) => {
    if (err) {
      res.status(400).json({
        err: { err },
      });
    }
    res.json({ status: true, message: "Vechile Inventory Deleted " });
  });
};
//Update Transport Facility
exports.UpdateTransport = async (req, res, next) => {
  const {
    admissionNo,
    classOf,
    newTransport,
    diclosure,
    changeTransport,
    street,
    city,
    state,
    pincode,
    landmark,
    effectiveDate,
  } = req.body;
  let getDate = new Date(effectiveDate).toLocaleDateString();
  if (newTransport === true || changeTransport === true) {
    let find_data = await ApplicantSchema.findOne({ admissionNo: admissionNo });
    find_data.landmark = landmark;
    find_data.contactDetail[0].street1 = street;
    (find_data.contactDetail[0].city = city),
      (find_data.contactDetail[0].state = state),
      (find_data.contactDetail[0].pincode = pincode),
      (find_data.contactDetail[0].landmark = landmark);
    const savedata = await find_data.save();
    let newdata = new UpdateTransportSchema({
      admissionNo,
      classOf,
      newTransport,
      diclosure,
      changeTransport,
      effectiveDate: getDate,
      address: [
        {
          street,
          city,
          state,
          pincode,
          landmark,
          fulladdress: `${street + " " + city + " " + state + " " + pincode}`,
        },
      ],
    });
    newdata.save((err, data) => {
      if (err)
        return res.json({
          message: err,
          status: false,
        });

      return res.json({
        data: data,
        status: true,
        message: "Updation in Transport facility  is Done",
      });
    });
  } else {
    let newdata = new UpdateTransportSchema({
      admissionNo,
      classOf,
      newTransport,
      diclosure,
      changeTransport,
      effectiveDate: getDate,
    });
    newdata.save((err, data) => {
      if (err)
        return res.json({
          message: err,
          status: false,
        });

      return res.json({
        data: data,
        status: true,
        message: "Updation in Transport facility  is Done",
      });
    });
  }
};

exports.GetUpdateTransport = async (req, res, next) => {
  try {
    const findData = await UpdateTransportSchema.find({});
    if (findData) {
      return res.json({ data: findData });
    } else if (findData.length === 0) {
      return res.json("0 list");
    } else {
      return res.json("Oops! an error occurr");
    }
  } catch (e) {
    return next(e);
  }
};

exports.DriverLogBooK = async (req, res, next) => {
  const { tripNo, startKm, endKm } = req.body;
  let registerdate = new Date().toLocaleDateString();
  let startTime = new Date().toLocaleTimeString();

  let newdata = await new DriverLogBooKSchema({
    tripNo,
    startKm,
    endKm,
    registerdate,
    startTime,
  });
  newdata.save((err, data) => {
    if (err)
      return res.json({
        message: err,
        status: false,
      });

    return res.json({
      data: data,
      status: true,
      message: "Trip is Started",
    });
  });
};
exports.GetTripNo = async (req, res, next) => {
  try {
    const findData = await DriverLogBooKSchema.find({ endKm: "" });
    if (findData) {
      return res.json({ data: findData });
    } else if (findData.length === 0) {
      return res.json("0 list");
    } else {
      return res.json("Oops! an error occurr");
    }
  } catch (e) {
    return next(e);
  }
};

exports.AddEndKmDriverLog = async (req, res, next) => {
  const id = req.params.id;
  const { tripNo, endKm } = req.body;
  let find_data = await DriverLogBooKSchema.findById(id);
  let d = endKm - find_data.startKm;
  find_data.endKm = endKm;
  find_data.distance = d;
  find_data.save((err, data) => {
    if (err)
      return res.status(400).json({
        message: err,
        status: false,
      });

    return res.json({
      data: data,
      status: true,
      message: " Endkm is Added",
    });
  });
};

exports.getALLDriverLog = async (req, res, next) => {
  try {
    const findData = await DriverLogBooKSchema.find({});
    if (findData) {
      return res.json({ data: findData });
    } else if (findData.length === 0) {
      return res.json("0 list");
    } else {
      return res.json("Oops! an error occurr");
    }
  } catch (e) {
    return next(e);
  }
};

exports.Getdatabytripno = async (req, res, next) => {
  try {
    const tripNo = req.query.tripNo;
    let getDate = new Date().toLocaleDateString();
    let findData = await DriverLogBooKSchema.find({
      tripNo: tripNo,
      endKm: "",
      registerdate: getDate,
    });
    if (findData.length === 0 && tripNo == 1) {
      let findData4 = await DriverLogBooKSchema.find({
        tripNo: tripNo,
        registerdate: getDate,
      });
      if (findData4.length > 0) {
        return res.json({
          data: findData4,
          status: true,
          message: `You have End This Trip`,
        });
      }
      return res.json({
        message: "You have just start the trip so enter Start km manually",
        data: [],
      });
    }

    if (findData.length > 0 && tripNo == 1) {
      return res.json({
        data: findData,
      });
    }

    if (findData.length === 0 && tripNo > 1) {
      let findData1 = await DriverLogBooKSchema.find({
        tripNo: tripNo - 1,
        endKm: "",
        registerdate: getDate,
      });
      let findData2 = await DriverLogBooKSchema.find({
        tripNo: tripNo,
        registerdate: getDate,
      });
      let findData5 = await DriverLogBooKSchema.find({
        tripNo: tripNo - 1,
        registerdate: getDate,
      });
      if (findData1.length > 0) {
        return res.json({
          message: `Fill trip no ${tripNo - 1} end km first .`,
          status: true,
          data: [],
        });
      }
      if (findData2.length > 0) {
        return res.json({
          data: findData2,
          status: true,
          message: `You have End This Trip`,
        });
      }
      if (findData5.length === 0)
        return res.json({
          message: `Please fill data of trip number ${tripNo - 1} first`,
          data: [],
          status: true,
        });

      return res.json({
        data: findData5,
      });
    }

    if (findData.length > 0 && tripNo > 1) {
      return res.json({
        data: findData,
      });
    }
  } catch (e) {
    return next(e);
  }
};

exports.GetStudentNamefromStopage = async (req, res, next) => {
  const stopageName = req.query.stopageName;
  const findData = await StopageSchema.findOne({ stopageName: stopageName });
  let routeNo = findData.routeNo;
  let studentData = await ApplicantSchema.find({ busRouteNo: routeNo });
  res.send({ data: studentData });
};
exports.ConductorLogBooK = async (req, res, next) => {
  const { stopageName, status, nameOfStudent } = req.body;
  let find_data = await ConductorLogBooKSchema.findOne({
    nameOfStudent: nameOfStudent,
    stopageName: stopageName,
  });
  if (find_data) {
    return res.status(200).json({
      status: false,
      message: `This Student is Already Added`,
    });
  } else {
    let newdata = await new ConductorLogBooKSchema({
      nameOfStudent,
      stopageName,
      status,
    });

    newdata.save((err, data) => {
      if (err)
        return res.status(400).json({
          message: err,
          status: false,
        });

      return res.json({
        data: data,
        status: true,
        message: "Attendence is Updated",
      });
    });
  }
};
exports.GetConductorLog = async (req, res, next) => {
  try {
    const findData = await ConductorLogBooKSchema.find({});
    if (findData) {
      return res.json({ data: findData });
    } else if (findData.length === 0) {
      return res.json("0 list");
    } else {
      return res.json("Oops! an error occurr");
    }
  } catch (e) {
    return next(e);
  }
};
