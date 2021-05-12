/* eslint-disable no-underscore-dangle */
const Employee = require('../../model/employee/employeeModel');
const employeeLeavePolicyModel = require('../../model/employeeLeave/leavePolicy');
const MonthlyAttendance = require('../../model/finance/payroll/monthlyAttendance');
const APIFeatures = require('../../utils/apiFeatures');
// const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const nextError = require('../../utils/nextError');
const respond = require('../../utils/respond');
const factory = require('../handlerFactory');

// exports.getAllMonthlyAttendance = factory.getAll(MonthlyAttendance);
exports.deleteMonthlyAttendance = factory.deleteOne(MonthlyAttendance);
exports.getSingleMonthlyAttendance = factory.getOne(MonthlyAttendance);

const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
  // Here January is 0 based
  // return new Date(year, month+1, 0).getDate();
};

const sundays = (year, month) => {
  let day, counter, date;

  day = 1;
  counter = 0;
  date = new Date(year, month, day);
  while (date.getMonth() === month) {
    if (date.getDay() === 0) {
      // Sun=0, Mon=1, Tue=2, etc.
      counter += 1;
    }
    day += 1;
    date = new Date(year, month, day);
  }
  return counter;
};

// const endOfMonth = date => new Date(date.getFullYear(), date.getMonth() + 1, 0);

exports.getAllMonthlyAttendance = catchAsync(async (req, res, next) => {
  // const employees = await Employee.find();
  let totalWorkingDays = 0;
  let noOfSundays = 0;
  let actualWorkingDays = 0;
  const currentMonth = new Date().getUTCMonth();
  const currentYear = new Date().getUTCFullYear();

  const gazettedLeaves = await employeeLeavePolicyModel.findById('LP00001');

  if (!gazettedLeaves || gazettedLeaves.gazettedHolidays.length === 0)
    nextError(next, 'No Gazetted Leaves found please add them', 400);

  const noGazettedLeaves = gazettedLeaves.gazettedHolidays.reduce(
    (holidays, e) => {
      if (new Date(e.date).getUTCMonth() === currentMonth)
        if (new Date(e.date).getDay() !== 0) return holidays + 1;
        else return holidays;
      else return holidays;
    },
    0
  );

  totalWorkingDays = getDaysInMonth(currentMonth, currentYear);
  noOfSundays = sundays(currentYear, currentMonth);
  actualWorkingDays = totalWorkingDays - noOfSundays - noGazettedLeaves;

  // const dt = new Date();

  const features = new APIFeatures(
    Employee.find().populate({
      path: 'roleId',
      select: 'role departmentName'
    }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();
  // const doc = await features.query.explain();

  const doc = await features.query;

  if (!doc)
    nextError(
      next,
      'No Employee is found please check the query params or create employee',
      400
    );

  const employeeMonthly = doc.map(e => {
    const employee = {};
    let unPaidLeavesThisMonth = 0;
    let halfPaidLeavesThisMonth = 0;
    employee.actualWorkingDays = actualWorkingDays;
    if (new Date(e.paidLeavesThisMonth.month).getUTCMonth() === currentMonth) {
      employee.paidLeavesThisMonth = e.paidLeavesThisMonth.noOfDays;
      employee.actualWorkingDays -= e.paidLeavesThisMonth.noOfDays;
    }
    if (
      new Date(e.unPaidLeavesThisMonth.month).getUTCMonth() === currentMonth
    ) {
      employee.unPaidLeavesThisMonth = e.unPaidLeavesThisMonth.noOfDays;
      unPaidLeavesThisMonth = e.unPaidLeavesThisMonth.noOfDays;
      employee.actualWorkingDays -= e.unPaidLeavesThisMonth.noOfDays;
    }
    if (
      new Date(e.halfPaidLeavesThisMonth.month).getUTCMonth() === currentMonth
    ) {
      employee.halfPaidLeavesThisMonth = e.halfPaidLeavesThisMonth.noOfDays;
      halfPaidLeavesThisMonth = e.halfPaidLeavesThisMonth.noOfDays;
      employee.actualWorkingDays -= e.halfPaidLeavesThisMonth.noOfDays / 2;
    }
    employee._id = e._id;
    employee.name = e.firstName;
    employee.department = e.department;
    employee.roleId = e.roleId;
    employee.totalWorkingDays = totalWorkingDays;
    employee.noOfSundays = noOfSundays;
    employee.noGazettedLeaves = noGazettedLeaves;
    employee.grossSalary =
      (e.grossSalary / totalWorkingDays) *
      (totalWorkingDays - unPaidLeavesThisMonth - halfPaidLeavesThisMonth / 2);

    return employee;
  });

  // const data = {
  //   noGazettedLeaves,
  //   allEmployeesLeave,
  //   totalWorkingDays,
  //   noOfSundays,
  //   actualWorkingDays
  // };
  respond(
    res,
    200,
    employeeMonthly,
    'The monthly attendance of all the employees'
    // employees.length
  );
});

exports.createMonthlyAttendance = catchAsync(async (req, res, next) => {
  const month = new Date(req.body.monthEffectiveFrom).getMonth() + 1;
  const year = new Date(req.body.monthEffectiveFrom).getFullYear();
  const { employee } = req.body;
  const assignSalaryStructureCheck = await MonthlyAttendance.findOne({
    employee,
    month,
    year,
    deleted: false
  });

  req.body.month = month;
  req.body.year = year;

  if (assignSalaryStructureCheck) {
    return nextError(
      next,
      'This employee already contains this month attendance.',
      400
    );
  }

  const monthlyAttendance = await MonthlyAttendance.create(req.body);

  return respond(
    res,
    201,
    monthlyAttendance,
    'The monthly attendance is created'
  );
});

exports.updateMonthlyAttendance = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  let month = 0;
  let year = 0;
  if (req.body.monthEffectiveFrom) {
    month = new Date(req.body.monthEffectiveFrom).getMonth() + 1;
    year = new Date(req.body.monthEffectiveFrom).getFullYear();
    req.body.monthEffectiveFrom = undefined;
    req.body.month = month;
    req.body.year = year;
  }

  const monthlyAttendance = await MonthlyAttendance.findOneAndUpdate(
    { _id: id, deleted: false },
    req.body,
    { new: true }
  );

  if (!monthlyAttendance) {
    return nextError(
      next,
      'No such assign salary is present. Please check the id',
      404
    );
  }

  return respond(res, 200, monthlyAttendance, 'Updated the monthly attendance');
});

