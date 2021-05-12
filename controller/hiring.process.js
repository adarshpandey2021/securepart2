const fs = require('fs');
const EmployeeSchema = require('../model/hiringProcess/applicationForm');
const { sendEmail } = require('../mailservice/mailservice');
const MailInfoInterview = require('../model/hiringProcess/interviewMailInfo');
const MailInfoOfferLetter = require('../model/hiringProcess/offerLetterMailInfo');
const MailInfoScreening = require('../model/hiringProcess/screeningMailInfo');
const catchAsync = require('../utils/catchAsync');
const respond = require('../utils/respond');
const factory = require('../controller/handlerFactory');
// const appFeatures = require("../utils/apiFeatures");

exports.getEmployeeDetails = factory.getAll(EmployeeSchema);
exports.getEmployee = factory.getOne(EmployeeSchema);
exports.updateApplicationForm = factory.updateOne(EmployeeSchema);
exports.deleteApplicationForm = factory.deleteOne(EmployeeSchema);

exports.setEmployeeDetails = catchAsync(async (req, res, next) => {
  const {
    firstName,
    middleName,
    lastName,
    bloodGroup,
    gender,
    dateOfBirth,
    nationality,
    street,
    city,
    state,
    consent,
    pincode,
    yearsOfExperience,
    nearestLandmark,
    primaryEmail,
    secondaryEmail,
    primaryContact,
    secondaryContact,
    contactRelation,
    educationQualification,
    professionalQualification
  } = req.body;

  // console.log(req.body);

  //   let [uploadCv, photo] = req.files;

  //   uploadCv = uploadCv.path;
  //   photo = photo.path;

  // console.log(req.files.uploadEmployeePhoto);

  const applicant = await EmployeeSchema.create({
    firstName,
    middleName,
    lastName,
    bloodGroup,
    gender,
    consent,
    dateOfBirth,
    yearsOfExperience,
    street,
    city,
    state,
    pincode,
    nearestLandmark,
    primaryEmail,
    secondaryEmail,
    primaryContact,
    secondaryContact,
    contactRelation,
    nationality,
    Cv: req.files.uploadEmployeeCv[0].path,
    photo: req.files.uploadEmployeePhoto[0].path,
    educationQualification,
    professionalQualification
  });
  return respond(res, 201, applicant);
});

exports.getEmployeePhoto = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const employee = await EmployeeSchema.findById(id);
  const readStream = fs.createReadStream(employee.photo);

  // res.setHeaders('Content-Type',)
  readStream.pipe(res);
});

exports.getEmployeeCv = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const employee = await EmployeeSchema.findById(id);
  const readStream = fs.createReadStream(employee.Cv);

  // res.setHeaders('Content-Type',)
  readStream.pipe(res);
});

exports.shortlistingForHiring = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { interviewScore, statusForHiring, department, role } = req.body;
  // console.log(id);
  const employee = await EmployeeSchema.findById(id);

  employee.shortlist = statusForHiring;

  employee.interviewScore = interviewScore;
  employee.statusForHiring = statusForHiring;
  employee.totalScore = interviewScore * 1 + employee.screeningTestScore;
  employee.department = department;
  employee.role = role;

  const doc = await employee.save();

  return respond(
    res,
    200,
    doc,
    `Employee status for hiring is ${statusForHiring}`
  );
});

exports.sendNotificationOfScreening = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const {
    screeningDate,
    departmentName,
    role,
    vacantPosition,
    screeningTime,
    reminderMsg
  } = req.body;

  const employee = await EmployeeSchema.findById(id);

  await sendEmail(
    // employee.primaryEmail,
    'securelearningtesting@gmail.com',

    `Hello ${employee.firstName} ${employee.lastName} 
        you are shortlisted for offline exam.The date for your exam is ${screeningDate}. 
        Timing: Exam start at sharp ${screeningTime}.
         ${reminderMsg}`,

    employee.firstName
  );

  employee.department = departmentName;
  employee.role = role;

  await MailInfoScreening.create({
    screeningDate,
    screeningTime,
    reminderMsg,
    departmentName,
    role,
    vacantPosition,
    applicationNo: id
  });

  employee.save();

  return respond(res, 200, null, 'The email for the schedule is sent.');
});

exports.sendNotificationForInterview = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { interviewDate, interviewTime, reminderMsg } = req.body;

  const employee = await EmployeeSchema.findById(id);

  await sendEmail(
    employee.primaryEmail,
    // "securelearningtesting@gmail.com",

    `Hello ${employee.firstName} ${employee.lastName} 
        you are shortlisted for Interview.
        The date for your interview is ${interviewDate}. 
        Timing: Interview starts at sharp ${interviewTime}.
         ${reminderMsg}`,
    employee.firstName
  );

  await MailInfoInterview.create({
    applicationNo: id,
    interviewDate,
    interviewTime
  });

  return respond(res, 200, null, 'The email for the schedule is sent.');
});

exports.sendNotificationForOfferLetter = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { departmentName, role, reminderMsg } = req.body;
  const employee = await EmployeeSchema.findById(id);

  await sendEmail(
    employee.primaryEmail,
    // "securelearningtesting@gmail.com",

    `Hello ${employee.firstName} ${employee.lastName} 
      Congratulation you are selected for ${role} in the ${departmentName}.
         ${reminderMsg}`,
    employee.firstName
  );

  await MailInfoOfferLetter.create({
    applicationNo: id,
    departmentName,
    role,
    offerLetter: req.file.path
  });

  employee.offerLetter = req.file.path;

  await employee.save();

  return respond(res, 200, null, 'The email for the schedule is sent.');
});

// exports.setShortList = catchAsync(async (req, res, next) => {
//   const { id, shortlist } = req.body;

//   const employee = await EmployeeSchema.findById(id);

//   if (!employee)
//     return next(new AppError('No Employee of this Id is present', 404));

//   employee.shortlist = shortlist;

//   await employee.save();

//   return res.status(200).json({
//     status: true,
//     message: `Application is ${shortlist}`
//   });
// });

// exports.getShortListed = catchAsync(async (req, res, next) => {
//   const { shortlist } = req.body;

//   const employees = await EmployeeSchema.find({
//     shortlist
//   }).select('-__v -createdAt -updatedAt');

//   res.send({ data: employees });
// });

// exports.shortlistingForInterview = catchAsync(async (req, res, next) => {
//   const { id, screeningTestScore, statusForInterview } = req.body;

//   // console.log(screeningTestScore, statusForInterview);

//   const employee = await EmployeeSchema.findById(id);

//   employee.shortlist = statusForInterview;

//   employee.screeningTestScore = screeningTestScore;
//   employee.statusForInterview = statusForInterview;

//   await employee.save();

//   // console.log(employee);
//   res.status(201).json({
//     status: true,
//     message: `Employee status for interview is ${statusForInterview}`
//   });
// });

// exports.getEmployeeDetails = catchAsync(async (req, res, next) => {
//   const employees = await EmployeeSchema.find({ deleted: false }).select(
//     '-__v -createdAt -updatedAt'
//   );

//   res.send({
//     data: employees,
//     status: true,
//     message: 'Employee List'
//   });
// });

// exports.getEmployee = catchAsync(async (req, res, next) => {
//   const { id } = req.params;

//   const employee = await EmployeeSchema.findById(id).select(
//     '-__v -createdAt -updatedAt'
//   );

//   res.status(200).json({
//     data: employee,
//     status: true,
//     message: 'Employee Details'
//   });
// });

// exports.offerLetterAcceptance = catchAsync(async (req, res, next) => {
//   const { id, statusOfAcceptance, department, role } = req.body;

//   const employee = await EmployeeSchema.findById(id);

//   employee.department = department;
//   employee.role = role;
//   employee.acceptanceOfferLetter = statusOfAcceptance;

//   await employee.save();

//   return res.status(200).json({
//     status: true,
//     message: `Employee status for Offer Acceptance is ${statusOfAcceptance}`
//   });
// });

// exports.setDate = catchAsync(async (req, res, next) => {
//   //dd-mm-yyyy
//   const { name, startDate, lastDate } = req.body;

//   const dateModel = await DateModel.create({
//     name,
//     startDate: new Date(
//       startDate
//         .split('/')
//         .reverse()
//         .join('/')
//     ).getTime(),
//     lastDate: new Date(
//       lastDate
//         .split('/')
//         .reverse()
//         .join('/')
//     ).getTime()
//   });

//   return res.status(200).json({
//     status: true,
//     data: dateModel,
//     message: `Success`
//   });
// });

// exports.getDate = catchAsync(async (req, res, next) => {
//   const date = await DateModel.find({
//     startDate: { $lte: new Date().getTime() },
//     lastDate: { $gte: new Date().setDate(new Date().getDate() - 1) }
//   });
//   return res.status(200).json({
//     status: true,
//     data: date,
//     message: `success`
//   });
// });
// exports.deleteApplicationForm = catchAsync(async (req, res, next) => {
//   const { id } = req.params;

//   const deletedApplicationForm = await EmployeeSchema.findByIdAndUpdate(
//     id,
//     { deleted: true },
//     { new: true }
//   );

//   if (!deletedApplicationForm)
//     next(new AppError('No application form is present with this Id', 404));

//   return res.status(200).json({
//     status: true,
//     data: deletedApplicationForm,
//     message: `success`
//   });
// });
