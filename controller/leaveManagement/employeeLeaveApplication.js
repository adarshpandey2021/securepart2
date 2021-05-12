const EmployeeLeave = require('../../model/employeeLeave/leaveApplication');
const EmployeeModel = require('../../model/employee/employeeModel');
const DepartmentLeavePolicy = require('../../model/employeeLeave/leavePolicy');
const catchAsync = require('../../utils/catchAsync');
const respond = require('../../utils/respond');
// const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');
const nextError = require('../../utils/nextError');

exports.deleteEmployeeLeave = factory.deleteOne(EmployeeLeave);
exports.getSingleEmployeeLeave = factory.getOne(EmployeeLeave);
exports.getEmployeeLeave = factory.getAll(EmployeeLeave);

const differenceBetweenDates = (toDate, fromDate, noOfDays) => {
  const from = new Date(fromDate);
  const to = new Date(toDate);
  const diffTime = Math.abs(to - from);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  // console.log(diffTime + " milliseconds");
  // console.log(diffDays + " days");
  return noOfDays * 1 === diffDays;
};

exports.createEmployeeLeave = catchAsync(async (req, res, next) => {
  const {
    employeeId,
    employeeName,
    employee,
    departmentName,
    departmentId,
    roleId,
    role,
    fromDate,
    toDate,
    typeOfLeave,
    noOfDays,
    reason,
    majorTasks,
    contactNo
  } = req.body;

  // const employeeLeaveCheck = await EmployeeModel.findById(employeeId);

  // if(!employeeLeaveCheck) throw new Error ("Your Initial leave is pending. You can't apply for more than one leave at a time.");
  const currentEmployee = await EmployeeModel.findOne(
    { employeeId },
    { deleted: false }
  );

  if (!currentEmployee) return nextError(next, 'Employee Id is incorrect', 404);

  if (typeOfLeave !== 'halfDayLeave')
    if (!toDate) nextError(next, 'Please provide the to date.', 400);
  if (!differenceBetweenDates(toDate, fromDate, noOfDays) === true)
    return nextError(
      next,
      'Please check the no of days according to the from and the to date.',
      400
    );
  // console.log(currentEmployee, departmentName, role);
  const departmentLeave = await DepartmentLeavePolicy.findOne({
    departmentId,
    roleId,
    deleted: false
  });

  // console.log(departmentLeave);

  if (!departmentLeave || !departmentLeave.otherLeaves[0])
    return nextError(next, 'No leave are created for this department', 400);

  // console.log(departmentLeave);
  const leaves = departmentLeave.otherLeaves[0];

  // console.log(leaves);

  if (!leaves) {
    return nextError(
      next,
      "The department hasn't created the leave policy for this role. Please contact to the supervisor",
      404
    );
  }
  if (!leaves[typeOfLeave])
    return nextError(next, `${typeOfLeave} is not available`, 404);

  const totalNoOfLeaves = leaves[typeOfLeave];
  const takenLeaves = currentEmployee.takenLeaves[0][typeOfLeave];
  const selectedLeaveRemaining = totalNoOfLeaves - takenLeaves;

  if (selectedLeaveRemaining < noOfDays) {
    return nextError(
      next,
      `You only have ${selectedLeaveRemaining} days of ${typeOfLeave}.`,
      404
    );
  }

  const employeeLeave = await EmployeeLeave.create({
    employeeId,
    employeeName,
    employee,
    departmentId,
    roleId,
    departmentName,
    role,
    fromDate,
    typeOfLeave,
    noOfDays,
    reason,
    majorTasks,
    contactNo
  });

  return respond(res, 201, employeeLeave, 'Leave is registered');
});

exports.updateEmployeeLeave = catchAsync(async (req, res, next) => {
  // eslint-disable-next-line no-unused-vars
  const { id, typeOfLeave, status, ...updateData } = req.body;

  if (!updateData)
    return nextError(next, 'Please provide field to update', 400);

  const employeeLeaveCheck = await EmployeeLeave.findOne({
    _id: id,
    deleted: false
  });

  if (!employeeLeaveCheck)
    return nextError(next, 'No such leave is present', 404);

  if (employeeLeaveCheck.status === 'Approved') {
    return nextError(
      next,
      "Leave Application is already approved you can't edit it.",
      400
    );
  }

  const employeeLeave = await EmployeeLeave.findOneAndUpdate(
    { _id: id, deleted: false },
    updateData,
    { new: true }
  ).select('-__v -createdAt -updatedAt');

  if (!employeeLeave) return nextError(next, 'No such leave is present', 404);

  return respond(res, 200, employeeLeave, 'The Employee Leave is updated');
});

exports.resetEmployeeLeave = catchAsync(async (req, res, next) => {
  await EmployeeModel.updateMany(
    { deleted: false },
    {
      takenLeaves: [{ forYear: new Date().getUTCFullYear() }]
    }
  );
  return respond(res, 200, undefined, 'All employees are updated');
});

exports.updateStatus = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { ...updateData } = req.body;

  if (!updateData)
    return nextError(next, 'Please provide field to update', 400);
  const employeeLeave = await EmployeeLeave.findOneAndUpdate(
    { _id: id, deleted: false },
    updateData,
    { new: true }
  ).select('-__v -createdAt -updatedAt');

  if (!employeeLeave)
    return nextError(next, 'No leave application of this id is present', 404);
  const { employeeId } = employeeLeave;
  const { typeOfLeave } = employeeLeave;

  const employee = await EmployeeModel.findOne({ employeeId });
  if (!employee.takenLeaves[0])
    return nextError(
      next,
      'Please create the department and role first than Employee',
      400
    );

  employee.takenLeaves[0][typeOfLeave] += parseInt(employeeLeave.noOfDays);

  switch (typeOfLeave) {
    case 'leaveWithoutPay':
      if (
        employee.unPaidLeavesThisMonth.month.getUTCMonth() ===
        new Date().getUTCMonth()
      )
        employee.unPaidLeavesThisMonth.noOfDays += employeeLeave.noOfDays;
      else {
        employee.unPaidLeavesThisMonth.noOfDays = employeeLeave.noOfDays;
        employee.unPaidLeavesThisMonth.month = new Date();
      }
      break;

    case 'halfDayLeave':
      if (
        employee.halfPaidLeavesThisMonth.month.getUTCMonth() ===
        new Date().getUTCMonth()
      )
        employee.halfPaidLeavesThisMonth.noOfDays += employeeLeave.noOfDays;
      else {
        employee.halfPaidLeavesThisMonth.noOfDays = employeeLeave.noOfDays;
        employee.halfPaidLeavesThisMonth.month = new Date();
      }
      break;

    default:
      if (
        employee.paidLeavesThisMonth.month.getUTCMonth() ===
        new Date().getUTCMonth()
      )
        employee.paidLeavesThisMonth.noOfDays += employeeLeave.noOfDays;
      else {
        employee.paidLeavesThisMonth.noOfDays = employeeLeave.noOfDays;
        employee.paidLeavesThisMonth.month = new Date();
      }
      break;
  }

  await employee.save();
  if (!employeeLeave) return nextError(next, 'No such leave is present', 404);
  return respond(
    res,
    200,
    employeeLeave,
    'The Employee Leave status is updated'
  );
});

// exports.getEmployeeLeave =  async (req, res, next) => {
//   try {
//     if (req.body === undefined) req.body = {};

//     req.body.deleted = false;
//     const employeeLeaveList = await EmployeeLeave.find(req.body).select(
//       '-__v -createdAt -updatedAt'
//     );

//     return res.status(200).json({
//       status: true,
//       data: employeeLeaveList,
//       message: 'The list of the employee on leave'
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

// exports.getSingleEmployeeLeave = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const leave = await EmployeeLeave.findOne({ _id: id, deleted: false });

//     if (!leave) throw new Error('No such leave is present');

//     return res.status(200).json({
//       status: true,
//       data: leave,
//       message: "The employee's leave"
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

// exports.deleteEmployeeLeave = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const deletedEmployee = await EmployeeLeave.findByIdAndUpdate(
//       id,
//       { deleted: true },
//       { new: true }
//     );

//     if (!deletedEmployee) return next( new AppError('No Leave is present',404));
//     return res.status(201).json({
//       status: true,
//       data: deletedEmployee,
//       message: 'The Employee Leave is deleted'
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };
