const express = require('express');
const employeeLeaveApplicationController = require('../../controller/leaveManagement/employeeLeaveApplication');

const router = express.Router();

router
  .route('/')
  .get(employeeLeaveApplicationController.getEmployeeLeave)
  .post(employeeLeaveApplicationController.createEmployeeLeave)
  .patch(employeeLeaveApplicationController.updateEmployeeLeave);
// No check available for patch

router
  .route('/resetall')
  .patch(employeeLeaveApplicationController.resetEmployeeLeave);

// No test are implemented so please check
router
  .route('/updatestatus/:id')
  .patch(employeeLeaveApplicationController.updateStatus);

router
  .route('/:id')
  .get(employeeLeaveApplicationController.getSingleEmployeeLeave)
  .delete(employeeLeaveApplicationController.deleteEmployeeLeave);

module.exports = router;
