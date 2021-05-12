/* eslint-disable no-console */
const express = require('express');

const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 8000;
// process.on('uncaughtException', err => {
//   console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
//   console.log(err.name, err.message);
//   // process.exit(1);
// });

const AdmissionInfo = require('./route/admission');
const Finanace = require('./route/finance');
const auth = require('./route/user');
const payroll = require('./route/payroll.finance');
const purchase = require('./route/purchase.finance');
const transport = require('./route/transport');
const hrAndAdmin = require('./route/hrAndAdmin');
const hiringProcess = require('./route/hiring.process');
const hiringProcessNotification = require('./route/hiringProcessNotification/hiringProcessRoute');
const createEmployee = require('./route/employeeManagement/createEmployee');
const employeeLeavePolicy = require('./route/leaveManagement/employeeLeavePolicy');
const employeeLeaveApplication = require('./route/leaveManagement/employeeLeaveApplication');
const earlyOrLate = require('./route/leaveManagement/employeeEarlyOrLate');
const salaryStructure = require('./route/payrollManagement/salaryStructure');
const assignSalaryStructure = require('./route/payrollManagement/assignSalaryStructure');
const monthlyAttendance = require('./route/leaveManagement/monthlyAttendance');
const globalErrorHandler = require('./controller/errorController');
const vendorRegistration = require('./route/purchaseManagement/vendorRegistration');
const salaryPayment = require('./route/payrollManagement/salaryPayment');
const requirementGeneration = require('./route/purchaseManagement/requirementGeneration');
const requirementEnquiry = require('./route/purchaseManagement/requirementEnquiry');
const purchaseAgreement = require('./route/purchaseManagement/purchaseAgreementRoute');
const stripe=require('./route/stripe')

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let db = '';
if (process.env.NODE_ENV === 'testing') db = process.env.TESTING_DATABASE_URL;
else db = process.env.DATABASE_URL;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log('DB connected to : ' + process.env.NODE_ENV))
  .catch(err => console.log('db connection Failed', err));

app.get('/', (req, res) => {
  res.json({ message: 'server is working' });
});
app.use(cors());
app.use('/admission', AdmissionInfo);
app.use('/finance', Finanace);
app.use('/api', auth);
app.use('/payroll', payroll);
app.use('/purchase', purchase);
app.use('/transport', transport);
app.use('/hradmin', hrAndAdmin);
app.use('/hiringProcess', hiringProcess);
app.use('/hiringProcessNotification', hiringProcessNotification);
app.use('/createEmployee', createEmployee);
app.use('/leavePolicy', employeeLeavePolicy);
app.use('/leaveApplication', employeeLeaveApplication);
app.use('/earlyOrLate', earlyOrLate);
app.use('/salaryStructure', salaryStructure);
app.use('/assignSalaryStructure', assignSalaryStructure);
app.use('/salaryPayment', salaryPayment);
app.use('/monthlyAttendance', monthlyAttendance);
app.use('/vendorRegistration', vendorRegistration);
app.use('/requirementGeneration', requirementGeneration);
app.use('/requirementEnquiry', requirementEnquiry);
app.use('/purchaseAgreement', purchaseAgreement);
app.use('/stripe',stripe)

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`App is running at  ${PORT}-${process.env.NODE_ENV}`);
});

// process.on('unhandledRejection', err => {
//   console.log('UNHANDLED REJECTION! 💥 Shutting down...');
//   console.log(err.name, err.message);
//   server.close(() => {
//     // process.exit(1);
//   });
// });

module.exports = app;
