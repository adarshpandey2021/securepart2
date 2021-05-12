const Employee = require('../../model/employee/employeeModel');
const factory = require('../../controller/handlerFactory');
// const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const respond = require('../../utils/respond');
const nextError = require('../../utils/nextError');

exports.getEmployees = factory.getAll(Employee);
exports.getEmployee = factory.getOne(Employee, {
  path: 'roleId',
  select: 'role departmentName'
});
exports.updateEmployee = factory.updateOne(Employee);
exports.deleteEmployee = factory.deleteOne(Employee);

exports.getEmployeeNo = catchAsync(async (req, res, next) => {
  const employeeNoList = await Employee.find({ deleted: false }).select(
    'employeeId -_id'
  );

  return respond(res, 200, employeeNoList, undefined, employeeNoList.length);
});

exports.createEmployee = catchAsync(async (req, res, next) => {
  const {
    firstName,
    middleName,
    lastName,
    bloodGroup,
    gender,
    dateOfBirth,
    nationality,
    joiningDetails,
    workingDetails,
    familyDetails,
    contactDetails,
    bankDetails
  } = req.body;

  // const departmentName = workingDetails[0].departmentName;
  // const role = workingDetails[0].role;

  // const departmentLeave = await DepartmentLeavePolicy.findOne({departmentName , role});
  // console.log(departmentLeave);

  const { employeeId } = joiningDetails[0];
  if (joiningDetails[0].employeeId !== workingDetails[0].employeeId) {
    return nextError(
      next,
      'The employee id in the joining Details and working details should ne same',
      404
    );
  }

  const employeeCheck = await Employee.findOne({ employeeId });

  if (employeeCheck) return nextError(next, 'The employee already exists', 400);

  const { department } = workingDetails[0];
  const { roleId } = workingDetails[0];
  // console.log(employeeId);
  const newEmployee = await Employee.create({
    employeeId,
    department,
    roleId,
    firstName,
    middleName,
    lastName,
    bloodGroup,
    gender,
    dateOfBirth,
    nationality,
    joiningDetails,
    workingDetails,
    familyDetails,
    contactDetails,
    bankDetails,
    takenLeaves: [{ forYear: new Date().getUTCFullYear() }]
  });

  return respond(res, 201, newEmployee, 'Employee is created.');
});

// async (req, res, next) => {
//   try {
//     const employees = await Employee.find({ deleted: false });
//     return res.status(200).json({
//       status: true,
//       data: employees,
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

// exports.getEmployee = async (req, res, next) => {
//   try {
//     const employeeId = req.params.id;
//     const employee = await Employee.findOne({ employeeId }, { deleted: false });

//     if (!employee)
//       return next(new Error('Employee is not available with this Id.'));

//     // const leaveYear = employee.takenLeaves[0].forYear;

//     // if(leaveYear < new Date().getUTCFullYear()){
//     //   employee.takenLeaves = undefined;
//     //   employee.takenLeaves = [{forYear: new Date().getUTCFullYear()}];
//     //   employee = await employee.save();
//     // }

//     return res.status(200).json({
//       status: true,
//       data: employee
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

// exports.updateEmployee = async (req, res, next) => {
//   try {
//     const employeeId = req.params.id;
//     const updatedEmployee = await Employee.findOneAndUpdate(
//       { employeeId, deleted: false },
//       req.body,
//       { new: true }
//     );
//     return res.status(201).json({
//       status: true,
//       data: updatedEmployee,
//       message: 'Employee is updated'
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

// exports.deleteEmployee = async (req, res, next) => {
//   try {
//     const employeeId = req.params.id;
//     await Employee.findOneAndUpdate(
//       { employeeId },
//       { deleted: true },
//       { new: true }
//     );
//     return res.status(200).json({
//       status: true,
//       message: 'Employee is Deleted'
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };
