const CreateDepartmentSchema = require('../model/hrAndAdmin/department');
const CreateRoleSchema = require('../model/hrAndAdmin/createrole');
const CreateHolidaysSchema = require('../model/hrAndAdmin/holiday');
const VacancySchema = require('../model/hrAndAdmin/vacancy');
const NotificationSchema = require('../model/hrAndAdmin/hiringprocess.notification');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const respond = require('../utils/respond');
const nextError = require('../utils/nextError');

// const mongoose = require('mongoose');

exports.getSingleDepartment = factory.getOne(
  CreateDepartmentSchema,
  'Fetched the department'
);
exports.GetCreateDepartment = factory.getAll(CreateDepartmentSchema);
exports.deleteDepartment = factory.deleteOne(CreateDepartmentSchema);
exports.updateDepartment = factory.updateOne(CreateDepartmentSchema);

exports.CreateDepartment = catchAsync(async (req, res, next) => {
  const {
    departmentName,
    parentDepartment,
    addCategory,
    leaveBlockList,
    leaveApprove,
    onDutyApprove
  } = req.body;

  const check = await CreateDepartmentSchema.findOne({ departmentName });
  if (check) return nextError(next, 'The department is already created.', 400);

  const department = await CreateDepartmentSchema.create({
    departmentName,
    parentDepartment,
    addCategory,
    leaveBlockList,
    approver: [
      {
        leaveApprover: [{ leaveApprove }],
        onDutyApprover: [{ onDutyApprove }]
      }
    ]
  });

  return respond(res, 201, department, 'The Department is created.');
});

exports.getDepartmentName = async (req, res, next) => {
  try {
    const departmentNames = await CreateDepartmentSchema.find({
      deleted: false
    }).select('departmentName');

    if (!departmentNames || !departmentNames.length)
      throw new Error('No department names are present');

    return res.status(200).json({
      status: true,
      data: departmentNames,
      message: 'Fetched the department name'
    });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: false });
  }
};

exports.getSingleRole = factory.getOne(CreateRoleSchema);
exports.deleteRole = factory.deleteOne(CreateRoleSchema);
exports.GetCreateRole = factory.getAll(CreateRoleSchema);
exports.updateRole = factory.updateOne(
  CreateDepartmentSchema,
  'Updated the role'
);

exports.CreateRole = catchAsync(async (req, res, next) => {
  const {
    department,
    departmentName,
    description,
    role,
    skill,
    digitalCompetence,
    qualification
  } = req.body;
  const check = await CreateRoleSchema.findOne({ departmentName, role });

  if (check) return nextError(next, 'The role is already created.', 400);

  const newRole = await CreateRoleSchema.create({
    department,
    departmentName,
    description,
    role,
    requiredSkill: [{ skill }],
    academicqualification: [{ qualification }],
    digitalCompetence: [{ digitalCompetence }]
  });

  return respond(res, 201, newRole, 'Role is created.');
});

exports.getRoleNameForDepartment = catchAsync(async (req, res, next) => {
  const department = req.params.id;
  const roleName = await CreateRoleSchema.find({
    department,
    deleted: false
  }).select('role');

  if (!roleName || !roleName.length)
    throw new Error('No department names are present');

  return respond(res, 201, roleName, 'Role is created.');
});

// exports.getSingleDepartment = async (req, res, next) => {
//   try {
//     const id = req.params.id;

//     const department = await CreateDepartmentSchema.findById(id);
//     if (!department) throw new Error('No department of this id is present');

//     return res.status(200).json({
//       status: true,
//       data: department,
//       message: 'Fetched the department'
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

// exports.updateDepartment = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const department = await CreateDepartmentSchema.findOneAndUpdate(
//       { _id: id, deleted: false },
//       req.body,
//       { new: true }
//     );
//     return res.status(201).json({
//       status: true,
//       data: department,
//       message: 'Updated the department'
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

// exports.deleteDepartment = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const department = await CreateDepartmentSchema.findByIdAndUpdate(
//       id,
//       { deleted: true },
//       { new: true }
//     );
//     return res.status(200).json({
//       status: true,
//       data: department,
//       message: "Deleted the department",
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

// exports.GetCreateDepartment = async (req, res, next) => {
//   try {
//     const department = await CreateDepartmentSchema.find({ deleted: false });

//     if (!department) throw new Error('No department are created yet');
//     return res.status(200).json({
//       status: true,
//       data: department,
//       message: 'The List of all department'
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

// exports.GetCreateRole = async (req, res, next) => {
//   try {
//     const role = await CreateRoleSchema.find({ deleted: false });

//     if (!role) throw new Error('No role are created yet');
//     return res.status(200).json({
//       status: true,
//       data: role,
//       message: 'The List of all role'
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

// exports.getSingleRole = async (req, res, next) => {
//   try {
//     const id = req.params.id;

//     const role = await CreateRoleSchema.findById(id);
//     if (!role) throw new Error("No role of this id is present");

//     return res.status(200).json({
//       status: true,
//       data: role,
//       message: "Fetched the role",
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

// exports.updateRole = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const role = await CreateRoleSchema.findOneAndUpdate(
//       { _id: id, deleted: false },
//       req.body,
//       {
//         new: true
//       }
//     );
//     return res.status(201).json({
//       status: true,
//       data: role,
//       message: 'Updated the role'
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

// exports.deleteRole = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const role = await CreateRoleSchema.findByIdAndUpdate(
//       id,
//       { deleted: true },
//       { new: true }
//     );
//     return res.status(200).json({
//       status: true,
//       data: role,
//       message: "Deleted the role",
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

///holiday

exports.CreateHolidays = (req, res, next) => {
  const { holidayName, fromDate, toDate, total, weeklyOff } = req.body;

  let newdata = new CreateHolidaysSchema({
    holidayName,
    fromDate,
    toDate,
    total,
    addWeekHoliday: [{ weeklyOff }]
  });
  newdata.save((data, err) => {
    if (err)
      return res.json({
        error: err,
        status: false
      });

    return res.json({
      data: {
        holidayName,
        fromDate,
        toDate,
        total,
        addWeekHoliday: {
          weeklyOff
        }
      },
      status: true,
      message: 'Holiday List is created'
    });
  });
};

exports.GetCreateHolidays = async (req, res, next) => {
  try {
    const findData = await CreateHolidaysSchema.find({});
    if (findData) {
      return res.json({ data: findData });
    }
    if (findData.length === 0) {
      return res.json('0 list');
    }
    return res.json('Oops! an error occurr');
  } catch (e) {
    return next(e);
  }
};

/// Vacancy details
exports.Vacancy = (req, res, next) => {
  const { departmentName, role, noOfVacancy, lastDate } = req.body;

  let newdata = new VacancySchema({
    departmentName,
    role,
    noOfVacancy,
    lastDate
  });

  newdata.save((data, err) => {
    if (err)
      return res.json({
        error: err,
        status: false
      });

    return res.json({
      data: {
        departmentName,
        role,
        noOfVacancy,
        lastDate
      },
      status: true,
      message: 'Vacancy requisition is created'
    });
  });
};

exports.GetVacancy = async (req, res, next) => {
  try {
    const findData = await VacancySchema.find({});
    if (findData) {
      return res.json({ data: findData });
    }
    if (findData.length === 0) {
      return res.json('0 list');
    }
    return res.json('Oops! an error occurr');
  } catch (e) {
    return next(e);
  }
};

/////hiring process :notification

exports.Notification = (req, res, next) => {
  const {
    departmentName,
    role,
    jobProfile,
    jobDescription,
    skillReq,
    qualificationReq
  } = req.body;

  let newdata = new NotificationSchema({
    departmentName,
    role,
    jobProfile,
    jobDescription,
    skillReq,
    qualificationReq
  });
  newdata.save((data, err) => {
    if (err)
      return res.json({
        error: err,
        status: false
      });

    return res.json({
      data: {
        departmentName,
        role,
        jobProfile,
        jobDescription,
        skillReq,
        qualificationReq
      },
      status: true,
      message: 'Notification for Job is Created'
    });
  });
};

exports.GetNotification = async (req, res, next) => {
  try {
    const findData = await NotificationSchema.find({});
    if (findData) {
      return res.json({ data: findData });
    }
    if (findData.length === 0) {
      return res.json('0 list');
    }
    return res.json('Oops! an error occurr');
  } catch (e) {
    return next(e);
  }
};

/// Application form for Job

exports.ApplicationForm = (req, res, next) => {};
