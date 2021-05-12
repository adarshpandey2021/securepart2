// eslint-disable-next-line import/no-unresolved
const AssignSalaryStructure = require('../../model/finance/payroll/assignSalaryStructure');
const factory = require('../../controller/handlerFactory');
const catchAsync = require('../../utils/catchAsync');
const respond = require('../../utils/respond');
// const AppError = require('../../utils/appError');
const nextError = require('../../utils/nextError');

exports.getAllAssignSalaryStructure = factory.getAll(AssignSalaryStructure);
exports.deleteAssignSalaryStructure = factory.deleteOne(AssignSalaryStructure);
exports.getSingleAssignSalaryStructure = factory.getOne(AssignSalaryStructure);

// , {
//   path: 'salaryHeads._id'
// });
exports.createAssignSalaryStructure = catchAsync(async (req, res, next) => {
  const {
    employeeId,
    employee,
    // employeeName,
    department,
    departmentId,
    roleId,
    role,
    salaryHeads,
    monthEffectiveFrom
    // bankNameAndBranch,
    // bankAccountNo,
    // IFSCCode,
  } = req.body;

  const assignSalaryStructureCheck = await AssignSalaryStructure.findOne({
    employee,
    deleted: false
  });

  if (assignSalaryStructureCheck)
    return nextError(
      next,
      'This employee already has the salary structure.',
      400
    );

  // console.log(monthEffectiveFrom);
  const assignSalaryStructure = await AssignSalaryStructure.create({
    employeeId,
    employee,
    department,
    role,
    departmentId,
    roleId,
    salaryHeads,
    monthEffectiveFrom
  });

  const createAssignSalaryStructure = await AssignSalaryStructure.findById(
    // eslint-disable-next-line no-underscore-dangle
    assignSalaryStructure._id
  );

  return respond(
    res,
    201,
    createAssignSalaryStructure,
    'The salary structure is created.'
  );
});

exports.updateAssignSalaryStructure = factory.updateOne(AssignSalaryStructure);

// exports.updateAssignSalaryStructure = catchAsync(async (req, res, next) => {
//   const { id } = req.params;

//   const assignSalaryStructure = await AssignSalaryStructure.findByIdAndUpdate(
//     id,
//     req.body,
//     { new: true }
//   );

//   if (!assignSalaryStructure) {
//     return nextError(
//       next,
//       'No such assign salary is present. Please check the id',
//       404
//     );
//   }

//   return respond(
//     res,
//     200,
//     assignSalaryStructure,
//     'Updated the salary structure'
//   );
// });

// async (req, res, next) => {
//   try {
//     const allAssignSalaryStructure = await AssignSalaryStructure.find({
//       deleted: false,
//     });

//     if (!allAssignSalaryStructure || !allAssignSalaryStructure.length)
//       throw new Error("No salary structure is present");

//     return res.status(200).json({
//       status: true,
//       data: allAssignSalaryStructure,
//       message: "The list of the Salary Structure",
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

// exports.getCustomAssignSalaryStructure = async (req, res, next) => {
//   try {
//     req.body.deleted = false;
//     const assignSalaryStructure = await AssignSalaryStructure.find(req.body);
//     if (!assignSalaryStructure)
//       throw new Error(
//         'No data is found with this query. Please change the fields'
//       );

//     return res.status(200).json({
//       status: true,
//       data: assignSalaryStructure,
//       message: 'The list of the Salary Structure'
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

// exports.getSingleAssignSalaryStructure = async (req, res, next) => {
//   try {
//     const id = req.params.id;

//     const assignSalaryStructure = await AssignSalaryStructure.findOne({
//       _id: id,
//       deleted: false,
//     });
//     if (!assignSalaryStructure)
//       throw new Error("No salary structure of this id is present");

//     return res.status(200).json({
//       status: true,
//       data: assignSalaryStructure,
//       message: "Fetched the salary structure",
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

// exports.deleteAssignSalaryStructure = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const assignSalaryStructure = await AssignSalaryStructure.findByIdAndUpdate(
//       id,
//       { deleted: true },
//       { new: true }
//     );

//     if (!assignSalaryStructure)
//       throw new Error("No such salary head is present. Please check the id");

//     return res.status(200).json({
//       status: true,
//       data: assignSalaryStructure,
//       message: "Deleted the salary structure",
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

// exports.getAllSalaryHeadForSingleEmployee = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const allSalaryHead = await AssignSalaryStructure.find({
//       employee: id,
//       deleted: false
//     });
//     if (!allSalaryHead || !allSalaryHead.length)
//       throw new Error('No salary head available for this employee');

//     return res.status(200).json({
//       status: true,
//       data: allSalaryHead,
//       message: 'All salary head for the employee'
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };
