const express = require('express');

const monthlyAttendanceController = require('../../controller/leaveManagement/monthlyAttendance');

const router = express.Router();

router
  .route('/')
  .get(monthlyAttendanceController.getAllMonthlyAttendance)
  .post(monthlyAttendanceController.createMonthlyAttendance);

router
  .route('/:id')
  .get(monthlyAttendanceController.getSingleMonthlyAttendance)
  .patch(monthlyAttendanceController.updateMonthlyAttendance)
  .delete(monthlyAttendanceController.deleteMonthlyAttendance);

module.exports = router;
