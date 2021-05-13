const ApplicantSchema = require("../model/admission/registerationForm");
const { sendEmail } = require("../mailservice/mailservice");
const MailInfo = require("../model/exam/mailinfo");
const AdmissionNotificationDetails = require("../model/admission/admission.notification.model");
const PolicySchema = require("../model/admission/admision.policy.model");
const ConfirmMailSchema = require("../model/exam/confirmationmail");
const AdmissionNoSchema = require("../model/admission/admissionNo");
const MarkSheetUpload = require("../model/admission/marksheetupload");
const AddPolicySchema = require("../model/admission/addpolicy");
const AdmissionReportSchema = require("../model/admission/admissionReportSchema");
const worldMapData = require("city-state-country");
const FAQSchema = require("../model/admission/faq.");
const APIFeatures = require("../utils/apiFeatures");
const QuarterNameSchema = require("../model/finance/feemangement/addquartername");
const AdmissionFeeStructureSchema = require("../model/finance/feemangement/feeStructure.admission.");
const TransportFeeStructureSchema = require("../model/finance/feemangement/feeStructure.transport");
const SchoolFeeStructureSchema = require("../model/finance/feemangement/feeStructure.school");
const TotalPaymentSchema = require("../model/finance/feemangement/totalpayment");
const CatchErr = require("../utils/catchAsync");
const StopageSchema = require("../model/transport/vechileinventory/createStopage");
const ScheduleCollectionFee = require("../model/finance/feemangement/feecollectionSchedule");
const QuarterPaymentSchema = require("../model/finance/feemangement/quarterpayment");
const Respond = require("../utils/respond");
const pincodeDirectory = require('india-pincode-lookup');

const FeeRecipt = require("../model/finance/feemangement/feerecipt");

///////PolicyS
exports.Policy = async (req, res, next) => {
  const {
    requirement1,
    requirement2,
    requirement3,
    requirement4,
    requirement5,
    requirement6,
    requirement7,
    requirement8,
  } = req.body;
  // logger.warn(req.body,"Testing body")

  let newdata = await new PolicySchema({
    requirement1,
    requirement2,
    requirement3,
    requirement4,
    requirement5,
    requirement6,
    requirement7,
    requirement8,
  });
  newdata.save((err, data) => {
    if (err) return res.status(400).json({ msg: err, status: false });

    return res.json({
      message: "Policy Updated",
      data: data,
      status: true,
    });
  });
};

exports.GetPolicy = async (req, res, next) => {
  await PolicySchema.find({})
    .sort({ _id: -1 })
    .exec((err, list) => {
      if (err) return console.log(err);
      return res.send({ data: list });
    });
};

exports.AddPolicy = async (req, res, next) => {
  const { policy } = req.body;

  let newdata = new AddPolicySchema({
    policy,
  });
  newdata.save((err, data) => {
    if (err) return res.json({ msg: err, status: false });

    return res.json({
      message: "Policy is Added Successfully",
      data: data,
      status: true,
    });
  });
};

exports.GetPolicyAdded = async (req, res, next) => {
  await AddPolicySchema.find({})
    .sort({ _id: -1 })
    .limit(1)
    .exec((err, data) => {
      if (err) return res.json({ message: { err }, data: {}, status: false });

      return res.send({ data: data });
    });
};
exports.EditPolicy = async (req, res, next) => {
  const id = req.params.id;
  const { policy } = req.body;

  let find_data = AddPolicySchema.findById(id, (err, data) => {
    if (err) return res.json({ message: { err }, data: {}, status: false });
    data.policy = policy;
    data.save((err, data) => {
      if (err) return res.json({ message: { err }, status: false });
      return res.json({
        message: "Policy Updated",
        data: data,
        status: true,
      });
    });
  });
};

///////////notification

exports.AdmissionNotification = async (req, res, next) => {
  try {
    const {
      classFor,
      startDate,
      branch,
      stream,
      lastDate,
      numberOfSeats,
      remark,
    } = req.body;
    let startDate1 = new Date(
      startDate
        .split("/")
        .reverse()
        .join("/")
    ).getTime();
    let lastDate1 = new Date(
      lastDate
        .split("/")
        .reverse()
        .join("/")
    ).getTime();
    const find_data = await AdmissionNotificationDetails.find({
      startDate: { $lte: new Date().getTime() },
      lastDate: { $gte: new Date().setDate(new Date().getDate() - 1) },
      classFor,
      branch,
    });
    if (find_data.length > 0) {
      {
        throw new Error("This class is Already Active ");
      }
    }
    let newdata = new AdmissionNotificationDetails({
      classFor,
      branch,
      stream,
      numberOfSeats,
      remark,
      startDate: startDate1,
      lastDate: lastDate1,
    });
    if (startDate > lastDate) {
      throw new Error("Last Date Should be greater than start date");
    }

    newdata.save((err, data) => {
      if (err) return res.json({ message: { err }, data: {}, status: false });

      return res.json({
        data: data,
        status: true,
        message: "Notification created successfully",
      });
    });
  } catch (e) {
    res.status(400).json({
      status: false,
      message: e.message,
    });
  }
};

exports.GetNotify = async (req, res, next) => {
  await AdmissionNotificationDetails.find({})
    .sort({ _id: -1 })
    .exec((err, data) => {
      if (err)
        return res.json({ message: err.message, data: {}, status: false });

      return res.send({ data: data });
    });
};

exports.GetActiveClass = async (req, res, next) => {
  const date = await AdmissionNotificationDetails.find({
    startDate: { $lte: new Date().getTime() },
    lastDate: { $gte: new Date().setDate(new Date().getDate() - 1) },
  });
  return res.status(200).json({
    status: true,
    data: date,
    message: `success`,
  });
};

exports.GetActiveClassByLocation = async (req, res, next) => {
  const branch = req.query.branch;
  const date = await AdmissionNotificationDetails.find({
    startDate: { $lte: new Date().getTime() },
    lastDate: { $gte: new Date().setDate(new Date().getDate() - 1) },
    branch,
  });
  return res.status(200).json({
    status: true,
    data: date,
    message: `success`,
  });
};

exports.DeleteNotification = async (req, res, next) => {
  const id = req.params.id;
  AdmissionNotificationDetails.findByIdAndRemove({ _id: id }, (err, data) => {
    if (err) {
      res.status(400).json({
        err: { err },
      });
    }
    res.json({ status: true, message: "Notification  Deleted " });
  });
};

////////////////////
const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

//////
exports.UploadMarksheet = async (req, res, next) => {
  let myFile = req.file.originalname.split(".");
  const fileType = myFile[myFile.length - 1];

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${Date.now()}${fileType}`,
    Body: req.file.buffer,
  };
  s3.upload(params, (error, data) => {
    if (error) {
      res.status(500).send(error);
    }

    res.status(200).json({
      data: data,
      status: true,
      messsage: "File is Uploaded",
    });
  });
};

//////////////////////////  Registration Form
exports.ApplicantDetails = async (req, res, next) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      gender,
      bloodGroup,
      dateOfBirth,
      age,
      stream,
      location,
      branch,
      nationality,
      currentClass,
      classFor,
      academicRecord,
      achievement,
      street1,
      street2,
      city,
      state,
      pincode,
      landmark,
      primaryEmail,
      secondaryEmail,
      primaryContact,
      secondaryContact,
      tertiaryContact,
      contactRelation,
      gaurdianDetail,
      siblingDetail,
      documentVerification,
    } = req.body;

    let Find_data = await ApplicantSchema.find({});
    let registerationNo = `0000${Find_data.length + 1}`;

    let details = new ApplicantSchema({
      firstName,
      middleName,
      lastName,
      gender,
      bloodGroup,
      dateOfBirth,
      age,
      stream,
      location,
      branch,
      nationality,
      currentClass,
      classFor,
      academicRecord,
      achievement,
      gaurdianDetail,
      siblingDetail,
      documentVerification,
      contactDetail: [
        {
          street1,
          street2,
          city,
          state,
          pincode,
          landmark,
          primaryEmail,
          secondaryEmail,
          primaryContact,
          secondaryContact,
          tertiaryContact,
          contactRelation,
        },
      ],
      fullname: `${firstName + " " + middleName + " " + lastName}`,
      year: new Date().getFullYear(),
      registerationNo,
    });
    const data = await details.save();
    res.json({
      data: data,
      status: true,
      message: "Your Registration Form is Submitted Successfully",
    });
    await sendEmail(
      "rahul.singh2@oodles.io",
      `Hello School Admission Incharge
            Application of student whose registeration no is ${registerationNo} is Submitted Successfully.`,
      "Admission Incharge"
    );

    await sendEmail(
      primaryEmail,
      `Hello ${firstName}
         your  Application  is Submitted Successfully.Please Wait School will update you for further process`,
      firstName
    );
  } catch (err) {
    if (err.code === 11000) {
      try {
        let value = Object.values(err.keyValue)[0];
        let val2 = Object.keys(err.keyValue)[0].split(".")[1];

        const message = `Duplicate field value: ${value} at field ${val2}. Please enter the different value`;
        return res.status(400).json({
          status: false,
          message,
        });
      } catch (err) {
        return res
          .status(400)
          .json({ message: err.message, data: {}, status: false });
      }
    }
    return res
      .status(400)
      .json({ message: err.message, data: {}, status: false });
  }
};

exports.showApplicantDetails = async (req, res, next) => {
  // const page = parseInt(req.query.page) || 1;
  // const size = parseInt(req.query.size) || 10;
  // await ApplicantSchema.find({})
  //   .skip((page - 1) * size)
  //   .limit(size)
  //   .sort({ _id: -1 })
  //   .exec((err, List) => {
  //     if (err) console.log(err);
  //     else res.send({ data: List, status: true, message: "Applicant List" });
  //   });

  const features = new APIFeatures(ApplicantSchema.find({}), req.query)
    .paginate()
    .filter()
    .sort()
    .limitFields();
  const data = await features.query;

  return res.status(200).json({
    data: data,
    message: "List of register students",
  });
};

exports.DeleteApplicantDetails = async (req, res, next) => {
  const id = req.params.id;
  ApplicantSchema.findByIdAndRemove({ _id: id }, (err, data) => {
    if (err) {
      res.status(400).json({
        err: { err },
      });
    }
    res.json({ status: true, message: "Applicant Details Deleted " });
  });
};

exports.GetDetailsOfApplicantById = async (req, res, next) => {
  try {
    const id = req.params.id;
    let find_Data = await ApplicantSchema.findById(id);
    if (find_Data) {
      return res.json({
        data: find_Data,
        status: true,
      });
    }
  } catch (e) {
    return res.json({
      status: false,
      message: e.message,
    });
  }
};

exports.GetDataByYear = async (req, res, next) => {
  const year = req.query.year;
  await ApplicantSchema.find({ year: year, admissionFee: "Deposited" }).exec(
    (err, List) => {
      if (err) console.log(err);
      else res.send({ data: List, status: true, message: "Applicant List" });
    }
  );
};
exports.GetDataByClassFeedeposited = async (req, res, next) => {
  const assignClass = req.query.assignClass;
  await ApplicantSchema.find({
    assignClass: assignClass,
    admissionFee: "Deposited",
  }).exec((err, List) => {
    if (err) console.log(err);
    else res.send({ data: List, status: true, message: "Applicant List" });
  });
};
exports.GetDataById = async (req, res, next) => {
  const id = req.query.id;
  await ApplicantSchema.findOne({ registerationNo: id }).exec((err, List) => {
    if (err) console.log(err);
    else res.send({ data: List, status: true, message: "Applicant List" });
  });
};
exports.FinalSubmit = async (req, res, next) => {
  const id = req.params.id;
  await ApplicantSchema.findById(id, (err, data) => {
    if (err) console.log(err);
    else {
      data.finalSubmit = true;
      data.save((d, err) => {
        if (err) throw err;
        res.send("FORM is Successfully submit");
      });
    }
  });
};

exports.ChangeApplicantStatus = async (req, res, next) => {
  const id = req.params.id;
  const { status } = req.body;
  await ApplicantSchema.findById(id, (err, data) => {
    if (err) return res.json({ message: err, status: false });
    else {
      data.status = status;
      data.save((err, data) => {
        if (err) return res.json({ msg: err, status: false });
        return res.json({
          message: `Applicant status is ${status}`,
          status: true,
        });
      });
    }
  });
};

//Screening
exports.Screening = async (req, res, next) => {
  try {
    const {
      screeningDate,
      screeningTime,
      year,
      classFor,
      numberOfStudents,
    } = req.body;
    let studentdata = await ApplicantSchema.find({
      year: year,
      classFor: classFor,
      status: "Fit For Screening",
      isScheduled: false,
    }).limit(numberOfStudents);
    if (studentdata.length === 0) {
      return res.status(400).json({
        status: false,
        message: "Student Number Exceed!!",
      });
    } else {
      let ids = studentdata.map((i) => {
        return i._id;
      });
      const updateddata = await ApplicantSchema.updateMany(
        { _id: { $in: ids } },
        {
          $set: {
            screeningDate: screeningDate,
            screeningTime: screeningTime,
            isScheduled: true,
          },
        }
      );

      return res.json({
        message: "Upadation Done",
        status: true,
        data: {
          updateddata,
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      warning: err,
      message: "Screening Schedule",
      status: true,
    });
  }
};

///get data of year and class
exports.GetClassYear = async (req, res, next) => {
  let year = req.query.year;
  let classFor = req.query.classFor;
  await ApplicantSchema.find({ year: year, classFor: classFor })
    .sort({ _id: -1 })
    .exec((err, data) => {
      if (err) return res.send(err);

      return res.send({ data: data });
    });
};

/////////get data acording to status and year and class
exports.GetClassYearFitForScreening = async (req, res, next) => {
  let year = req.query.year;
  let classFor = req.query.classFor;
  await ApplicantSchema.find({
    year: year,
    classFor: classFor,
    status: "Fit For Screening",
    isScheduled: false,
  })
    .sort({ _id: -1 })
    .exec((err, data) => {
      if (err) return res.send(err);

      return res.send({ data: data });
    });
};
exports.GetClassYearShortList = async (req, res, next) => {
  let year = req.query.year;
  let classFor = req.query.classFor;
  await ApplicantSchema.find({
    year: year,
    classFor: classFor,
    shortlist: "Shortlisted",
  })
    .sort({ _id: -1 })
    .exec((err, data) => {
      if (err) return res.send(err);

      return res.send({ data: data });
    });
};
exports.GetClassYearConfirmation = async (req, res, next) => {
  let year = req.query.year;
  let classFor = req.query.classFor;
  await ApplicantSchema.find({ year: year, classFor: classFor, selected: true })
    .sort({ _id: -1 })
    .exec((err, data) => {
      if (err) return res.send(err);

      return res.send({ data: data });
    });
};

// test details
exports.SendNotificationOfScreening = async (req, res, next) => {
  const id = req.body.applicationNo;

  try {
    const find_applicant = await ApplicantSchema.findOne({
      registerationNo: id,
    });
    const { screeningDate, screeningTime, remaindermsg } = req.body;
    let getDate = new Date(screeningDate).toLocaleDateString();

    const data = new MailInfo({
      screeningDate: getDate,
      screeningTime,
      remaindermsg,
      applicationNo: id,
    });
    const newdata = await data.save();
    await sendEmail(
      find_applicant.contactDetail[0].primaryEmail,
      `Hello ${find_applicant.fullname}
         You are   shortlisted for offline exam.The  date for your  exam is ${getDate}. 
        Timming: Exam start at sharp ${screeningTime}.
         ${remaindermsg}`,
      find_applicant.fullname
    );
    return res.status(200).json({
      status: true,
      message: "Schedule has been sent!!",
      data: newdata,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: false });
  }
};

exports.GetDeatilsOfExam = async (req, res, next) => {
  await MailInfo.find({})
    .sort({ _id: -1 })
    .exec((err, list) => {
      if (err) console.log(err);
      else return res.send({ list: list });
    });
};

exports.ShortList = async (req, res, next) => {
  const id = req.params.id;
  const { shortlist } = req.body;
  await ApplicantSchema.findById(id, (err, data) => {
    if (err) return res.json({ message: err, status: false });
    else {
      data.shortlist = shortlist;
      data.save((err, data) => {
        if (err) return res.json({ msg: err, status: false });
        return res.status(200).json({
          status: true,
          message: `Application is ${shortlist}`,
        });
      });
    }
  });
};

exports.Getshortlisted = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 10;
  await ApplicantSchema.find({ shortlist: "Shortlisted" })
    .skip((page - 1) * size)
    .limit(size)
    .sort({ _id: -1 })
    .exec((err, List) => {
      if (err) console.log(err);
      else {
        res.send({ data: List });
      }
    });
};
exports.GetFitForScreening = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 10;
  await ApplicantSchema.find({ status: "Fit For Screening" })
    .skip((page - 1) * size)
    .limit(size)
    .sort({ _id: -1 })
    .exec((err, List) => {
      if (err) console.log(err);
      else {
        res.send({ data: List });
      }
    });
};
exports.GetDocVerify = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 10;
  await ApplicantSchema.find({ action: "Approve" })
    .skip((page - 1) * size)
    .limit(size)
    .sort({ _id: -1 })
    .exec((err, List) => {
      if (err) console.log(err);
      else {
        res.send({ data: List });
      }
    });
};

exports.GetConfirmation = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 10;
  await ApplicantSchema.find({ selected: true })
    .skip((page - 1) * size)
    .limit(size)
    .sort({ _id: -1 })
    .exec((err, List) => {
      if (err) console.log(err);
      else {
        res.send({ data: List });
      }
    });
};

exports.GetDepositedFee = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 10;
  await ApplicantSchema.find({ admissionFee: "Deposited" })
    .skip((page - 1) * size)
    .limit(size)
    .sort({ _id: -1 })
    .exec((err, List) => {
      if (err) console.log(err);
      else {
        res.send({ data: List });
      }
    });
};

/////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
exports.FinalSelection = async (req, res, next) => {
  const id = req.params.id;
  await ApplicantSchema.findById(id, (err, data) => {
    if (err) console.log(err);
    else {
      data.selected = true;
      data.save((d, err) => {
        if (err) throw err;
        res.send("final selection done!!!");
      });
    }
  });
};
exports.GetFinalSelected = async (req, res, next) => {
  await ApplicantSchema.find({ selected: true })
    .sort({ _id: -1 })
    .exec((err, list) => {
      if (err) throw err;
      res.send({ Finallist: list });
    });
};

///confirmation
exports.ConfirmtionMail = async (req, res, next) => {
  const id = req.body.applicationNo;

  try {
    const { admissionDate, admissionTime, remaindermsg } = req.body;
    let getDate = new Date(admissionDate).toLocaleDateString();
    const find_applicant = await ApplicantSchema.findOne({
      registerationNo: id,
    });
    find_applicant.selected = true;
    find_applicant.save();

    const data = await new ConfirmMailSchema({
      admissionDate: getDate,
      admissionTime,
      remaindermsg,
      applicationNo: id,
    });
    data.save((err, data) => {
      if (err) return res.status(400).json({ message: err, status: false });
      res.status(200).json({
        message: "Schedule has been sent!!",
        status: true,
      });
    });

    await sendEmail(
      find_applicant.contactDetail[0].primaryEmail,
      `Hello ${find_applicant.fullname}
         Your Admission is confirmed.Please visit school fot other process .The  date is ${getDate}. 
    
         ${remaindermsg}`,
      find_applicant.fullname
    );
    return res.status(200).json({
      message: "Schedule has been sent!!",
      status: true,
    });
  } catch (e) {
    return next(e);
  }
};

///document

exports.DocumentVerification = (req, res, next) => {
  const id = req.params.id;
  const { action } = req.body;
  ApplicantSchema.findById(id, (err, data) => {
    if (err) console.log(err);
    else {
      data.action = action;

      data.save((err, data) => {
        if (err) return res.json({ message: err, status: false });
        return res.status(200).json({
          data: data.action,

          status: true,

          message: `Applicant document verification is ${action}`,
        });
      });
    }
  });
};
exports.DocumentVerificationdobCerti = (req, res, next) => {
  const id = req.params.id;
  const { dobCerti } = req.body;
  ApplicantSchema.findById(id, (err, data) => {
    if (err) console.log(err);
    else {
      data.dobCerti = dobCerti;
      if (
        dobCerti === true &&
        data.sssimdCerti === true &&
        data.adharcardCerti === true &&
        data.transferCerti === true &&
        data.medicalCerti === true
      ) {
        data.action = "Approve";
      } else {
        data.action = "Hold";
      }

      data.save((err) => {
        if (err) return res.json({ message: err, status: false });
        return res.status(200).json({
          data: {
            dobCerti,
          },
          status: true,

          message: "Applicant DOB document status submitted",
        });
      });
    }
  });
};
exports.DocumentVerificationsssimdCerti = (req, res, next) => {
  const id = req.params.id;
  const { sssimdCerti } = req.body;
  ApplicantSchema.findById(id, (err, data) => {
    if (err) console.log(err);
    else {
      data.sssimdCerti = sssimdCerti;
      if (
        sssimdCerti === true &&
        data.dobCerti === true &&
        data.adharcardCerti === true &&
        data.transferCerti === true &&
        data.medicalCerti === true
      ) {
        data.action = "Approve";
      } else {
        data.action = "Hold";
      }

      data.save((err) => {
        if (err) return res.json({ message: err, status: false });
        return res.status(200).json({
          data: {
            sssimdCerti,
          },

          status: true,

          message: "Applicant SSSIMD certi document status submitted",
        });
      });
    }
  });
};

exports.DocumentVerificationadharcardCerti = (req, res, next) => {
  const id = req.params.id;
  const { adharcardCerti } = req.body;
  ApplicantSchema.findById(id, (err, data) => {
    if (err) console.log(err);
    else {
      data.adharcardCerti = adharcardCerti;
      if (
        adharcardCerti === true &&
        data.dobCerti === true &&
        data.sssimdCerti === true &&
        data.transferCerti === true &&
        data.medicalCerti === true
      ) {
        data.action = "Approve";
      } else {
        data.action = "Hold";
      }

      data.save((err) => {
        if (err) return res.json({ message: err, status: false });
        return res.status(200).json({
          data: {
            adharcardCerti,
          },

          status: true,
          message: "Applicant Adharcard  document status submitted",
        });
      });
    }
  });
};

exports.DocumentVerificationtransferCerti = (req, res, next) => {
  const id = req.params.id;
  const { transferCerti } = req.body;
  ApplicantSchema.findById(id, (err, data) => {
    if (err) console.log(err);
    else {
      data.transferCerti = transferCerti;
      if (
        transferCerti === true &&
        data.dobCerti === true &&
        data.sssimdCerti === true &&
        data.adharcardCerti === true &&
        data.medicalCerti === true
      ) {
        data.action = "Approve";
      } else {
        data.action = "Hold";
      }

      data.save((err) => {
        if (err) return res.json({ message: err, status: false });
        return res.status(200).json({
          data: {
            transferCerti,
          },

          status: true,
          message: "Applicant Transfer Certi document status submitted",
        });
      });
    }
  });
};
exports.DocumentVerificationmedicalCerti = (req, res, next) => {
  const id = req.params.id;
  const { medicalCerti } = req.body;
  ApplicantSchema.findById(id, (err, data) => {
    if (err) console.log(err);
    else {
      data.medicalCerti = medicalCerti;

      if (
        medicalCerti === true &&
        data.dobCerti === true &&
        data.sssimdCerti === true &&
        data.adharcardCerti === true &&
        data.transferCerti === true
      ) {
        data.action = "Approve";
      } else {
        data.action = "Hold";
      }

      data.save((err) => {
        if (err) return res.json({ message: err, status: false });
        return res.status(200).json({
          data: {
            medicalCerti,
          },
          status: true,
          message: "Applicant Medical Certi document status submitted",
        });
      });
    }
  });
};

exports.AdmissionFee = (req, res, next) => {
  const id = req.params.id;
  const { admissionFee } = req.body;
  ApplicantSchema.findById(id, (err, data) => {
    if (err) console.log(err);
    else {
      data.admissionFee = admissionFee;
      data.save((err) => {
        if (err) return res.json({ message: err, status: false });
        return res.status(200).json({
          status: true,
          message: `Applicant admission fee is ${admissionFee}`,
        });
      });
    }
  });
};

//seat allotment

exports.SeatAllotment = CatchErr(async (req, res, next) => {
  const {
    assignSection,
    assignClass,
    assignHouse,
    applicationNo,
    admissionNo,
    busRouteNo,
    stopageName,
  } = req.body;

  // let branch="Delhi"
  //  const totalschoolamount=await SchoolFeeStructureSchema.aggregate([
  //   {
  //   $match:{
  //     classFor:assignClass,location:branch
  //   }
  //   },
  //    {
  //      $group:{
  //        _id:"$classFor",
  //        totalamount:{
  //          $sum:"$amountSF"
  //        }
  //      }
  //    },
  //    {
  //      $project:{
  //        _id:0,
  //        totalamount:1
  //      }
  //    }
  //  ])
  //  let schoolamount=totalschoolamount[0].totalamount
  //  console.log(schoolamount)
  //  const totaltransportamount=await TransportFeeStructureSchema.aggregate([
  //   {
  //   $match:{
  //     classFor:assignClass,location:branch
  //   }
  //   },
  //    {
  //      $group:{
  //        _id:"$classFor",
  //        totalamount:{
  //          $sum:"$amountTF"
  //        }
  //      }
  //    },
  //    {
  //      $project:{
  //        _id:0,
  //        totalamount:1
  //      }
  //    }
  //  ])
  //  let Transportamount=totaltransportamount[0].totalamount
  //  console.log(Transportamount)
  //  const totaladmissionamount=await AdmissionFeeStructureSchema.aggregate([
  //   {
  //   $match:{
  //     classFor:assignClass,location:branch
  //   }
  //   },
  //    {
  //      $group:{
  //        _id:"$classFor",
  //        totalamount:{
  //          $sum:"$amountAF"
  //        }
  //      }
  //    },
  //    {
  //      $project:{
  //        _id:0,
  //        totalamount:1
  //      }
  //    }
  //  ])
  //  let admissionamount=totaladmissionamount[0].totalamount
  //  console.log(admissionamount)
  let dataschoolfee = await SchoolFeeStructureSchema.findOne({});
  let dataadmissionfee = await AdmissionFeeStructureSchema.findOne({});
  let datatransport = await TransportFeeStructureSchema.findOne({});

  if (!dataschoolfee || !dataadmissionfee || !datatransport) {
    return res.status(400).json({
      status: false,
      message: " Fee is not added for this Class ",
    });
  } else {
    let studentdata = await ApplicantSchema.findOne({
      registerationNo: applicationNo,
    });
    const {
      fullname,
      gender,
      assignClass,
      stream,
      registerationNo,
    } = studentdata;
    let gaurdianDetail = studentdata.gaurdianDetail;

    let schoolfee = dataschoolfee.amountSF;
    let admissionfee = dataadmissionfee.amountAF;
    let perdistance = datatransport.distance;
    let peramount = datatransport.amountTF;
    let transportfee = Math.round(peramount / perdistance);
    let dataStopage = await StopageSchema.findOne({ nameOfStop: stopageName });
    let distance = dataStopage.distanceFromSchool;
    let totaltransport = Math.round(distance * transportfee);
    let totalamount = Math.round(schoolfee + totaltransport);
    let quarterdata = await QuarterNameSchema.findOne({});
    let quaterlength = quarterdata.quarters.length;
    let yearAmount = totalamount * quaterlength;
    for (let i = 0; i < quaterlength; i++) {
      let q1 = (quarterdata.quarters[i].qFeePercentOne * yearAmount) / 100;
      quarterName = quarterdata.quarters[i].quarterName;
      quarterMonth = quarterdata.quarters[i].quarterMonth;
      dueDate = quarterdata.quarters[i].dueDate;
      qFeePercentOne = quarterdata.quarters[i].qFeePercentOne;
      startingMonth = quarterdata.quarters[i].startingMonth;
      endingMonth = quarterdata.quarters[i].endingMonth;
      quaterMonthName = quarterdata.quarters[i].quaterMonthName;
      quarterNumber = quarterdata.quarters[i].quarterNumber;
      quarteramount = q1;
      let data = new QuarterPaymentSchema({
        quarterName,
        quarterMonth,
        dueDate,
        qFeePercentOne,
        quarteramount,
        applicationNo: admissionNo,
        totalamount: yearAmount,
        year: new Date().getFullYear(),
        fullname,
        gender,
        assignClass,
        stream,
        registerationNo,
        gaurdianDetail,
        assignSection,
        startingMonth,
        endingMonth,
        quaterMonthName,
      });
      let savedata = await data.save();

      let datasavequarter = new ScheduleCollectionFee({
        quarterName,
        quarterMonth,
        dueDate,
        qFeePercentOne,
        startingMonth,
        endingMonth,
        quaterMonthName,
        assignSection,
        assignClass,
        admissionNo,
        applicationNo,
        fullname,
        stream,
      });
      let savequater = await datasavequarter.save();
    }
    let paymentdata = new TotalPaymentSchema({
      applicationNo: admissionNo,
      totalamount: yearAmount,
    });
    let savedata = await paymentdata.save();

    find_data = await ApplicantSchema.findOne({
      registerationNo: applicationNo,
    }).exec((err, data) => {
      if (err)
        return res.json({
          message: err,
          status: false,
        });
      data.assignClass = assignClass;
      data.assignHouse = assignHouse;
      data.assignSection = assignSection;
      data.seatAlot = true;
      data.admissionNo = admissionNo;
      data.busRouteNo = busRouteNo;
      data.stopageName = stopageName;

      data.save((err, data) => {
        if (err)
          return res.json({
            message: err,
            status: false,
          });
        return res.json({
          data: data,
          message: "Assign class and section is done.",
          status: true,
        });
      });
    });
  }
});
exports.GetlistOfSeatAllotment = async (req, res, next) => {
  // const page = parseInt(req.query.page);
  // const size = parseInt(req.query.size);

  // await ApplicantSchema.find({ seatAlot: true })
  //   .skip((page - 1) * size)
  //   .limit(size)
  //   .sort({ _id: -1 })
  //   .exec((err, list) => {
  //     if (err) return console.log(err);
  //     return res.send({ list: list });
  //   });

  const features = new APIFeatures(
    ApplicantSchema.find({ seatAlot: true }),
    req.query
  )
    .paginate()
    .filter()
    .sort()
    .limitFields();
  const data = await features.query;

  return res.status(200).json({
    data: data,
    message: "List of students",
  });
};

///Generate Addmission No.
exports.GenerateAdmissionNo = async (req, res, next) => {
  const id = req.params.id;
  let findapplicant=await AdmissionNoSchema.findOne({applicationNo:id})
  let find_data = await AdmissionNoSchema.find({}, (err, data) => {
    if (err)
      return res.json({
        message: err,
        status: false,
      });
    else {
      if(findapplicant){
        return res.status(400).json({
          status:false,
          message:`The Admission Number is Already Genrated for this Applicant admission number is ${findapplicant.admissionNo}`,
          data:findapplicant.admissionNo
        })
      }
      else{ 
        let len = data.length;
      let admissionNo = Number(`20210000${len + 1}`);
      let newdata = new AdmissionNoSchema({
        admissionNo,
        applicationNo: id,
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
          message: "generated successfully",
        });
      });
      }
      
    }
  });
};

exports.GetAlladmissionNo = async (req, res, next) => {
  await AdmissionNoSchema.find({})
    .sort({ _id: -1 })
    .exec(
      (err,
      (data) => {
        if (err) console.log(err);
        else return res.send({ data: data });
      })
    );
};

///confirmation admission report
exports.AdmissionReport = async (req, res, next) => {
  const id = req.body.admissionNo;

  try {
    const {
      dateOfAdmission,
      classIn,
      section,
      busRouteNo,
      stopageName,
      remaindermessage,
    } = req.body;
    let getDate = new Date(dateOfAdmission).toLocaleDateString();

    const find_applicant = await ApplicantSchema.findOne({ admissionNo: id });
    if (!find_applicant) {
      return res.json({
        status: false,
        message: "NO Application Number Found",
      });
    }
    find_applicant.dateOfAdmission = dateOfAdmission;
    find_applicant.save();

    const data = await new AdmissionReportSchema({
      dateOfAdmission,
      classIn,
      section,
      busRouteNo,
      remaindermessage,
      admissionNo: id,
      stopageName,
    });
    data.save((err, data) => {
      if (err) return res.json({ message: err, status: false });
      res.json({
        data: data,
        message: "AdmissionReport is send!!",
        status: true,
      });
    });
    await sendEmail(
      find_applicant.contactDetail[0].primaryEmail,
      `Hello ${find_applicant.fullname}
         your child Admission is confirmed.Please visit school fot other process .The  date is ${getDate}. 
         ${remaindermessage}`,
      find_applicant.fullname
    );

    return res.status(200).json({
      message: "AdmissionReport is send!!",
      status: true,
    });
  } catch (e) {
    return next(e);
  }
};

exports.GetStateByPincode=CatchErr(async(req,res,next)=>{
  const pincode=req.query.pincode
  let data=await pincodeDirectory.lookup(pincode)

      return res.json({
        data:data,
      })
})


const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
exports.Print = async (req, res, next) => {
  const id = req.params.id;

  const find_applicant = await AddPolicySchema.findById(id);
  // Create a document
  const doc = new PDFDocument();
  doc.text(
    " School No.: As allotted by CBSE                                                          CBSE Affiliation No.:",
    20,
    20,
    {
      lineBreak: true,
    }
  );

  doc.text(`                         School Name, Address and Logo`, 85, 85);
  doc.underline(55, 55, 450, 55, { color: "#A52A2A", width: "100px" });

  doc.fontSize(12).text(
    `                      ADMISSION POLICY

                          
  ${find_applicant.policy}`,
    120,
    120
  );

  doc.addPage();
  doc.text(
    " School No.: As allotted by CBSE                                                          CBSE Affiliation No.:",
    20,
    20,
    {
      lineBreak: true,
    }
  );
  doc.text(`                         School Name, Address and Logo`, 85, 85);
  doc
    .underline(55, 55, 450, 55, { color: "#A52A2A", width: "100px" })
    .fontSize(12);
  doc.font("Times-Bold").text(
    `                             Require Documents 


      Pre- Primary Classes`,
    120,
    120,
    { color: "#A52A2A" }
  );
  doc.underline(140, 120, 140, 55, { color: "black", width: "100px" });
  doc.font("Times-Roman");
  doc.text(
    ` 
     1-DOB Certificate
     2-SSSIM ID of the Child
     3-Aadhar Card of the Parents/Guardian
     4-PAN Card of the Parents/Guardian
     5-Medical Certificate from a Registered Medical Practitioner
     6-Proof of Address
  `,
    140,
    170
  );
  doc.font("Times-Bold").text("Sr. KG to Class XII", 140, 340);
  doc.underline(140, 300, 140, 55, { color: "black", width: "100px" });
  doc.font("Times-Roman").text(
    `

  1-DOB Certificate
  2-SSSIM ID of the Child
  3-Aadhar Card of the Child
  4-Aadhar Card of the Parents/Gaurdian
  5-PAN Card of the Parents/Gaurdian
  6- Report Card of Last 2 Academic Session(Applicable from class 3 onwards)
  7- Transfer certificate
  8- Medical Certificate from a Registered Medical Practitioner
  9- Bank Account Details of the Child
  10- Proof of Address
`,
    140,
    350
  );
  doc.font("Times-Bold").text(`Note:`, 120, 650);
  doc.underline(120, 607, 30, 55, { color: "black", width: "100px" });
  doc.text(
    `3 passport size photograph of the student and 3 coloured size photograph of the parent/Guardian`,
    160,
    650
  );

  // Add another page

  // Add some text with annotations
  // Finalize PDF file
  doc.end();
  res.setHeader("Content-Type", "application/pdf");
  doc.pipe(res);
};

exports.getCountrydata = async (req, res, next) => {
  const countriesList = worldMapData.getAllCountries();
  return res.send({ countriesList });
};
exports.getStatedata = async (req, res, next) => {
  const state = req.query.state;
  const statesList = worldMapData.getAllStatesFromCountry(state);
  return res.send({ statesList });
};

exports.getCitiesName = async (req, res, next) => {
  const city = req.query.city;
  const citiesList = worldMapData.getAllCitiesFromState(city);
  return res.send({ citiesList });
};

exports.AddFAQ = async (req, res, next) => {
  const {
    a1,
    a2,
    a3,
    a4,
    a5,
    a6,
    a7,
    a8,
    a9,
    a10,
    a11,
    a12,
    a13,
    a14,
    a15,
    a16,
    a17,
    a18,
    a19,
    a20,
    a21,
    a22,
    a23,
    a24,
    a25,
    a26,
    a27,
    a28,
    a29,
    a30,
    b1,
    b2,
    b3,
    b4,
    b5,
    b6,
    b7,
    b8,
    b9,
    b10,
    b11,
    b12,
    b13,
    b14,
    b15,
    b16,
    b17,
    b18,
    b19,
    b20,
    b21,
    b22,
    b23,
    b24,
    b25,
    b26,
    b27,
    b28,
    b29,
    b30,
    b31,
    b32,
    b33,
    b34,
    b35,
    b36,
    b37,
    b38,
    b39,
    b40,
    b41,
    b42,
    b43,
    b44,
    b45,
    c1,
    c2,
    c3,
    c4,
    c5,
    c6,
    c7,
    c8,
    c9,
    c10,
  } = req.body;

  let newdata = await new FAQSchema({
    a1,
    a2,
    a3,
    a4,
    a5,
    a6,
    a7,
    a8,
    a9,
    a10,
    a11,
    a12,
    a13,
    a14,
    a15,
    a16,
    a17,
    a18,
    a19,
    a20,
    a21,
    a22,
    a23,
    a24,
    a25,
    a26,
    a27,
    a28,
    a29,
    a30,
    b1,
    b2,
    b3,
    b4,
    b5,
    b6,
    b7,
    b8,
    b9,
    b10,
    b11,
    b12,
    b13,
    b14,
    b15,
    b16,
    b17,
    b18,
    b19,
    b20,
    b21,
    b22,
    b23,
    b24,
    b25,
    b26,
    b27,
    b28,
    b29,
    b30,
    b31,
    b32,
    b33,
    b34,
    b35,
    b36,
    b37,
    b38,
    b39,
    b40,
    b41,
    b42,
    b43,
    b44,
    b45,
    c1,
    c2,
    c3,
    c4,
    c5,
    c6,
    c7,
    c8,
    c9,
    c10,
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
      message: "FAQ answers are added Successfully",
    });
  });
};

exports.GetFAQanswers = async (req, res, next) => {
  try {
    const findData = await FAQSchema.find({})
      .sort({ _id: -1 })
      .limit(1);
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

exports.EditFaqAnswer = async (req, res, next) => {
  try {
    const id = req.params.id;

    let Update_data = await FAQSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (Update_data) {
      return res.json({
        data: Update_data,
        status: true,
        message: "Faq Ans is Updated",
      });
    } else if (Update_data.length === 0) {
      return res.json("0 list");
    } else {
      return res.json("Oops! an error occurr");
    }
  } catch (e) {
    return next(e);
  }
};

exports.PrintAdmissionForm = async (req, res, next) => {
  const id = req.params.id;

  const find_applicant = await ApplicantSchema.findById(id);
  // Create a document
  const doc = new PDFDocument();
  doc.text(
    " School No.: As allotted by CBSE                                                          CBSE Affiliation No.:",
    20,
    20,
    {
      lineBreak: true,
    }
  );

  doc.text(`                         School Name, Address and Logo`, 85, 85);
  doc.underline(55, 55, 450, 55, { color: "#A52A2A", width: "100px" });

  doc.fontSize(12).text(`                     Registration Form `, 120, 120);

  doc.text(
    `> Student Details 

    FirstName: ${find_applicant.firstName}

    MiddleName: ${find_applicant.middleName}
    
    LastName: ${find_applicant.lastName}

    Gender: ${find_applicant.gender}
    
    BloodGroup: ${find_applicant.bloodGroup}
    
    DateOfBirth: ${new Date(find_applicant.dateOfBirth).toLocaleDateString()}
  
    Stream: ${find_applicant.stream}
    
    Nationality: ${find_applicant.nationality}

    ClassApplyFor: ${find_applicant.classFor}
    
   CurrentClass: ${find_applicant.currentClass}
    
    
    ContactDetails: ----

    Street:  ${find_applicant.contactDetail[0].street1}
    City:     ${find_applicant.contactDetail[0].city}
    State:    ${find_applicant.contactDetail[0].state}
    Pincode:    ${find_applicant.contactDetail[0].pincode}
    LandMark:      ${find_applicant.contactDetail[0].landmark}
    PrimaryEmail:  ${find_applicant.contactDetail[0].primaryEmail}
   SecondaryEmail:  ${find_applicant.contactDetail[0].secondaryEmail}
   PrimaryContact:  ${find_applicant.contactDetail[0].primaryContact}
   SecondaryContact: ${find_applicant.contactDetail[0].secondaryContact}
    
    RegistrationNumber: ${find_applicant.registerationNo}
    
    `,
    100,
    140
  );
  doc.moveDown();
  doc.text(`> --------------Academic Record-------`, {
    width: 410,
    align: "left",
  });
  for (i = 0; i < find_applicant.academicRecord.length; i++) {
    let j = 40;
    doc.moveDown();
    doc.text(
      `acedemicYear:  ${find_applicant.academicRecord[i].acedemicYear}
        academicGrade: ${find_applicant.academicRecord[i].academicGrade}
        academicNameOfSchool: ${find_applicant.academicRecord[i].academicNameOfSchool}
        academicMarksheet: ${find_applicant.academicRecord[i].academicMarksheet}`,
      { width: 410, align: "left" }
    );
  }
  doc.moveDown();
  doc.text(`>--------------------Special Achievements--------`, {
    width: 410,
    align: "left",
  });
  for (i = 0; i < find_applicant.achievement.length; i++) {
    doc.moveDown();
    doc.text(
      `Area: ${find_applicant.achievement[i].area}
        Achievement: ${find_applicant.achievement[i].achievement}
        ParticipantLevel: ${find_applicant.achievement[i].participantLevel}`,
      { width: 410, align: "left" }
    );
  }

  doc.moveDown();
  doc.text(`>-----------------------Guardian Details:-----------`, {
    width: 410,
    align: "left",
  });
  for (i = 0; i < find_applicant.gaurdianDetail.length; i++) {
    doc.moveDown();
    doc.text(
      `
       gaurdianName: ${find_applicant.gaurdianDetail[i].gaurdianName}
      officeContact: ${find_applicant.gaurdianDetail[i].officeContact}
      gaurdianMobile1: ${find_applicant.gaurdianDetail[i].gaurdianMobile1}
      gaurdianMobile2: ${find_applicant.gaurdianDetail[i].gaurdianMobile2}
      gaurdianMobile3: ${find_applicant.gaurdianDetail[i].gaurdianMobile3}
      relation: ${find_applicant.gaurdianDetail[i].relation}
      gaurdianEmail: ${find_applicant.gaurdianDetail[i].gaurdianEmail}
      gaurdianEducation:${find_applicant.gaurdianDetail[i].gaurdianEducation}
      gaurdianOccupation: ${find_applicant.gaurdianDetail[i].gaurdianOccupation}}`,
      { width: 410, align: "left" }
    );
  }
  doc.moveDown();
  doc.text(`>----------------Sibling Details:-----------`, {
    width: 410,
    align: "left",
  });
  for (i = 0; i < find_applicant.siblingDetail.length; i++) {
    doc.moveDown();
    doc.text(
      `
     fullNameOfSibling: ${find_applicant.siblingDetail[i].fullNameOfSibling}
     classOfSibling: ${find_applicant.siblingDetail[i].classOfSibling}
     genderOfSibling: ${find_applicant.siblingDetail[i].genderOfSibling}
     siblingSchool: ${find_applicant.siblingDetail[i].siblingSchool}
      }}`,
      { width: 410, align: "left" }
    );
  }

  // Add another page

  // Add some text with annotations
  // Finalize PDF file

  doc.end();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    'inline:filename="' + "Registration Form" + '"'
  );
  doc.pipe(res);
};

exports.PrintFeeRecipt = async (req, res, next) => {
  const id = req.params.id;

  const find_applicant = await FeeRecipt.findById(id);
  // Create a document
  const doc = new PDFDocument();
  doc.text(
    " School No.: As allotted by CBSE                                                          CBSE Affiliation No.:",
    20,
    20,
    {
      lineBreak: true,
    }
  );

  doc.text(`                         School Name, Address and Logo`, 85, 85);
  doc.underline(55, 55, 450, 55, { color: "#A52A2A", width: "100px" });

  doc.fontSize(12).text(`                    Fee Receipt `, 120, 120);

  doc.text(
    `
    

    Admission Number: ${find_applicant.admissionNo}

    Student Status: ${find_applicant.studentStatus}
    
    Quarter: ${find_applicant.quarter}

    Amount Paid: ${find_applicant.paidAmount}
    
    Outstanding Balance: ${find_applicant.outstanding}
    
    DateOfPayment: ${new Date(
      find_applicant.dateOfPayment
    ).toLocaleDateString()}
  
    Payment Mode: ${find_applicant.paymentMode}
   
    `
  );

  doc.end();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    'inline:filename="' + "Registration Form" + '"'
  );
  doc.pipe(res);
};

/*

 let schoolfee=await SchoolFeeStructureSchema.findOne({classFor})
let admissionfee=await AdmissionFeeStructure.findOne({classFor})
 let transportfee=await TransportFeeStructure.findOne({classFor})
  let pertrans= transportfee/km
  let transfee=pertrans*distance
   let total=schoolfee+admissionfee+transfee

   let data=new totalpayment({
         total,application nhhumber
   })
    
  
  
  */
