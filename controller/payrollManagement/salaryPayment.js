const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const SalaryPayment = require('../../model/finance/payroll/salaryPayment');
const factory = require('../../controller/handlerFactory');
const respond = require('../../utils/respond');
const nextError = require('../../utils/nextError');
// const APIFeatures = require('../../utils/apiFeatures');
const Employee = require('../../model/employee/employeeModel');
// const employeeLeavePolicyModel = require('../../model/employeeLeave/leavePolicy');
const catchAsync = require('../../utils/catchAsync');
require('./salaryPaymentScheduler');

exports.getAllSalaryPayment = factory.getAll(SalaryPayment);
exports.updateSalaryPayment = factory.updateOne(SalaryPayment);
exports.deleteSalaryPayment = factory.deleteOne(SalaryPayment);
exports.getSingleSalaryPayment = factory.getOne(SalaryPayment);
exports.createSalaryPayment = factory.createOne(SalaryPayment);
exports.getSalaryPaymentForOneEmployee = catchAsync(async (req, res, next) => {
  // const employees = await Employee.find();
  const { id } = req.params;

  const salaryPayment = await SalaryPayment.findOne({
    employee: id,
    isPaid: false
  });

  if (!salaryPayment)
    return nextError(next, 'All the salaries are paid for the employee', 400);
  respond(
    res,
    200,
    salaryPayment,
    'The monthly attendance of all the employees'
    // employees.length
  );
});
const monthName = d => {
  const month = [];
  month[0] = 'January';
  month[1] = 'February';
  month[2] = 'March';
  month[3] = 'April';
  month[4] = 'May';
  month[5] = 'June';
  month[6] = 'July';
  month[7] = 'August';
  month[8] = 'September';
  month[9] = 'October';
  month[10] = 'November';
  month[11] = 'December';
  return month[new Date(d).getMonth()];
};
exports.getSalaryReceiptForEmployee = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const employee = await Employee.findById(id).populate({
    path: 'salaryPaid._id'
  });
  if (!employee) nextError(next, 'There is no employee with this id', 400);

  if (!employee.salaryPaid)
    return nextError(next, 'The employee has no salary generated', 400);

  const salaryPayment = employee.salaryPaid;
  if (!salaryPayment || !salaryPayment._id || !salaryPayment._id.dateOfPayment)
    return nextError(
      next,
      'No salary is produced for this Id, Please Assign the salary structure.',
      400
    );

  const invoiceName = 'invoice-' + salaryPayment._id + '.pdf';
  const invoicePath = path.join('data', 'invoices', invoiceName);

  const pdfDoc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  //   res.setHeader(
  //     'Content-Disposition',
  //     'inline; filename="' + invoiceName + '"'
  //   );
  pdfDoc.pipe(fs.createWriteStream(invoicePath));
  pdfDoc.pipe(res);

  pdfDoc.fontSize(26).text('Invoice', {
    underline: true
  });
  pdfDoc.text('-----------------------');
  pdfDoc.text(employee.firstName, {
    align: 'center'
  });
  pdfDoc.text(
    `${monthName(salaryPayment._id.dateOfPayment)} ${new Date(
      salaryPayment._id.dateOfPayment
    ).getFullYear()}`,
    {
      align: 'center'
    }
  );

  let totalPrice = 0;
  //   order.products.forEach(prod => {
  //     totalPrice += prod.quantity * prod.product.price;
  //     pdfDoc
  //       .fontSize(14)
  //       .text(
  //         prod.product.title +
  //           ' - ' +
  //           prod.quantity +
  //           ' x ' +
  //           '$' +
  //           prod.product.price
  //       );
  //   });
  pdfDoc.text('---');
  pdfDoc.fontSize(20).text('Total Price: $' + totalPrice);

  pdfDoc.end();
  // return respond(res, 200, null, 'The Receipt for the employee');
});

// exports.getAllSalaryPayment = async (req, res, next) => {
//   try {
//     const allSalaryPayment = await SalaryPayment.find({ deleted: false });

//     if (!allSalaryPayment || !allSalaryPayment.length)
//       throw new Error("No salary payment is present");

//     return res.status(200).json({
//       status: true,
//       data: allSalaryPayment,
//       message: "The list of the Salary Payment",
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

// exports.getCustomSalaryPayment = async (req, res, next) => {
//   try {
//     const salaryPayment = await SalaryPayment.find(req.body);
//     if (!salaryPayment)
//       throw new Error(
//         'No data is found with this query. Please change the fields'
//       );

//     return res.status(200).json({
//       status: true,
//       data: salaryPayment,
//       message: 'The list of the Salary Payment'
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

// exports.getSingleSalaryPayment = async (req, res, next) => {
//   try {
//     const id = req.params.id;

//     const salaryPayment = await SalaryPayment.findById(id);
//     if (!salaryPayment)
//       throw new Error("No salary payment of this id is present");

//     return res.status(200).json({
//       status: true,
//       data: salaryPayment,
//       message: "Fetched the salary payment",
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

// exports.createSalaryPayment = async (req, res, next) => {
//   try {
//     const {
//       employeeId,
//       employee,
//       employeeName,
//       department,
//       role,
//       totalWorkingDays,
//       actualWorkingDays,
//       dateOfPayment,
//       remark
//     } = req.body;

//     const salaryPayment = await SalaryPayment.create({
//       employeeId,
//       employeeName,
//       employee,
//       department,
//       role,
//       totalWorkingDays,
//       actualWorkingDays,
//       dateOfPayment,
//       remark
//     });

//     return res.status(201).json({
//       status: true,
//       data: salaryPayment,
//       message: 'The salary payment is created'
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

// exports.updateSalaryPayment = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const salaryPayment = await SalaryPayment.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });
//     return res.status(201).json({
//       status: true,
//       data: salaryPayment,
//       message: "Updated the salary payment",
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

// exports.deleteSalaryPayment = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const salaryPayment = await SalaryPayment.findByIdAndUpdate(
//       id,
//       { deleted: true },
//       { new: true }
//     );
//     return res.status(200).json({
//       status: true,
//       data: salaryPayment,
//       message: "Deleted the salary payment",
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

// const endOfMonth = date => new Date(date.getFullYear(), date.getMonth() + 1, 0);