// exports.getAllMonthlyAttendance = async (req, res, next) => {
//   try {
//     const allMonthlyAttendance = await MonthlyAttendance.find({
//       deleted: false,
//     });

//     if (!allMonthlyAttendance || !allMonthlyAttendance.length)
//       throw new Error("No monthly attendance is present");

//     return res.status(200).json({
//       status: true,
//       data: allMonthlyAttendance,
//       message: "The list of the monthly attendance",
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

// exports.getCustomMonthlyAttendance = async (req, res, next) => {
//   try {
//     req.body.deleted = false;
//     const monthlyAttendance = await MonthlyAttendance.find(req.body);
//     if (!monthlyAttendance)
//       throw new Error(
//         'No data is found with this query. Please change the fields'
//       );

//     return res.status(200).json({
//       status: true,
//       data: monthlyAttendance,
//       message: 'The list of the monthly attendance'
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

// exports.getSingleMonthlyAttendance = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const monthlyAttendance = await MonthlyAttendance.findOne({
//       _id: id,
//       deleted: false
//     });
//     if (!monthlyAttendance)
//       throw new Error('No monthly attendance of this id is present');

//     return res.status(200).json({
//       status: true,
//       data: monthlyAttendance,
//       message: 'Fetched the monthly attendance'
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

// exports.deleteMonthlyAttendance = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const monthlyAttendance = await MonthlyAttendance.findByIdAndUpdate(
//       id,
//       { deleted: true },
//       { new: true }
//     );

//     if (!monthlyAttendance)
//       throw new Error(
//         'No such monthly attendance is present. Please check the id'
//       );

//     return res.status(200).json({
//       status: true,
//       data: monthlyAttendance,
//       message: 'Deleted the monthly attendance'
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

// exports.getAllMonthlyAttendanceForSingleEmployee = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const allMonthlyAttendance = await MonthlyAttendance.find({
//       employee: id,
//       deleted: false
//     });
//     if (!allMonthlyAttendance || !allMonthlyAttendance.length)
//       throw new Error('No monthly attendance available for this employee');

//     return res.status(200).json({
//       status: true,
//       data: allMonthlyAttendance,
//       message: 'All monthly attendance for the employee'
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };
