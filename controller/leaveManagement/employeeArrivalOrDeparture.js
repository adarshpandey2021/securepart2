const EarlyAndDeparture = require('../../model/employeeLeave/earlyAndLateDeparture');
// const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const nextError = require('../../utils/nextError');
const respond = require('../../utils/respond');
const factory = require('../handlerFactory');

exports.getEarlyAndLate = factory.getOne(EarlyAndDeparture);
exports.getAllEarlyAndLate = factory.getAll(EarlyAndDeparture);
exports.createEarlyArrivalAndLateDeparture = factory.createOne(
  EarlyAndDeparture
);
exports.deleteEarlyAndLate = factory.deleteOne(EarlyAndDeparture);
exports.updateStatus = factory.updateOne(EarlyAndDeparture);

exports.updateEarlyAndLate = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  // eslint-disable-next-line no-unused-vars
  const { status, ...updateData } = req.body;

  const checkLeave = await EarlyAndDeparture.findById(id);
  if (!checkLeave) {
    return nextError(
      next,
      "This employee doesn't have any Late Arrival or Early Departure.",
      404
    );
  }

  if (checkLeave.status === 'Approved') {
    return nextError(
      next,
      "The leave is already Approved you can't edit it.",
      400
    );
  }

  const leave = await EarlyAndDeparture.findByIdAndUpdate(id, updateData, {
    new: true
  });

  return respond(
    res,
    200,
    leave,
    'The late arrival or early departure leave is updated'
  );
});

// exports.getAllEarlyAndLateForSingleEmployee = catchAsync(
//   async (req, res, next) => {
//     const { employeeId } = req.body;
//     const employeeLeave = await EarlyAndDeparture.find({
//       employeeId,
//       deleted: false
//     });
//     if (!employeeLeave || !employeeLeave.length)
//       throw new Error(
//         "This employee doesn't have any Late Arrival or Early Departure."
//       );
//     return respond(res, 200, employeeLeave, undefined, employeeLeave.length);
//   }
// );

// exports.getAllApprovedOrNotApproved = async (req, res, next) => {
//   try {
//     const { status } = req.body;
//     const allLeave = await EarlyAndDeparture.find({ status, deleted: false });
//     return res.status(200).json({
//       status: true,
//       data: allLeave
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

// exports.createEarlyArrivalAndLateDeparture = catchAsync(  async (req, res, next) => {
//     const {
//       employeeId,
//       employee,
//       employeeName,
//       departmentName,
//       role,
//       typeOfLeave,
//       description,
//       arrivalOrDepartureTime
//     } = req.body;

//     const leave = await EarlyAndDeparture.create({
//       employeeId,
//       employee,
//       employeeName,
//       departmentName,
//       role,
//       typeOfLeave,
//       description,
//       arrivalOrDepartureTime
//     });

//     return res.status(200).json({
//       status: true,
//       data: leave
//     });
//   } );

// exports.getAllEarlyAndLate = async (req, res, next) => {
//   try {
//     const allLeaves = await EarlyAndDeparture.find({ deleted: false });

//     if (!allLeaves || !allLeaves.length)
//       throw new Error('No early arrival or late departure leave is present');

//     return res.status(200).json({
//       status: true,
//       data: allLeaves
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

// exports.getEarlyAndLate = async (req, res, next) => {
//   try {
//     const { id } = req.body;

//     const leave = await EarlyAndDeparture.findById(id);

//     if (!leave)
//       throw new Error('The early departure or late arrival is not present');

//     return res.status(200).json({
//       status: true,
//       data: leave
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

// exports.updateStatus = async (req, res, next) => {
//   try {
//     const { id, status } = req.body;

//     const updatedLeave = await EarlyAndDeparture.findOneAndUpdate(
//       { _id: id, deleted: false },
//       { status },
//       {
//         new: true
//       }
//     );
//     if (!updatedLeave)
//       throw new Error('No such leave is present. Please check the id');

//     return res.status(200).json({
//       status: true,
//       data: updatedLeave
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

// exports.deleteEarlyAndLate = async (req, res, next) => {
//   try {
//     const { id } = req.body;

//     const deletedLeave = await EarlyAndDeparture.findByIdAndUpdate(
//       id,
//       { deleted: true },
//       { new: true }
//     );

//     if (!deletedLeave)
//       throw new Error('No such leave is present. Please check the id');

//     return res.status(200).json({
//       status: true,
//       data: deletedLeave
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };
