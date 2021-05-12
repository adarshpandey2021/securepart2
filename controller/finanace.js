const AdditionFeeScehma = require("../model/finance/feemangement/additionfee");
const ConfigureFeeSchema = require("../model/finance/feemangement/configurefee");
const CollectionFeeSchema = require("../model/finance/feemangement/collectionfees");
const AddFeeScehmaAdmission = require("../model/finance/feemangement/add feeAdmission");
const AddFeeTransportSchema = require("../model/finance/feemangement/addfeeTransport");
const AddFeeSchoolSchema = require("../model/finance/feemangement/addfeeSchool");
const FeePaymentSchema = require("../model/finance/feemangement/feepayment");
const RefundFeeSchema = require("../model/finance/feemangement/feerefund");
const FeeScheduleCollectionSchema = require("../model/finance/feemangement/feecollectionSchedule");
const FeeChalanGenerateSchema = require("../model/finance/feemangement/feeChalanGenration");
const FeeConcessionSchema = require("../model/finance/feemangement/feeconcession");
const ApplicantSchema = require("../model/admission/registerationForm");
const QuarterNameSchema = require("../model/finance/feemangement/addquartername");
const AdmissionFeeStructureSchema = require("../model/finance/feemangement/feeStructure.admission.");
const TransportFeeStructureSchema = require("../model/finance/feemangement/feeStructure.transport");
const SchoolFeeStructureSchema = require("../model/finance/feemangement/feeStructure.school");
const TotalPaymentSchema = require("../model/finance/feemangement/totalpayment");
const CatchErr = require("../utils/catchAsync");
const ConcessionDataSchema = require("../model/finance/feemangement/dataofconsession");
const Factory = require("../controller/handlerFactory");
const FeeReceiptSchema = require("../model/finance/feemangement/feerecipt");
const QuarterPaymentSchema = require("../model/finance/feemangement/quarterpayment");
const APIFeatures = require("../utils/apiFeatures");

///Add fees

exports.AddFeeAdmission = async (req, res, next) => {
  const { classFor, location, feeHead, feeTypeAF, amountAF } = req.body;

  let newdata = await new AddFeeScehmaAdmission({
    classFor,
    location,
    feeHead,
    feeTypeAF,
    amountAF,
  });

  newdata.save((err, data) => {
    if (err) return res.json({ message: err, status: false });
    return res.status(200).json({
      data: data,
      status: true,
      error: { err },
      message: `Admission Fee has been Added`,
    });
  });
};

exports.DeleteAddFeeAdmissio = async (req, res, next) => {
  try {
    const id = req.params.id;
    const find_data = await AddFeeScehmaAdmission.findByIdAndDelete(id);
    return res.status(200).json({
      status: true,
      data: find_data,
      message: "Admission fee is deleted",
    });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: false });
  }
};

exports.UpdateAddFeeAdmission = async (req, res, next) => {
  try {
    const id = req.params.id;
    const find_data = await AddFeeScehmaAdmission.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    return res.status(201).json({
      status: true,
      data: find_data,
      message: "Updated the AddFeeAdmission",
    });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: false });
  }
};

exports.AddFeeSchool = async (req, res, next) => {
  const { location, feeHeadSF, amountSF } = req.body;

  let newdata = await new AddFeeSchoolSchema({
    feeHeadSF,
    amountSF,
    location,
  });

  newdata.save((err, data) => {
    if (err) return res.json({ message: err, status: false });
    return res.status(200).json({
      data: data,
      status: true,
      error: { err },
      message: `School Fee has been Added`,
    });
  });
};

exports.DeleteAddFeeSchool = async (req, res, next) => {
  try {
    const id = req.params.id;
    const find_data = await AddFeeSchoolSchema.findByIdAndDelete(id);
    return res.status(200).json({
      status: true,
      data: find_data,
      message: "School fee is deleted",
    });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: false });
  }
};

exports.UpdateAddFeeSchool = async (req, res, next) => {
  try {
    const id = req.params.id;
    const find_data = await AddFeeSchoolSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(201).json({
      status: true,
      data: find_data,
      message: "Updated the School Fee",
    });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: false });
  }
};
exports.AddFeeTransport = async (req, res, next) => {
  const { location, amountTF, startKm, endKm } = req.body;

  let distance = Number(endKm - startKm);

  let newdata = await new AddFeeTransportSchema({
    distance,
    amountTF,
    location,
    startKm,
    endKm,
  });

  newdata.save((err, data) => {
    if (err) return res.json({ message: err, status: false });
    return res.status(200).json({
      data: data,
      status: true,
      error: { err },
      message: `Transport Fee has been Added`,
    });
  });
};

exports.DeleteAddFeeTransport = async (req, res, next) => {
  try {
    const id = req.params.id;
    const find_data = await AddFeeTransportSchema.findByIdAndDelete(id);
    return res.status(200).json({
      status: true,
      data: find_data,
      message: "Tranport fee is deleted",
    });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: false });
  }
};

exports.UpdateAddFeeTransport = async (req, res, next) => {
  try {
    const id = req.params.id;
    const find_data = await AddFeeTransportSchema.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    return res.status(201).json({
      status: true,
      data: find_data,
      message: "Updated the Transport Fee",
    });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: false });
  }
};

exports.GetAddFeeAdmission = async (req, res, next) => {
  try {
    const findData = await AddFeeScehmaAdmission.find({});
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
exports.GetAddFeeTransport = async (req, res, next) => {
  try {
    const findData = await AddFeeTransportSchema.find({});
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
exports.GetAddFeeSchool = async (req, res, next) => {
  try {
    const findData = await AddFeeSchoolSchema.find({});
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

exports.GetAllAddFeeAdmission = Factory.getAll(AddFeeScehmaAdmission);
exports.GetAllAddFeeSchool = Factory.getAll(AddFeeSchoolSchema);
exports.GetAllAddFeeTransport = Factory.getAll(AddFeeTransportSchema);

//////////////
exports.AdditionFee = (req, res, next) => {
  const { grade, branch, additionfee } = req.body;

  const newdata = new AdditionFeeScehma({
    grade,
    branch,
    additionfee,
  });

  newdata.save((data, err) => {
    if (err) return console.log(err);
    return res.json({ msg: "Addition fee added!!" });
  });
};

exports.GetAdditionFee = (req, res, next) => {
  AdditionFeeScehma.find({}, (err, list) => {
    if (err) return console.log(err);
    return res.send({ list: list });
  });
};

exports.ConfigureFee = (req, res, next) => {
  const {
    grade,
    registrationFee,
    admissionFee,
    tutionFee,
    examFee,
    classTestFee,
    transportationFee,
    sportsFee,
    anualdayFee,
  } = req.body;

  const newdata = new ConfigureFeeSchema({
    grade,
    registrationFee,
    admissionFee,
    tutionFee,
    examFee,
    classTestFee,
    transportationFee,
    sportsFee,
    anualdayFee,
    total:
      registrationFee +
      admissionFee +
      tutionFee +
      examFee +
      classTestFee +
      transportationFee +
      sportsFee +
      anualdayFee,
  });
  newdata.save((data, err) => {
    if (err) return console.log(err);
    return res.json({ msg: "configure fee added!!" });
  });
};

exports.GetConfigureFee = (req, res, next) => {
  ConfigureFeeSchema.find({}, (err, list) => {
    if (err) return console.log(err);

    res.send({ list: list });
  });
};
exports.EditConfigureFee = (req, res, next) => {
  const id = req.params.id;
  const {
    grade,
    registrationFee,
    admissionFee,
    tutionFee,
    examFee,
    classTestFee,
    transportationFee,
    sportsFee,
    anualdayFee,
  } = req.body;
  let total =
    registrationFee +
    admissionFee +
    tutionFee +
    examFee +
    classTestFee +
    transportationFee +
    sportsFee +
    anualdayFee;
  find_data = ConfigureFeeSchema.findById(id, (err, data) => {
    if (err) return console.log(err);
    data.grade = grade;
    data.registrationFee = registrationFee;
    data.admissionFee = admissionFee;
    data.tutionFee = tutionFee;
    data.examFee = examFee;
    data.classTestFee = classTestFee;
    data.transportationFee = transportationFee;
    data.sportsFee = sportsFee;
    data.anualdayFee = anualdayFee;
    data.total = total;
    data.save((d, err) => {
      if (err) return console.log(err);

      return res.json({ msg: "Configure data Updated" });
    });
  });
};

///////collection fees

exports.CollectionFee = (req, res, next) => {
  const {
    id,
    name,
    classIn,
    branch,
    section,
    feesType,
    outstanding,
    amount,
  } = req.body;
  let newdata = new CollectionFeeSchema({
    id,
    name,
    classIn,
    branch,
    section,
    feesType,
    outstanding,
    amount,
  });
  newdata.save((d, err) => {
    if (err) return console.log(err);
    return res.json({
      msg: "collection fees added",
    });
  });
};

exports.GetCollectionFee = (req, res, next) => {
  CollectionFeeSchema.find({}, (err, list) => {
    if (err) return console.log(err);
    return res.send({ list: list });
  });
};

////fee payment

exports.FeePayment = (req, res, next) => {
  const {
    studentId,
    studentName,
    classOf,
    uptoMonth,
    session,
    duesUptoMonth,
    paidAmount,
    dueAmount,
    feeType,
    frequency,
    monthYear,
    amount,
    amountToPay,
    due,
    paid,
    balance,
  } = req.body;
  let newdata = new FeePaymentSchema({
    studentId,
    studentName,
    classOf,
    uptoMonth,
    feeDues: { session, duesUptoMonth, paidAmount, dueAmount },
    feedetails: {
      feeType,
      frequency,
      monthYear,
      amount,
      amountToPay,
      due,
      paid,
      balance,
    },
  });
  newdata.save((d, err) => {
    if (err) return console.log(err);
    return res.json({
      msg: "Fee payment  added",
    });
  });
};

exports.GetFeePayment = (req, res, next) => {
  FeePaymentSchema.find({}, (err, list) => {
    if (err) return console.log(err);

    return res.send({ list: list });
  });
};

///Refund Feees
exports.RefundFee = CatchErr(async (req, res, next) => {
  const {
    admissionNo,
    name,
    classOf,
    section,
    stream,
    refundHead,
    refundNoteDate,
    chequeNo,
    bankAccountNo,
    bankName,
    bankBranch,
    chequeInFavourOf,
    amountToPay,
  } = req.body;
  let newdata = new RefundFeeSchema({
    admissionNo,
    name,
    classOf,
    section,
    stream,
    refundHead,
    refundNoteDate,
    chequeNo,
    bankAccountNo,
    bankName,
    bankBranch,
    chequeInFavourOf,
    amountToPay,
  });
  let data = newdata.save();
  return res.json({
    msg: " Refund Fee payment  added",
    data: data,
  });
});

exports.GetRefundFee = (req, res, next) => {
  RefundFeeSchema.find({}, (err, list) => {
    if (err) return console.log(err);
    return res.send({ RefundList: list });
  });
};

//////Schedule Fee collection
exports.ScheduleCollectionFee = async (req, res, next) => {
  const {
    admissionNo,
    quarter,
    quarterName,
    name,
    classOf,
    stream,
    fixedDueDate,
    lastDateOfDeposit,
    scheduleLateFeeCharges,
  } = req.body;

  let newdata = await new FeeScheduleCollectionSchema({
    admissionNo,
    quarter,
    quarterName,
    name,
    classOf,
    stream,
    fixedDueDate,
    lastDateOfDeposit,
    scheduleLateFeeCharges,
    year: new Date().getFullYear(),
  });
  newdata.save((err, data) => {
    if (err) return res.json({ message: err, status: false });
    return res.status(200).json({
      data: data,
      status: true,
      error: { err },
      message: `ScheduleCollectionFee`,
    });
  });
};

exports.GetScheduleCollectionFee = async (req, res, next) => {
  try {
    let month = new Date().getMonth() + 1;

    const findData = await FeeScheduleCollectionSchema.find({
      startingMonth: { $lte: month },
      endingMonth: { $gte: month },
    });
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

exports.GetScheduleCollectionFeeById = CatchErr(async (req, res, next) => {
  const id = req.params.id;
  const findData = await FeeScheduleCollectionSchema.findById(id);
  return res.json({ data: findData });
});
exports.UpdateScheduleCollection = Factory.updateOne(
  FeeScheduleCollectionSchema
);

exports.FeeChalanGenerate = async (req, res, next) => {
  const {
    nameOfChallan,
    admissionNo,
    classOf,
    section,
    amountPayable,
    quarter,
    dueDate,
    quaterMonthName,
  } = req.body;

  let newdata = await new FeeChalanGenerateSchema({
    nameOfChallan,
    admissionNo,
    classOf,
    section,
    amountPayable,
    quarter,
    dueDate,
    quaterMonthName,
  });

  newdata.save((err, data) => {
    if (err) return res.json({ msg: err, status: false });
    return res.status(200).json({
      data: data,
      status: true,
      error: { err },
      message: `Fee Chalan Generated`,
    });
  });
};
exports.GetFeeChallan = async (req, res, next) => {
  try {
    const findData = await FeeChalanGenerateSchema.find({});
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

exports.UpdateFeeChallan = CatchErr(async (req, res, next) => {
  const id = req.params.id;
  const find_data = await FeeChalanGenerateSchema.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
    }
  );
  return res.status(201).json({
    status: true,
    data: find_data,
    message: "Updation is done in feechallan",
  });
});

exports.AddFeeConcession = CatchErr(async (req, res, next) => {
  const { admissionNo, concessionType, concessionInPercentage } = req.body;
  let findtotal = await TotalPaymentSchema.findOne({
    applicationNo: admissionNo,
  });
  let finddata = await FeeConcessionSchema.find({ admissionNo: admissionNo });
  if (!findtotal) {
    return res.status(400).json({
      status: false,
      message: "This Application number has no fee structure .",
    });
  } else if (finddata.length > 0) {
    return res.status(405).json({
      status: false,
      message: "Fee Concession is already applied on this Student",
    });
  } else {
    let year = new Date().getFullYear();
    let amountTotal = findtotal.totalamount;
    let deductAmount = Math.round((amountTotal * concessionInPercentage) / 100);
    let quarters = await QuarterPaymentSchema.find({
      applicationNo: admissionNo,
      year: year,
    });
    let perquaterdeduction = Math.round(deductAmount / quarters.length);
    let balanceAmount = Math.round(amountTotal - deductAmount);

    quarters.map((i) => {
      i.quarteramount -= perquaterdeduction;
    });
    quarters.forEach((i) => i.save());

    findtotal.concessionType = concessionType;
    findtotal.concessionInPercentage = concessionInPercentage;
    findtotal.deductAmount = deductAmount;
    findtotal.balanceAmount = balanceAmount;
    let savededuction = await findtotal.save();

    const updateddata = await QuarterPaymentSchema.updateMany(
      { applicationNo: admissionNo, year: year },
      {
        $set: {
          concessionType: concessionType,
          concessionInPercentage: concessionInPercentage,
          totalamount: balanceAmount,
        },
      }
    );

    let find_data = await ApplicantSchema.findOne({ admissionNo: admissionNo });
    const {
      fullname,
      gender,
      assignClass,
      stream,
      registerationNo,
    } = find_data;
    let gaurdianDetail = find_data.gaurdianDetail;

    let datafeeconscession = await ConcessionDataSchema.findOne({
      concessionType: concessionType,
    });
    if (!datafeeconscession) {
      let datafeecon = new ConcessionDataSchema({
        concessionType,
        concessionInPercentage,
      });
      let savedata = await datafeecon.save();
    } else {
      datafeeconscession.concessionInPercentage = concessionInPercentage;
      let savedata = await datafeeconscession.save();
    }

    let newdata = await new FeeConcessionSchema({
      admissionNo,
      concessionType,
      concessionInPercentage,
      fullname,
      gender,
      assignClass,
      stream,
      registerationNo,
      deductAmount,
      amountTotal,
      balanceAmount,
      gaurdianDetail,
      perquaterdeduction,
    });

    newdata.save((err, data) => {
      if (err) return res.json({ msg: err, status: false });
      return res.status(200).json({
        data: data,
        status: true,
        error: { err },
        message: `Fee Concession Done`,
      });
    });
  }
});
//exports.GetApplicationNumberFeeConcession = async (req, res, next) => {

// try {
//   const findData = await FeeConcessionSchema.find({});
//   if (findData) {
//     return res.json({ data: findData });
//   } else if (findData.length === 0) {
//     return res.json("0 list");
//   } else {
//     return res.json("Oops! an error occurr");
//   }
// } catch (e) {
//   return next(e);
// }
//};
exports.GetApplicationNumberFeeConcession = Factory.getAll(FeeConcessionSchema);

exports.GetTotalPaymentDetails = Factory.getAll(TotalPaymentSchema);

exports.GetConcessionByType = CatchErr(async (req, res, next) => {
  const concessionType = req.query.concessionType;
  const findData = await ConcessionDataSchema.find({
    concessionType: concessionType,
  });
  if (findData) {
    return res.json({ data: findData });
  } else if (findData.length === 0) {
    return res.json("0 list");
  } else {
    return res.json("Oops! an error occurr");
  }
});

exports.AddQuarterName = async (req, res, next) => {
  try {
    const { quarters } = req.body;
    let length = quarters.length;
    for (let i = 0; i < length; i++) {
      let q1 = new Date(quarters[i].quarterMonth[0]).getMonth() + 1;
      let q2 = new Date(quarters[i].quarterMonth[1]).getMonth() + 1;
      let t1 = new Date(quarters[i].quarterMonth[0]).toLocaleString("default", {
        month: "short",
      });
      let t2 = new Date(quarters[i].quarterMonth[1]).toLocaleString("default", {
        month: "short",
      });
      let str = `${t1}-${t2}`;
      let number = Number(i + 1);
      console.log(number);

      let array = quarters[i];
      array.startingMonth = q1;
      array.endingMonth = q2;
      array.quaterMonthName = str;
      array.quarterNumber = number;
    }

    let newdata = new QuarterNameSchema({
      quarters,
      numberOfQuarter: length,
    });
    let find_data = await QuarterNameSchema.find({});

    if (find_data.length > 0) {
      return res.status(405).json({
        status: false,
        message: "Quarter is Already Added",
      });
    } else {
      let data = await newdata.save();

      return res.json({
        data: data,
        status: true,
        message: "Quarter is Added",
      });
    }
  } catch (err) {
    return res.status(400).json({ message: err.message, status: false });
  }
};

exports.GetAddedQuarter = async (req, res, next) => {
  try {
    const find_data = await QuarterNameSchema.find({});
    if (!find_data) throw new Error("No Quarter is Added");

    return res.status(200).json({
      status: true,
      data: find_data,
      message: "List of quarter Added",
    });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: false });
  }
};

exports.GetQuaterMonthByName = CatchErr(async (req, res, next) => {
  const quarterName = req.query.quarterName;
  let data = await QuarterNameSchema.findOne({
    "quarters.quarterName": quarterName,
  });
  let datanew = data.quarters;
  let filterdata = datanew.filter((num) => {
    return num.quarterName === quarterName;
  });

  return res.status(200).json({
    status: true,
    data: filterdata,
    message: "List of quarter Added",
  });
});

exports.DeleteQuarterAdded = async (req, res, next) => {
  try {
    const id = req.params.id;
    const find_data = await QuarterNameSchema.findByIdAndDelete(id);
    return res.status(200).json({
      status: true,
      data: find_data,
      message: "Quarter is deleted",
    });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: false });
  }
};

////Fee Structuree

exports.AddmissionFeeStructure = async (req, res, next) => {
  try {
    const { classFor, location, feeHead, feeTypeAF, amountAF } = req.body;

    let find_data = await AdmissionFeeStructureSchema.find({
      classFor,
      feeHead,
      location,
    });
    if (find_data.length > 0) {
      return res.status(400).json({
        status: false,
        message: "Fees for this Class is already Added",
      });
    } else {
      let newdata = new AdmissionFeeStructureSchema({
        classFor,
        location,
        feeHead,
        feeTypeAF,
        amountAF,
      });
      let data = await newdata.save();
      return res.json({
        status: true,
        data: data,
        message: `Fee is added to the class ${classFor}`,
      });
    }
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: err.message,
    });
  }
};

exports.GetAddmissionFeeStructure = async (req, res, next) => {
  try {
    const find_data = await AdmissionFeeStructureSchema.find({});
    if (!find_data) throw new Error("No Fee is Added");

    return res.status(200).json({
      status: true,
      data: find_data,
      message: "List of Fee Added",
    });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: false });
  }
};
// exports.GetadmissionfeeByfields=Factory.getAll(AdmissionFeeStructureSchema);
exports.DeleteAddmissionFeeStructure = async (req, res, next) => {
  try {
    const id = req.params.id;
    const find_data = await AdmissionFeeStructureSchema.findByIdAndDelete(id);
    return res.status(200).json({
      status: true,
      data: find_data,
      message: "Admission  is deleted",
    });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: false });
  }
};

exports.UpdateAddmissionFeeStructure = async (req, res, next) => {
  try {
    const id = req.params.id;
    const find_data = await AdmissionFeeStructureSchema.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    return res.status(201).json({
      status: true,
      data: find_data,
      message: "Updated the Admission Fee",
    });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: false });
  }
};

///
exports.SchoolFeeStructure = async (req, res, next) => {
  try {
    const { classFor, location, feeHeadSF, amountSF } = req.body;

    let find_data = await SchoolFeeStructureSchema.find({
      classFor,
      feeHeadSF,
      location,
    });
    if (find_data.length > 0) {
      return res.status(400).json({
        status: false,
        message: "Fees for this Class is already Added",
      });
    } else {
      let newdata = new SchoolFeeStructureSchema({
        classFor,
        location,
        feeHeadSF,
        amountSF,
      });
      let data = await newdata.save();
      return res.json({
        status: true,
        data: data,
        message: `School Fee is added to the class ${classFor}`,
      });
    }
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: err.message,
    });
  }
};

exports.GetSchoolFeeStructure = async (req, res, next) => {
  try {
    const find_data = await SchoolFeeStructureSchema.find({});
    if (!find_data) throw new Error("No Fee is Added");

    return res.status(200).json({
      status: true,
      data: find_data,
      message: "List of Fee Added",
    });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: false });
  }
};

exports.DeleteSchoolFeeStructure = async (req, res, next) => {
  try {
    const id = req.params.id;
    const find_data = await SchoolFeeStructureSchema.findByIdAndDelete(id);
    return res.status(200).json({
      status: true,
      data: find_data,
      message: "School fee  is deleted",
    });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: false });
  }
};

exports.UpdateSchoolFeeStructure = async (req, res, next) => {
  try {
    const id = req.params.id;
    const find_data = await SchoolFeeStructureSchema.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    return res.status(201).json({
      status: true,
      data: find_data,
      message: "Updated the School Fee",
    });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: false });
  }
};

///Transport Fee schema

exports.TranportFeeStructure = async (req, res, next) => {
  try {
    const { classFor, location, amountTF, startKm, endKm, distance } = req.body;

    // let distance=Number(endKm-startKm)

    let find_data = await TransportFeeStructureSchema.find({
      classFor,
      amountTF,
      location,
    });
    if (find_data.length > 0) {
      return res.status(400).json({
        status: false,
        message: "Fees for this Class is already Added",
      });
    } else {
      let newdata = new TransportFeeStructureSchema({
        classFor,
        location,
        distance,
        amountTF,
        startKm,
        endKm,
      });
      let data = await newdata.save();
      return res.json({
        status: true,
        data: data,
        message: `Transport Fee is added to the class ${classFor}`,
      });
    }
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: err.message,
    });
  }
};

exports.GetTranportFeeStructure = async (req, res, next) => {
  try {
    const find_data = await TransportFeeStructureSchema.find({});
    if (!find_data) throw new Error("No Fee is Added");

    return res.status(200).json({
      status: true,
      data: find_data,
      message: "List of Fee Added",
    });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: false });
  }
};

exports.DeleteTranportFeeStructure = async (req, res, next) => {
  try {
    const id = req.params.id;
    const find_data = await TransportFeeStructureSchema.findByIdAndDelete(id);
    return res.status(200).json({
      status: true,
      data: find_data,
      message: "Transport fee  is deleted",
    });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: false });
  }
};

exports.UpdateTranportFeeStructure = CatchErr(async (req, res, next) => {
  const id = req.params.id;
  const find_data = await TransportFeeStructureSchema.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
    }
  );
  return res.status(201).json({
    status: true,
    data: find_data,
    message: "Updated the Transport Fee",
  });
});

///Fee Receipt
exports.FeeReceipt = CatchErr(async (req, res, next) => {
  const {
    admissionNo,
    nameOfStudent,
    gender,
    phoneNo,
    studentStatus,
    quarter,
    paidAmount,
    outstanding,
    paymentMode,
    dateOfPayment,
    feeType,
  } = req.body;

  let newdata = new FeeReceiptSchema({
    admissionNo,
    nameOfStudent,
    gender,
    phoneNo,
    studentStatus,
    quarter,
    paidAmount,
    outstanding,
    paymentMode,
    dateOfPayment,
    feeType,
  });
  let data = await newdata.save();

  return res.json({
    data: data,
    message: "Fee receipt is genrated",
    status: true,
  });
});

exports.GetFeeReceipt = Factory.getAll(FeeReceiptSchema);

//exports.GetQuarterPayment=Factory.getAll(QuarterPaymentSchema);
exports.GetQuarterPayment = async (req, res, next) => {
  try {
    let month = new Date().getMonth() + 1;

    const findData = await QuarterPaymentSchema.find({
      startingMonth: { $lte: month },
      endingMonth: { $gte: month },
    });
    if (findData) {
      return res.json({ data: { data: findData } });
    } else if (findData.length === 0) {
      return res.json("0 list");
    } else {
      return res.json("Oops! an error occurr");
    }
  } catch (e) {
    return next(e);
  }
};

exports.GetAmountByapplicationNoandQuarter = CatchErr(
  async (req, res, next) => {
    const applicationNo = req.query.applicationNo;
    let find_data = await QuarterPaymentSchema.find({ applicationNo });

    if (find_data.length > 0) {
      return res.json({
        data: find_data,
        status: true,
      });
    } else {
      return res.json({
        data: find_data,
        status: false,
        message: "No Data Found!!",
      });
    }
  }
);

exports.GetSchoolFeeStructureByLoc = Factory.getAll(SchoolFeeStructureSchema);
exports.GetTransportFeeStructureByLoc = Factory.getAll(
  TransportFeeStructureSchema
);
exports.GetAdmissionFeeStructureByLoc = Factory.getAll(
  AdmissionFeeStructureSchema
);

exports.QuaterDueDate = CatchErr(async (req, res, next) => {
  const applicationNo = req.query.admissionNo;
  const paydate = new Date(req.query.payDate).toISOString();

  let month = new Date().getMonth() + 1;

  let data = await QuarterPaymentSchema.findOne({
    startingMonth: { $lte: month },
    endingMonth: { $gte: month },
    applicationNo,
  });

  if (data.dueDate >= paydate) {
    return res.json({
      status: true,
      message: "No late fee charges",
      lateFeecharge: 0,
    });
  } else {
    let amount = data.quarteramount;
    let amnt = Math.round((amount * 5) / 100);
    let amountToPay = amount + amnt;
    return res.json({
      status: true,
      message: "Late fee charges",
      lateFeecharge: amnt,
    });
  }
});

exports.GetDetailsOfQuartPayment = CatchErr(async (req, res, next) => {
  const applicationNo = req.query.admissionNo;
  let month = new Date().getMonth() + 1;

  const findData = await QuarterPaymentSchema.findOne({
    startingMonth: { $lte: month },
    endingMonth: { $gte: month },
    applicationNo,
  });

  return res.json({
    data: findData,
    message: "Details of Students Fee",
  });
});

exports.ShowAdmissionNumberOfUnPaid = CatchErr(async (req, res, next) => {
  let month = new Date().getMonth() + 1;

  const findData = await QuarterPaymentSchema.find({
    startingMonth: { $lte: month },
    endingMonth: { $gte: month },
    paymentStatus: "Not Paid",
  });

  return res.json({
    data: findData,
    message: "Details of Students Fee",
  });
});