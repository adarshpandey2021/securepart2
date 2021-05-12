const EmployeeLeavePolicy = require('../../model/employeeLeave/leavePolicy');
const catchAsync = require('../../utils/catchAsync');
const respond = require('../../utils/respond');
const factory = require('../handlerFactory');

exports.getEmployeeLeavePolicy = factory.getAll(EmployeeLeavePolicy);
exports.getSingleEmployeeLeavePolicy = factory.getOne(EmployeeLeavePolicy);
exports.setEmployeeLeavePolicy = factory.createOne(EmployeeLeavePolicy);
exports.updateEmployeeLeavePolicy = factory.updateOne(EmployeeLeavePolicy);
exports.deleteEmployeeLeavePolicy = factory.deleteOne(EmployeeLeavePolicy);

exports.updateGazettedLeave = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const { gazettedHolidays } = req.body;
  const leavePolicy = await EmployeeLeavePolicy.findByIdAndUpdate(
    id,
    {
      $push: {
        gazettedHolidays
      }
    },
    { new: true }
  );

  return respond(res, 200, leavePolicy, 'The Leave Policy is updated');
});

// exports.setEmployeeLeavePolicy = async (req, res, next) => {
//   try {
//     const {
//       departmentName,
//       role,
//       departmentId,
//       roleId,
//       typeOfLeave,
//       gazettedHolidays,
//       otherLeaves
//     } = req.body;

//     const leavePolicy = await EmployeeLeavePolicy.create({
//       departmentName,
//       role,
//       departmentId,
//       roleId,
//       typeOfLeave,
//       gazettedHolidays,
//       otherLeaves
//     });

//     return res.status(201).json({
//       status: true,
//       data: leavePolicy,
//       message: `Employee Leave Policy is created`
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

// exports.getEmployeeLeavePolicy = async (req, res, next) => {
//   try {
//     // eslint-disable-next-line no-unused-vars
//     const { departmentName, role } = req.body;

//     req.body.deleted = false;
//     if (!departmentName) throw new Error('Please Enter the department name.');

//     const leavePolicy = await EmployeeLeavePolicy.find(req.body).select(
//       '-__v -createdAt -updatedAt'
//     );

//     if (!leavePolicy || leavePolicy.length === 0)
//       throw new Error('Policy is not available.');

//     return res.status(200).json({
//       status: true,
//       data: leavePolicy,
//       message: `The Leave Policy of the department: ${departmentName}`
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

// exports.getSingleEmployeeLeavePolicy = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const leave = await EmployeeLeavePolicy.findById(id);
//     if (!leave) throw new Error('No Leave Policy is available with this id');

//     return res.status(200).json({
//       status: true,
//       data: leave,
//       message: `The Leave Policy `
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

// exports.updateEmployeeLeavePolicy = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const { otherLeaves } = req.body;

//     const leavePolicy = await EmployeeLeavePolicy.findOneAndUpdate(
//       { _id: id, deleted: false },
//       { otherLeaves },
//       { new: true }
//     ).select('-__v -createdAt -updatedAt');

//     if (!leavePolicy)
//       throw new Error('Leave Policy is not updated. Please check the id');
//     return res.status(200).json({
//       status: true,
//       message: `The Leave Policy is updated`,
//       data: leavePolicy
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

// exports.deleteEmployeeLeavePolicy = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const leavePolicy = await EmployeeLeavePolicy.findByIdAndUpdate(
//       id,
//       { deleted: true },
//       { new: true }
//     );

//     if (!leavePolicy) throw new Error('Please check the id');
//     return res.status(200).json({
//       status: true,
//       message: `The Leave Policy is deleted`,
//       data: leavePolicy
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };
